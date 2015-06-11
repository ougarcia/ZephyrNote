cleverNote.Views.Root = Backbone.View.extend({
  // TODO: this is okay for now, but if I end up using the sidebar for
  // only navigation, I might just want to move this up to the app
  // initialization and handle the other views like normal
  className: 'row',

  template: JST['root'],

  initialize: function () {
    this.sidebarView = new cleverNote.Views.Sidebar();
    this.sidebarView.render();
  },

  setView: function (view) {
    this._mainView && this._mainView.remove();
    this._mainView = view;
    this.$('div.main').html(view.$el);
    view.render();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$('#sidebar').html(this.sidebarView.$el);
    return this;
  }
});
