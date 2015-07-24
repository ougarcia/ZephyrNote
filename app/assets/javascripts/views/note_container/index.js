cleverNote.Views.noteContainerIndex = Backbone.CompositeView.extend({
  tagName: 'li',
  className: 'container-index',
  template: JST['note_container/index'],

  events: {
    'click a.activate-modal': 'modalForm'
  },

  initialize: function () {
    this.collection.each(this.addItemView.bind(this));
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
  },

  addModalLi: function() {
    var $modalLi = $('<li>', {
      'class': 'container-list-item',
      'html': '<a href="#" class="activate-modal"> New ' + this.collection.title + '</a>'
    });
    this.$('ul.nav-second-level').append($modalLi);
    this.setModal();
  },

  setModal: function () {
    var newItem = new this.collection.model();
    var newView = new cleverNote.Views.noteContainerForm({
      model: newItem,
      collection: this.collection
    });
    this.$modalDiv = this.$('.' + this.collection.title.toLowerCase() + '-modal');
    this.$modalDiv.html(newView.$el);
    newView.render();
  },

  modalForm: function (event) {
    event.preventDefault();
    //kind of fixes it but kinda hacky
    this.$modalDiv.modal({
      backdrop: false
    });
  },

  addItemView: function (item) {
    var subview = new cleverNote.Views.notesContainerIndexItem({ model: item });
    // the modalLi will always get added before the subviews because the
    // subviews get added async. right now i prepende subviews
    this.addSubview('.container-list', subview, true);
  },

  removeItemView: function (item) {
    this.removeModelSubview('.container-list', item);
  },

  render: function () {
    var content = this.template({ title: this.collection.title });
    this.$el.html(content);
    this.attachSubviews();
    this.addModalLi();
    return this;
  }
});
