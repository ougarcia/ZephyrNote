cleverNote.Views.noteContainerIndex = Backbone.CompositeView.extend({
  tagName: 'li',
  className: 'container-index',
  template: JST['note_container/index'],


  events: {
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


  addItemView: function (item) {
    var subview = new cleverNote.Views.notesContainerIndexItem({ model: item });
    this.addSubview('.container-list', subview);
  },

  removeItemView: function (item) {
    this.removeModelSubview('.container-list', item);
  },

  render: function () {
    var content = this.template({ title: this.collection.title });
    this.$el.html(content);
    this.attachSubviews();
    this.setModal();
    return this;
  }
});
