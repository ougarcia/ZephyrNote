cleverNote.Views.noteContainerIndex = Backbone.CompositeView.extend({
  //need template and subviewSelector

  initialize: function () {
    this.collection.each(this.addItemView.bind(this));
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
  },

  addItemView: function (item) {
    var subview;
    if (item.routesName === 'notebooks') {
      subview = new cleverNote.Views.NotebooksIndexItem({ model: item });
    } else {
      subview = new cleverNote.Views.TagsIndexItem({ model: item });
    }
    this.addSubview(this.subviewSelector, subview);
  },

  removeItemView: function (item) {
    this.removeModelSubview(this.subviewSelector, item);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
