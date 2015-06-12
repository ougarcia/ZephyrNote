cleverNote.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'startPage',
    'notebooks/:nbid/notes/new': 'newNote',
    'notebooks/:nbid/notes/:id/edit': 'editNote',
    'notebooks/:nbid/notes/:id': 'showNote',
    'notebooks': 'notebooksIndex',
    'notebooks/new': 'newNotebook',
    'notebooks/:id/edit': 'editNotebook',
    'notebooks/:id': 'showNotebook',
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.$rootEl = options.$rootEl;
    this.rootView = new cleverNote.Views.Root();
    this.$rootEl.html(this.rootView.render().$el);
  },

  startPage: function () {
    var view = new cleverNote.Views.allNotesIndex();
    this.rootView.setView(view);
  },

// Notebooks
//===============================================================================  

  notebooksIndex: function () {
    this.notebooks.fetch();
    var view = new cleverNote.Views.NotebooksIndex({
      collection: this.notebooks
    });
    this.rootView.setView(view);
  },

  newNotebook: function () {
    var notebook = new cleverNote.Models.Notebook();
    var view = new cleverNote.Views.NotebookForm({
      model: notebook,
      collection: this.notebooks
    });
    this.rootView.setView(view);
  },

  editNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var view = new cleverNote.Views.NotebookForm({
      model: notebook,
      collection: this.notebooks
    });
    this.rootView.setView(view);
  },

  showNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;

    notebook.fetch({
      success: that.notebooks.add.bind(notebook, { merge: true })
    });

    var view = new cleverNote.Views.NotesIndex({ model: notebook });
    this.rootView.setView(view);
  },

// Notes
//==============================================================================

  newNote: function (nbid) {
    var notebook = this.notebooks.getOrFetch(nbid);
    var note = new cleverNote.Models.Note();
    var view = new cleverNote.Views.NoteForm({
      model: note,
      notebook: notebook
    });
    this.rootView.setView(view);
  },

  editNote: function (nbid, id) {
    var notebook = this.notebooks.getOrFetch(nbid);
    var view = new cleverNote.Views.NoteForm({ notebook: notebook, noteId: id });
    this.rootView.setView(view);
  },

  showNote: function(nbid, id) {
    var notebook = this.notebooks.getOrFetch(nbid);
    var view = new cleverNote.Views.showNote({ notebook: notebook, noteId: id });
    this.rootView.setView(view);
  },
});
