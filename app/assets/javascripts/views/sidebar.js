cleverNote.Views.Sidebar = Backbone.CompositeView.extend({
  tagName: 'nav',
  className: 'navbar navbar-default navbar-static-top',
  attributes: {role: 'navigation', style: 'margin-bottom: 0'},
  template: JST['sidebar'],


  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.addNavLinks();
    this.addIndexView(this.notebooks);
    this.addIndexView(this.tags);
    //TODO: need to add a logout button
  },

  logOut: function () {
    $.ajax({
      url: "/session",
      method: "delete",
    });
    window.location.replace('session/new');
  },

  addNavLinks: function () {
    var homeParams = {
      title: 'Home',
      destination: '#'
    };
    var newNoteParams = {
      title: 'New Note',
      destination: '#notes/new'
    };
    _([homeParams, newNoteParams]).each(this.addItemView.bind(this));
  },

  addIndexView: function(items) {
    var subview = new cleverNote.Views.noteContainerIndex({ collection: items });
    this.addSubview('ul.metismenu', subview);
  },

  addItemView: function(params) {
    var subview = new cleverNote.Views.notesContainerIndexItem(params);
    this.addSubview('ul.metismenu', subview);
  },


  removeItemView: function(item) {
    this.rmeoveModelSubview('ul.meismenu', item);
  },

  onRender: function () {
    $('#side-menu').metisMenu();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  }
});
