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
    'tags': 'tagsIndex',
    'tags/new': 'newTag',
    'tags/:id/edit': 'editTag',
    'tags/:id': 'showTag'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.$rootEl = options.$rootEl;
    this.setSidebar();
  },

  startPage: function () {
    var notes = new cleverNote.Collections.Notes();
    var view = new cleverNote.Views.allNotesIndex({ collection: notes });
    this._swapView(view);
  },

// Notebooks
//===============================================================================  

  notebooksIndex: function () {
    this.notebooks.fetch();
    var view = new cleverNote.Views.NotebooksIndex({
      collection: this.notebooks
    });
    this._swapView(view);
  },

  newNotebook: function () {
    var notebook = new cleverNote.Models.Notebook();
    var view = new cleverNote.Views.NotebookForm({
      model: notebook,
      collection: this.notebooks
    });
    this._swapView(view);
  },

  editNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var view = new cleverNote.Views.NotebookForm({
      model: notebook,
      collection: this.notebooks
    });
    this._swapView(view);
  },

  showNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;

    // TODO: I think this line is wrong, but right now everything
    // works??
    notebook.fetch({
      success: that.notebooks.add.bind(notebook, { merge: true })
    });

    var view = new cleverNote.Views.NotesIndex({ model: notebook });
    this._swapView(view);
  },

// Notes
//==============================================================================

  newNote: function (nbid) {
    var note = new cleverNote.Models.Note();
    note.set('title', 'Untitled');
    var view = new cleverNote.Views.NoteForm({
      note: note,
      notebookId: nbid,
      notebooks: this.notebooks,
      tags: this.tags
    });
    this._swapView(view);
  },

  editNote: function (nbid, id) {
    var view = new cleverNote.Views.NoteForm({
      noteId: id,
      notebookId: nbid,
      notebooks: this.notebooks,
      tags: this.tags
    });
    this._swapView(view);
  },

  showNote: function(nbid, id) {
    this.editNote(nbid, id);
  },
// Tags
//==============================================================================

  tagsIndex: function () {
    this.tags.fetch();
    var view = new cleverNote.Views.TagsIndex({
      collection: this.tags
    });
    this._swapView(view);
  },

  showTag: function (id) {
    var tag = this.tags.getOrFetch(id);
    var that = this;

    tag.fetch({
      success: that.tags.add.bind(tag, { merge: true })
    });

    var view = new cleverNote.Views.NotesIndex({ model: tag });
    this._swapView(view);
  },

  editTag: function (id) {
    console.log('in edit tag route');
    var tag = this.tags.getOrFetch(id);
    var view = new cleverNote.Views.TagForm({
      model: tag,
      collection: this.tags
    });
    this._swapView(view);
  },

  newTag: function () {
    var tag = new cleverNote.Models.Tag();
    var view = new cleverNote.Views.TagForm({
      model: tag,
      collection: this.tags
    });
    this._swapView(view);
  },

// Bonus
//==============================================================================

  setSidebar: function () {
    var view = new cleverNote.Views.Sidebar();
    $('#sidebar').html(view.render().$el);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
    view.onRender && view.onRender();
  }

});
