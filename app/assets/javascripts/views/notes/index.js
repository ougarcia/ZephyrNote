cleverNote.Views.NotesIndex = Backbone.View.extend({
  // will eventually make into a composite view
  template: JST['notes/index'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      category: this.model
      //notes: this.model.notes()
    });
    this.$el.html(content);
    return this;
  }
});
