define([
  'underscore'
  , 'backbone'
  , 'marionette'
  , 'mobileview'
  , 'views/search_result'
  , 'views/my_account'
  , 'collections/books'
  , 'models/user'
  , 'text!templates/main.html'
  , 'text!templates/search_form.html'
  , 'text!templates/login_form.html'
], function(_, Backbone, Marionette, MobileView, SearchResultView, MyAccountView, Books, User, template, searchForm, loginForm){
  var View = MobileView.extend({
    id: 'main',

    events: {
      'click .js-search': 'onClickSearch',
      'submit .js-login-form form': 'onSubmitLogin'
    },

    ui: {
      form: 'form',
      searchForm: '.js-search-form',
      loginForm: '.js-login-form',
      searchResult: '.js-search-result',
      logoutButton: '.js-logout-button',
      loginFormContainer: '.js-login-container',
      welcome: '.js-welcome'
    },
    
    template: function(data) {
      return _.template(template, data);
    },

    initialize: function() {
      this.books = new Books();
      this.selectedBooks = new Books();
      this.books.selected = this.selectedBooks;
      this.user = new User();

      this.user.set('loans', new Books());
      this.user.set('reservation', new Books());
      this.user.set('mylist', new Books());

      this.listenTo(this.user, 'loggedIn', this.onLoggedIn);
      this.listenTo(this.user, 'loggedOut', this.onLoggedOut);
    },

    onRender: function() {
      this.ui.searchForm.html(searchForm);
      this.ui.loginForm.html(loginForm);

      this.myAccount = new MyAccountView({
        el: this.$('.js-my-account'),
        model: this.user
      });
      this.myAccount.render();

      this.user.trigger('loggedOut');
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
    },

    onSubmitLogin: function(e) {
      var self = this;
      var params = this.formParams($(e.currentTarget));
      this.showLoader();
      // if (params.pin != 'library') {
      //   this.showPopup('Invalid username and/or password');
      // } else {

      // }

      setTimeout(function(){
        self.user.set({
          loggedIn: true,
          name: params.lastName,
          cardNumber: params.libraryCardNumber
        });
        self.user.get('loans').random();
        self.user.get('reservation').random();
        self.user.get('mylist').random();
        self.user.trigger('loggedIn');
        self.hideLoader();
      }, 500);

      
      return false;
    },

    onLoggedIn: function() {
      this.ui.logoutButton.show();
      this.ui.loginFormContainer.hide();
      this.ui.welcome.html(_.template("Welcome <%= name %>", {name: this.user.get('name')}));
    },

    onLoggedOut: function() {
      this.ui.loginFormContainer.show();
      this.ui.logoutButton.hide();
    }
  });

  return View;
})