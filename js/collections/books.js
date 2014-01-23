define([
  'backbone'
  , 'models/book'
  , 'libs/sample_books'
], function(Backbone, Model, samplebooks){
  return Backbone.Collection.extend({
    model: Model,

    random: function(limit) {
      limit = limit || 10;
      this.reset(_.shuffle(_.clone(samplebooks)).slice(0,limit));
    }
  });
})