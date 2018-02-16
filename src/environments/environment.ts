// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDglwRUZ0rudiMYSX2qNbQ_dFzmGW-J5e4",
    authDomain: "code-scissors.firebaseapp.com",
    databaseURL: "https://code-scissors.firebaseio.com",
    projectId: "code-scissors",
    storageBucket: "",
    messagingSenderId: "887611277747"
  }
};
