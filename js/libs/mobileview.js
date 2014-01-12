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
    },

    popupTemplate: '<div data-role="popup" class="ui-content" style="max-width:280px"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p></p></div>',

    showPopup: function(content) {
      var $popup = $(this.popupTemplate);
      $popup.find('p').html(content);

      $popup.attr('data-theme', 'a');
      $popup.attr('data-overlay-theme', 'b');

      $('body').append($popup);
      $popup.popup({
        afterclose: function(){
          $(this).remove();
        }
      });
      $popup.popup('open');
    },

    showLoader: function(options) {
      options = options || {};
      this.$el.addClass('ui-disabled');
      $.mobile.loading("show", options);
    },

    hideLoader: function(options) {
      options = options || {};
      this.$el.removeClass('ui-disabled');
      $.mobile.loading("hide", options);
    },

    formParams: function(form) {
      form = form || this.ui.form;

      var raw = $(form).serializeArray();
      var params = {};

      for (var i in raw) {
        params[raw[i].name] = raw[i].value;
      }

      return params;
    }
  });
});