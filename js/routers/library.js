define([
  'backbone'
  , 'views/login'
], function(Backbone, LoginView){
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      $('body').append(new LoginView().render().$el);
      $.mobile.changePage( "#login" , { reverse: false, changeHash: false } );
    }
  });

  return Router;
});