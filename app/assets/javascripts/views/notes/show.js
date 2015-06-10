cleverNote.Views.showNote = Backbone.View.extend({
  template: JST['notes/show'],

  // don't have an api/notes/:id, so we have to fetch the notebook before
  // we can display the notes

  initialize: function (options) {
    this.notebook = options.notebook;
    this.noteId = options.noteId;
    this.listenTo(this.notebook, 'sync', this.render);
  },

  render: function () {
    var note = this.notebook.notes().get(this.noteId);
    if (note) {
      var content = this.template({ note: note });
      this.$el.html(content);
      return this;
    } else {
      return;
    }
  }
});
