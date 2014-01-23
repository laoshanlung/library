define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'text!templates/search_result.html'
  , 'text!templates/search_result_item.html'
], function(_, Backbone, Marionette, MobileView, template, item){
  var SearchItemView = Marionette.ItemView.extend({
    template: function(data){
      return _.template(item, data);
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
        itemView: SearchItemView,
        collection: this.collection,
        el: this.$('.js-result-list')
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