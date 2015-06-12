cleverNote.Views.TagsIndex = Backbone.CompositeView.extend({
  template: JST['tags/index'],

  initialize: function () {
    this.collection.each(this.addItemView.bind(this));
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
  },

  addItemView: function (tag) {
    var subview = new cleverNote.Views.TagsIndexItem({ model: tag });
    this.addSubview('ul.tags', subview);
  },

  removeItemView: function (tag) {
    this.removeModelSubview('ul.tags', tag);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
