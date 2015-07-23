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
    this._swapView(view);
    var rightView = new Backbone.View();
    this._setRightView(rightView);
  },

// Notebooks
//==============================================================================

  notebooksIndex: function () {
    this.notebooks.fetch();
    var view = new cleverNote.Views.NotebooksIndex({
      collection: this.notebooks
    });
    this._swapView(view);
    var rightView = new Backbone.View();
    this._setRightView(rightView);
  },


  showNotebook: function (id, noNote) {
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;
    notebook.fetch({
      success: function() {
        that.notebooks.add(notebook, { merge: true });
        if (!noNote) {
          that.showNote(notebook.notes().last().id, true);
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
    this._setRightView(view);
  },

  showNote: function(id, noNotebook) {
    this.notebooks.fetch();
    this.tags.fetch();
    var note = new cleverNote.Models.Note({ id: id });
    var that = this;
    note.fetch({
      success: function () {
        if (!noNotebook) {
          that.showNotebook(note.get('notebook_id'), true);
        }
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

  tagsIndex: function () {
    this.tags.fetch();
    var view = new cleverNote.Views.TagsIndex({ collection: this.tags });
    this._swapView(view);
    var rightView = new Backbone.View();
    this._setRightView(rightView);
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
    $('#sidebar').html(view.$el);
    view.render();
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
