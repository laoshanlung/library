require([
  'routers/library'
], function(Router){
  // Prevents all anchor click handling
  $.mobile.linkBindingEnabled = false;

  // Disabling this will prevent jQuery Mobile from handling hash changes
  $.mobile.hashListeningEnabled = false;

  var router = new Router();

  Backbone.history.start();
})