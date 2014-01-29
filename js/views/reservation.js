define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'text!templates/reservation.html'
  , 'text!templates/reservation_item.html'
], function(_, Backbone, Marionette, MobileView, template, item){
  var ItemView = Marionette.ItemView.extend({
    template: function(data){
      return _.template(item, data);
    },

    onRender: function() {
      
    },

    serializeData: function() {
      return {
        model: this.model
      }
    }
  });

  var View = Marionette.ItemView.extend({
    events: {
      'click .js-next': 'onClickNext',
      'click .js-prev': 'onClickNext'
    },

    ui: {
      
    },
    
    template: function(data) {
      return _.template(template, data);
    },

    onRender: function() {
      var collectionView = new Marionette.CollectionView({
        itemView: ItemView,
        collection: this.collection,
        el: this.$('.js-list')
      });

      collectionView.render();
    },

    initCheckboxes: function() {
      this.$('input').each(function(){
        $(this).checkboxradio();
      });
    },

    onClickNext: function() {
      this.collection.random();
      this.initCheckboxes();
      return false;
    }
  });

  return View;
})