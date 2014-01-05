define([
  'vendors/underscore'
  , 'vendors/underscore.string'
], function(_, _s){
  _.mixin(_s);
  
  return _;
});