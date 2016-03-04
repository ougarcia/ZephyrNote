cleverNote.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'startPage',
    'notes/new': 'newNote',
    'notes/:id': 'showNote',
    'notebooks/:id': 'showNotebook',
    'tags/:id': 'showTag'
  },

  initialize: function(options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.$rootEl = options.$rootEl;
    this.setSidebar();
  },

  startPage: function (stopRight) {
    var notes = new cleverNote.Collections.Notes();

    var view = new cleverNote.Views.allNotesIndex({
      collection: notes,
      stopRight: !!stopRight
    });

    this._focusMiddle();
    this._swapView(view);
    this._setRightView(new Backbone.View());
  },

// Notebooks
//==============================================================================

  showNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var view = new cleverNote.Views.NotesIndex({ model: notebook });

    notebook.fetch({
      success: this._onNotebookFetchSuccess.bind(this, notebook)
    });

    this._focusMiddle();
    this._swapView(view);
  },

// Notes
//==============================================================================

  newNote: function () {
    var note = new cleverNote.Models.Note({ title: 'Untitled' });
    var view = new cleverNote.Views.NoteForm(this._noteViewParams(note));

    this.notebooks.fetch();
    this.tags.fetch();

    this.startPage(true);
    this._focusRight();
    this._setRightView(view);
  },

  showNote: function(id) {
    var note = new cleverNote.Models.Note({ id: id });
    var view = new cleverNote.Views.NoteForm(this._noteViewParams(note));

    this.notebooks.fetch();
    this.tags.fetch();
    note.fetch();

    this._focusRight();
    this._setRightView(view);
  },

// Tags
//==============================================================================

  showTag: function (id) {
    var tag = this.tags.getOrFetch(id);
    var that = this;
    var view = new cleverNote.Views.NotesIndex({ model: tag });

    tag.fetch({ success: this.tags.add.bind(tag, { merge: true }) });

    this._swapView(view);
  },

// Helpers
//==============================================================================

  setSidebar: function () {
    this.notebooks.fetch();
    this.tags.fetch();

    var view = new cleverNote.Views.Sidebar({
      notebooks: this.notebooks,
      tags: this.tags
    });

    $('#sidebar').html(view.$el);
    view.render();
  },

  _focusMiddle: function () {
    $('#middle-content').removeClass('hidden-xs');
    $('#right-content').addClass('hidden-xs');
  },

  _focusRight: function () {
    $('#right-content').removeClass('hidden-xs');
    $('#middle-content').addClass('hidden-xs');
  },

  _swapView: function(view) {
    this._replaceView(this._currentView, $('#middle-content'), view);
  },

  _setRightView: function(view) {
    this._replaceView(this._rightView, $('#right-content'), view);
  },

  _replaceView: function(property, $attachPoint, view) {
    if (property) property.remove();

    property = view;
    $attachPoint.html(view.$el);
    view.render();

    if (view.onRender) view.onRender();
  },

  _noteViewParams: function(note) {
    return {
      model: note,
      notebooks: this.notebooks,
      tags: this.tags
    };
  },

  _onNotebookFetchSuccess: function (notebook) {
    this.notebooks.add(notebook, { merge: true });
    if (notebook.notes().length > 0) this.showNote(notebook.notes().last().id);
  }
});
