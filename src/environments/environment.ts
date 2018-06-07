// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: 'AIzaSyAfzSvtJ7Vhh_FB0ViS6SwmjBp5Pp1OvWI',
    authDomain: 'groceryshop-fa4c7.firebaseapp.com',
    databaseURL: 'https://groceryshop-fa4c7.firebaseio.com',
    projectId: 'groceryshop-fa4c7',
    storageBucket: 'groceryshop-fa4c7.appspot.com',
    messagingSenderId: '329988227610'
  }
};
