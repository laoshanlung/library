define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'text!templates/login.html'
], function(_, Backbone, Marionette, MobileView, template){
  var View = MobileView.extend({
    id: 'login',
    
    template: function(data) {
      return _.template(template, data);
    }
  });

  return View;
})