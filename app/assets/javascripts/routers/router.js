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
    this._focusMiddle();
    var notes = new cleverNote.Collections.Notes();
    var view = new cleverNote.Views.allNotesIndex({
      collection: notes,
      stopRight: !!stopRight
    });
    this._swapView(view);
    var rightView = new Backbone.View();
    this._setRightView(rightView);
  },

// Notebooks
//==============================================================================

  showNotebook: function (id, options) {
    options = options || { setNote: true };
    var setNote = options.setNote;
    setNote && this._focusMiddle();
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;
    notebook.fetch({
      success: function() {
        that.notebooks.add(notebook, { merge: true });
        if (setNote && notebook.notes().length > 0) {
          that.showNote(notebook.notes().last().id, { setNb: false });
        }
      }
    });
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
    this.startPage(true);
    this._focusRight();
    this._setRightView(view);
  },

  showNote: function(id, options) {
    options = options || { setNb: true };
    var setNb = options.setNb;
    setNb && this._focusRight();
    this.notebooks.fetch();
    this.tags.fetch();
    var note = new cleverNote.Models.Note({ id: id });
    var that = this;
    note.fetch({
      success: function () {
        setNb && that.showNotebook(note.get('notebook_id'), { setNote: false });
      }
    });
    var view = new cleverNote.Views.NoteForm({
      model: note,
      notebooks: this.notebooks,
      tags: this.tags
    });
    this._setRightView(view);
  },

// Tags
//==============================================================================

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
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $('#middle-content').html(view.$el);
    view.render();
    view.onRender && view.onRender();
  },

  _setRightView: function(view) {
    this._rightView && this._rightView.remove();
    this._rightView = view;
    $('#right-content').html(view.$el);
    view.render();
    view.onRender && view.onRender();
  }

});
