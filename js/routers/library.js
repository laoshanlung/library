define([
  'backbone'
  , 'views/main'
], function(Backbone, MainView){
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      $('body').append(new MainView().render().$el);
      $.mobile.changePage( "#main" , { reverse: false, changeHash: false } );
    }
  });

  return Router;
});