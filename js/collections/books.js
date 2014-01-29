define([
  'backbone'
  , 'models/book'
  , 'libs/sample_books'
], function(Backbone, Model, samplebooks){
  return Backbone.Collection.extend({
    model: Model,

    random: function(limit) {
      limit = limit || 5;
      this.reset(_.shuffle(_.clone(samplebooks)).slice(0,limit));
    },

    hasBook: function(name) {
      var check = this.where({name: name});
      return check.length !== 0;
    }
  });
})