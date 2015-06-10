cleverNote.Views.NotebooksIndex = Backbone.View.extend({
  template: JST['notebooks/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add change:title remove reset', this.render);
  },


  render: function () {
    // eventually make this a composite view, won't iterate over
    // notebooks in template, that's sloppy.

    var content = this.template({ notebooks: this.collection });
    this.$el.html(content);
    return this;
  }
});
