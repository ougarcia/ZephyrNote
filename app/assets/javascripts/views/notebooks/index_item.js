cleverNote.Views.NotebooksIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['notebooks/index_item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);
    return this;
  }
});
