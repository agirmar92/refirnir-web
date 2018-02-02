// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC9QRSz_OpA46l3Jmn9x1Zx6HDXc4q51RU',
    authDomain: 'refirnir.firebaseapp.com',
    databaseURL: 'https://refirnir.firebaseio.com',
    projectId: 'firebase-refirnir',
    storageBucket: 'firebase-refirnir.appspot.com',
    messagingSenderId: '476862818948'
  }
};
