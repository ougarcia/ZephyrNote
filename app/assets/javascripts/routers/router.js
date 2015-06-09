cleverNote.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.$rootEl = options.$rootEl;
  },

  index: function () {
  }
});
