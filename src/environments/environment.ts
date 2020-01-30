// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: 'http://localhost:3000/',
  firebase: {
    apiKey: "AIzaSyDm0g87k84w7L61lTjRQYak1CF9btaStIY",
    databaseURL: "https://texteditor-222218.firebaseio.com"
  }
};


/*

databaseURL: "https://texteditor-222218.firebaseio.com/free-document"
    authDomain: "[SEU AUTH DOMAIN]",
    databaseURL: "[SUA DATABASE URL]",
    projectId: "[SEU PROJECT ID]",
    storageBucket: "[SEU STORAGE BUCKET]",
    messagingSenderId: "[SUA MESSAGING SENDER ID]"

    */

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
