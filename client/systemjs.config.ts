/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'lib/@angular2-material',
};

/** User packages configuration. */
const packages: any = {
  '@angular2-material/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'core.js'
  },
  '@angular2-material/sidenav': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'sidenav.js'
  },
  '@angular2-material/toolbar': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'toolbar.js'
  },
  '@angular2-material/card': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'card.js'
  },
  '@angular2-material/button': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'button.js'
  },
  '@angular2-material/checkbox': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'checkbox.js'
  },
  '@angular2-material/radio': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'radio.js'
  },
  '@angular2-material/progress-circle': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'progress-circle.js'
  },
  '@angular2-material/progress-bar': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'progress-bar.js'
  },
  '@angular2-material/input': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'input.js'
  },
  '@angular2-material/list': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'list.js'
  },
  '@angular2-material/icon': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'icon.js'
  },
  '@angular/router-deprecated': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'router.js'
  },
  'lodash': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'lodash.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',
  'lodash',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const _cliSystemConfig = {};
barrels.forEach((barrelName: string) => {
  _cliSystemConfig[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'lib/@angular',
    'rxjs': 'lib/rxjs',
    'main': 'app/main.js',
    'lodash': 'lib/lodash'
  },
  packages: _cliSystemConfig
});

// Apply the user's configuration.
System.config({ map, packages });
