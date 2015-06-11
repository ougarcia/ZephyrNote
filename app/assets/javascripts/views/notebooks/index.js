cleverNote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST['notebooks/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function (item) {
    var subview = new cleverNote.Views.NotebooksIndexItem({ model: item });
    this.addSubview('ul', subview);
  },


  render: function () {
    var content = this.template({ notebooks: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
