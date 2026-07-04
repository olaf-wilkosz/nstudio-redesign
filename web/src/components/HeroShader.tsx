import { useEffect, useRef } from 'preact/hooks';

// Subtle organic noise gradient in the Nstudio palette (see
// content/scraped/12-color-palette.md) - warm ink/gold tones with a soft
// glow that drifts toward the cursor. Kept intentionally simple (2D value
// noise, no post-processing) since this is a PoC placeholder - see
// Hero3DPlaceholder.astro for the intended full 3D upgrade path.
const VERTEX_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 2.6;

    float t = u_time * 0.045;
    float n = 0.0;
    n += 0.5 * noise(p + t);
    n += 0.25 * noise(p * 2.0 - t * 1.3);
    n += 0.125 * noise(p * 4.0 + t * 0.6);

    vec2 mouseUv = u_mouse / u_resolution.xy;
    mouseUv.x *= u_resolution.x / u_resolution.y;
    vec2 puv = uv;
    puv.x *= u_resolution.x / u_resolution.y;
    float dist = distance(puv, mouseUv);
    float glow = smoothstep(0.7, 0.0, dist) * 0.4;

    vec3 dark = vec3(0.114, 0.114, 0.114);
    vec3 warm = vec3(0.176, 0.122, 0.086);
    vec3 gold = vec3(0.894, 0.733, 0.490);
    vec3 peach = vec3(1.0, 0.737, 0.490);

    vec3 col = mix(dark, warm, smoothstep(-0.3, 0.5, n));
    col = mix(col, gold, smoothstep(0.25, 0.65, n) * 0.35);
    col += peach * glow;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return; // no WebGL - the static gradient behind this canvas still shows

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const timeLoc = gl.getUniformLocation(program, 'u_time');

    let mouse = [0, 0];
    let raf = 0;
    const start = performance.now();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas!;
      canvas!.width = clientWidth * dpr;
      canvas!.height = clientHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouse = [(e.clientX - rect.left) * dpr, (rect.height - (e.clientY - rect.top)) * dpr];
    }

    function draw(time: number) {
      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform2f(mouseLoc, mouse[0], mouse[1]);
      gl!.uniform1f(timeLoc, time);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function render() {
      draw((performance.now() - start) / 1000);
      if (!reduceMotion) raf = requestAnimationFrame(render);
    }

    resize();
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} class="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
