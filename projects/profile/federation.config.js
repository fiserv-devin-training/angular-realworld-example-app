const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'profile',

  exposes: {
    './ProfileRoutes': './projects/profile/src/app/profile.routes.ts',
    './Settings': './projects/profile/src/app/settings/settings.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],

  features: {
    ignoreUnusedDeps: true,
  },
});
