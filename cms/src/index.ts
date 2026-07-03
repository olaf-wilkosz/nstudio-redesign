import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  'api::realizacja.realizacja.find',
  'api::realizacja.realizacja.findOne',
  'api::post-bloga.post-bloga.find',
  'api::post-bloga.post-bloga.findOne',
  'api::ustawienia.ustawienie.find',
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Ensures the Public role can read (find/findOne) the content types that
   * Astro fetches at build time, so the SSG build works right after `develop`
   * without manually clicking through Settings -> Roles -> Public in the admin.
   *
   * Strapi 5's users-permissions plugin grants access by row presence (there is
   * no `enabled` boolean) - a permission is allowed if a row exists linking the
   * action to the role, so we create the missing rows rather than flip a flag.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    for (const action of PUBLIC_READ_ACTIONS) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
      }
    }
  },
};
