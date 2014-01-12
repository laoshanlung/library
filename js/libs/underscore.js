define([
  'vendors/underscore'
  , 'vendors/underscore.string'
], function(_, _s){
  _.mixin(_s);

  _.mixin({
    t: function(name, data) {
      return name;
    }
  })
  
  return _;
});