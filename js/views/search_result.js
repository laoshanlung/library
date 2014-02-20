define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'text!templates/search_result.html'
  , 'text!templates/search_result_item.html'
], function(_, Backbone, Marionette, MobileView, template, item){
  var SearchItemView = Marionette.ItemView.extend({
    events: {
      'change .js-select-book': 'onChange'
    },

    template: function(data){
      return _.template(item, data);
    },

    onRender: function() {
      var self = this;
      this.$('.js-select-book').on('checkboxradiocreate', function(){
        var selected = self.model.collection.selected.hasBook(self.model.get('name'));
        if (selected) {
          self.$('.js-select-book').prop( "checked", true ).checkboxradio( "refresh" );
        }
      });
    },

    onChange: function(e) {
      var $target = $(e.currentTarget);
      if ($target.is(':checked')) {
        var selectedBooks = this.model.collection.selected;
        if (!selectedBooks.hasBook(this.model.get('name'))) {
          selectedBooks.add(this.model);  
        }
        
      } else {
        this.model.collection.selected.remove(this.model);
      }
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

      this.$('[data-role=popup]').each(function(){
        $(this).popup();
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