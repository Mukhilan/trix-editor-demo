/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.eot' , {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.otf', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.woff', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.svg',{
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.ttf', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.woff2', {
    destDir: 'assets/themes/default/assets/fonts'
  });

  app.import('bower_components/trix/dist/trix.js');
  app.import('bower_components/semantic-ui/dist/semantic.min.js');
  app.import('bower_components/semantic-ui/dist/semantic.min.css');

 return app.toTree();
};
