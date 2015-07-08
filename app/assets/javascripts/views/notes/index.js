cleverNote.Views.NotesIndex = Backbone.CompositeView.extend({
  template: JST['notes/index'],
  className: 'notes-index',

  events: {
    'click .sort-button': 'reorder',
    'click .edit-notebook-link': 'showModal'
  },

  initialize: function () {
    this.collection = this.model.notes();
    this.collection.comparator = "updated_at";
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
    this.collection.each(this.addItemView.bind(this));
  },


  setModal: function () {
    var newView = new cleverNote.Views.noteContainerForm({
      model: this.model,
    });
    this.$('.my-modal').html(newView.$el);
    newView.render();
  },

  showModal: function(event) {
    event.preventDefault();
    $('.my-modal').modal();
  },

  reorder: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    this.clearSubviews();
    var order = $target.text().split(" - ")[0];
    var dir = $target.text().split(" - ")[1];
    this.reorderCollection(order, dir);
    this.collection.each(this.addItemView.bind(this));

    this.render();
  },


  reorderCollection: function(order, dir) {
    switch (order) {
      case "Created":
        this.collection.comparator = "created_at";
        break;
      case "Updated":
        this.collection.comparator = "updated_at";
        break;
      case "Title":
        this.collection.comparator = "title";
        break;
      default:
        console.log("weird");
    }
    this.collection.sort();
    if (dir !== "oldest") {
      this.collection.models = this.collection.models.reverse();
    }
  },

  clearSubviews: function () {
    this.eachSubview(function(subview) {
      subview.remove();
    });
    this._subviews['.notes'] = _([]);
  },
  addItemView: function(note) {
    var subview = new cleverNote.Views.notesIndexItem({ model: note });
    this.addSubview('.notes', subview);
  },

  removeItemView: function(note) {
    this.removeModelSubview('.notes', note);
  },

  render: function () {
    var content = this.template({
      parent: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    this.setModal();
    $('abbr.timeago').timeago();
    return this;
  }
});
