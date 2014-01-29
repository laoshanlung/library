define([
  'backbone'
  , 'views/main'
], function(Backbone, MainView){
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "(:test)": 'test'
    },

    index: function() {
      $('body').append(new MainView().render().$el);
      $.mobile.changePage( "#main" , { reverse: false, changeHash: false } );
    },

    test: function(test) {
      console.log(test);
    }
  });

  return Router;
});