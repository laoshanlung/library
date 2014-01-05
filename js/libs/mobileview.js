define([
  'marionette'
], function(Marionette){
  return Marionette.ItemView.extend({
    constructor: function(){
      Marionette.ItemView.prototype.constructor.apply(this, Array.prototype.slice.apply(arguments));
      this.listenTo(this, 'render', this.prepareDataPage);
    },

    prepareDataPage: function() {
      this.$el.attr('data-role', 'page');
    }
  });
});