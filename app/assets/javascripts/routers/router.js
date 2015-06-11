cleverNote.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'startPage',
    'notebooks': 'notebooksIndex',
    'notebooks/new': 'newNotebook',
    'notebooks/:id/edit': 'editNotebook',
    'notebooks/:id': 'showNotebook',
    'notes/:nbid/:id': 'showNote'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.$rootEl = options.$rootEl;
    this.rootView = new cleverNote.Views.Root();
    this.$rootEl.html(this.rootView.render().$el);
  },

  startPage: function () {
    var view = new cleverNote.Views.NotesIndex();
    this.rootView.setView(view);
  },

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
    console.log('hit route');
    var view = new cleverNote.Views.NotebookForm({
      model: notebook,
      collection: this.notebooks
    });
    this.rootView.setView(view);
  },

  showNotebook: function (id) {
    var notebook = this.notebooks.getOrFetch(id);
    var that = this;

    // maybe find a way to make this less ugly
    notebook.fetch({
      success: function () {
        that.notebooks.add(notebook, { merge: true });
      }
    });

    var view = new cleverNote.Views.ShowNotebook({ model: notebook });
    this.rootView.setView(view);
  },

  showNote: function(nbid, id) {
    var notebook = this.notebooks.getOrFetch(nbid);
    var view = new cleverNote.Views.showNote({ notebook: notebook, noteId: id });
    this.rootView.setView(view);
  },

});
