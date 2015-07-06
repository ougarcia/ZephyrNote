cleverNote.Views.noteContainerIndex = Backbone.CompositeView.extend({
  className: 'container-index',
  template: JST['note_container/index'],


  events: {
    'click .sort-button': 'reorder',
    'click .new-item-button': 'modalForm'
  },

  initialize: function () {
    this.collection.each(this.addItemView.bind(this));
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
  },


  setModal: function () {
    var newItem = new this.collection.model();
    var newView = new cleverNote.Views.noteContainerForm({
      model: newItem,
      collection: this.collection
    });
    this.$('.my-modal').html(newView.$el);
    newView.render();
  },

  modalForm: function (event) {
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
    if (dir === "newest") {
      this.collection.models = this.collection.models.reverse();
    }
  },

  clearSubviews: function () {
    this.eachSubview(function(subview) {
      subview.remove();
    });
    this._subviews['.container-list'] = _([]);
  },

  addItemView: function (item) {
    var subview = new cleverNote.Views.notesContainerIndexItem({ model: item });
    this.addSubview('.container-list', subview);
  },

  removeItemView: function (item) {
    this.removeModelSubview('.container-list', item);
  },

  render: function () {
    var content = this.template({ view: this });
    this.$el.html(content);
    this.attachSubviews();
    this.setModal();
    return this;
  }
});
