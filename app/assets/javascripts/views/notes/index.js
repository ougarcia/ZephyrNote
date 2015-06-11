cleverNote.Views.NotesIndex = Backbone.View.extend({
  // will eventually make into a composite view
  template: JST['notes/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
