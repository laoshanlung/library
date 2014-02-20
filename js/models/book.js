define([
  'underscore'
  , 'backbone'
  , 'moment'
], function(_, Backbone, moment){
  return Backbone.Model.extend({
    randomFutureDate: function() {
      var random = _.random(1, 30);
      return moment().add('d', random).fromNow();
    },

    getPopupId: function() {
      return 'book-popup-'+this.cid;
    }
  });
})