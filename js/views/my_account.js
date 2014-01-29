define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'views/loan'
  , 'views/reservation'
  , 'text!templates/my_account.html'
], function(_, Backbone, Marionette, MobileView, LoanView, ReservationView, template){
  var View = Marionette.ItemView.extend({
    events: {

    },

    ui: {
      loan: '.js-loans',
      reservation: '.js-reservation'
    },

    initialize: function() {
      this.listenTo(this.model, 'loggedIn', this.onLoggedIn);
      this.listenTo(this.model, 'loggedOut', this.onLoggedOut);
    },
    
    template: function(data) {
      return _.template(template, data);
    },

    onRender: function() {
      this.loan = new LoanView({
        el: this.ui.loan,
        collection: this.model.get('loans')
      });

      this.reservation = new ReservationView({
        el: this.ui.reservation,
        collection: this.model.get('reservation')
      });

      this.loan.render();
      this.reservation.render();

      this.loan.initCheckboxes();
      this.reservation.initCheckboxes();
      this.$el.hide();
    },

    onLoggedIn: function() {
      this.$el.show();
      this.loan.initCheckboxes();
      this.reservation.initCheckboxes();
    },

    onLoggedOut: function() {
      this.$el.hide();
    }
  });

  return View;
})