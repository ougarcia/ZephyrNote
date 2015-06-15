cleverNote.Views.allNotesIndex = Backbone.CompositeView.extend({
  // might be able to dry this up
  template: JST['notes/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function(note) {
    var subview = new cleverNote.Views.notesIndexItem({ model: note });
    this.addSubview('ul.notes', subview);
  },

  removeItemView: function(note) {
    this.removeModelSubview('ul.notes', note);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
