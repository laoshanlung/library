define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'text!templates/login.html'
], function(_, Backbone, Marionette, MobileView, template){
  var View = MobileView.extend({
    id: 'login',

    events: {
      'click .js-login': 'onClickLogin'
    },

    ui: {
      form: 'form'
    },
    
    template: function(data) {
      return _.template(template, data);
    },

    onClickLogin: function(e) {
      var params = this.formParams();
      this.showLoader();
      if (params.username != params.password != 'library') {
        this.hideLoader();
        this.showPopup('Invalid username and/or password');
      } else {

      }
    }
  });

  return View;
})