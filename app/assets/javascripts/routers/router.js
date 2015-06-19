cleverNote.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'startPage',
    'notes/new': 'newNote',
    'notes/:id': 'showNote',
    'notebooks': 'notebooksIndex',
    'notebooks/:id': 'showNotebook',
    'tags': 'tagsIndex',
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


  showNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;
    //TODO: I think i want to get rid of this line
    notebook.fetch({ success: that.notebooks.add.bind(notebook, { merge: true }) });

    var view = new cleverNote.Views.NotesIndex({ model: notebook });
    this._swapView(view);
  },

// Notes
//==============================================================================

  newNote: function () {
    this.notebooks.fetch();
    this.tags.fetch();
    var note = new cleverNote.Models.Note({ title: 'Untitled' });
    var view = new cleverNote.Views.NoteForm({
      model: note,
      notebooks: this.notebooks,
      tags: this.tags
    });
    this._swapView(view);
  },

  showNote: function(id) {
    this.notebooks.fetch();
    this.tags.fetch();
    var note = new cleverNote.Models.Note({ id: id });
    note.fetch();
    var view = new cleverNote.Views.NoteForm({
      model: note,
      notebooks: this.notebooks,
      tags: this.tags
    });
    this._swapView(view);
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
    tag.fetch({ success: that.tags.add.bind(tag, { merge: true }) });

    var view = new cleverNote.Views.NotesIndex({ model: tag });
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
