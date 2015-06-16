cleverNote.Views.showNote = Backbone.View.extend({
  template: JST['notes/show'],
  className: "row",
  // don't have an api/notes/:id, so we have to fetch the notebook before
  // we can display the notes

  initialize: function (options) {
    this.notebook = options.notebook;
    this.noteId = options.noteId;
    // check if the note's there, if it's note, fetch the notebook
    this.listenTo(this.notebook, 'sync', this.render);
  },

  render: function () {
    var note = this.notebook.notes().get(this.noteId);
    if (note) {
      var content = this.template({ note: note, notebook: this.notebook });
      this.$el.html(content);
    }
    return this;
  }
});
