cleverNote.Views.NotesIndex = Backbone.CompositeView.extend({
  template: JST['notes/index'],
  className: 'notes-index',

  initialize: function () {
    this.collection = this.model.notes();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function(note) {
    var subview = new cleverNote.Views.notesIndexItem({ model: note });
    this.addSubview('.notes', subview);
  },

  removeItemView: function(note) {
    this.removeModelSubview('.notes', note);
  },

  render: function () {
    var content = this.template({ parent: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
