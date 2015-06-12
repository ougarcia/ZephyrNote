cleverNote.Views.NoteForm = Backbone.View.extend({
  className: 'row',
  template: JST['notes/form'],

  events: {
    'click button': 'handleSubmit'
  },

  initialize: function (options) {
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.notebook = this.notebooks.getOrFetch(
      options.notebookId,
      this.setModel.bind(this, options)
    );
    this.notebooks.fetch();
    this.tags.fetch();
    this.listenTo(this.notebooks, 'sync', this.render);
    this.listenTo(this.tags, 'sync', this.render);
  },
  
  setModel: function (options) {
    this.model = options.note || this.notebook.notes().get(options.noteId);
    this.render();
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    this.model.save(attrs, {
      patch: true,
      success: function () {
        that.submitSuccess();
      }
    });
  },

  submitSuccess: function () {
    if ( (this.model.get('notebook_id') !== this.notebook.id) ) {
      this.notebook.notes().remove(this.note);
      this.notebook = this.notebooks.getOrFetch(this.model.get('notebook_id'));
    }
    this.notebook.notes().add(this.model);
    Backbone.history.navigate(
      'notebooks/' + this.notebook.id + '/notes/' + this.model.id,
      { trigger: true }
    );
  },

  render: function () {
    if (this.model) {
      var content = this.template({
        note: this.model,
        notebooks: this.notebooks,
        defaultNotebook: this.notebook
      });
      this.$el.html(content);
    }
    return this;
  }
});
