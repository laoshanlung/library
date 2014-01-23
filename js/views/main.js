define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'views/search_result'
  , 'collections/books'
  , 'text!templates/main.html'
  , 'text!templates/search_form.html'
  , 'text!templates/login_form.html'
], function(_, Backbone, Marionette, MobileView, SearchResultView, Books, template, searchForm, loginForm){
  var View = MobileView.extend({
    id: 'main',

    events: {
      'click .js-search': 'onClickSearch'
    },

    ui: {
      form: 'form',
      searchForm: '.js-search-form',
      loginForm: '.js-login-form',
      searchResult: '.js-search-result'
    },
    
    template: function(data) {
      return _.template(template, data);
    },

    initialize: function() {
      this.books = new Books();
    },

    onRender: function() {
      this.ui.searchForm.html(searchForm);
      this.ui.loginForm.html(loginForm);
    },

    onClickLogin: function(e) {
      var params = this.formParams();
      this.showLoader();
      if (params.username != params.password != 'library') {
        this.hideLoader();
        this.showPopup('Invalid username and/or password');
      } else {

      }
    },

    onClickSearch: function(e) {
      if (!this.searchResult) {
        this.searchResult = new SearchResultView({
          el: this.ui.searchResult,
          collection: this.books
        });
        this.searchResult.render();
      }

      this.books.random();
      this.searchResult.initCheckboxes();
      return false;
    }
  });

  return View;
})