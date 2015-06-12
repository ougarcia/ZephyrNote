cleverNote.Views.ShowNotebook = Backbone.View.extend({
  template: JST['notebooks/show'],
  // i think this is deprecated

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      notebook: this.model,
      notes: this.model.notes()
    });
    this.$el.html(content);
    return this;
  }
});
