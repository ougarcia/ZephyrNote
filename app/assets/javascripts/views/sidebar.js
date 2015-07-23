cleverNote.Views.Sidebar = Backbone.CompositeView.extend({
  // make sure that when I attach the subviews I append and not replace
  // the html
  // better yet, add the ul item for the subviews
  // then use css or jquery to add a content before
  className: 'text-center',
  template: JST['sidebar'],


  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.addNavLinks();
    this.addIndexView(this.notebooks);
    this.addIndexView(this.tags);
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
