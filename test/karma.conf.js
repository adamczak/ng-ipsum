// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // libraries
      'lib/bower_components/angular/angular.js',
      'lib/bower_components/angular-mocks/angular-mocks.js',

      // app code
      '../src/**/*.js',

      // tests
      'specs/**/*.spec.js',

      // templates
      //'../ng-templates/*.html'
    ],

    // generate js files from html templates
    //preprocessors: {
    //  '../ng-templates/**/*.html': 'ng-html2js'
    //},

    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};

