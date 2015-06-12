cleverNote.Views.NoteForm = Backbone.View.extend({
  className: 'row',
  template: JST['notes/form'],

  events: {
    'click button': 'handleSubmit'
  },

  // use somthing like a closure or currying so that I only render when
  // notebook, notes, and tags are syncd

  initialize: function (options) {
    if (options.model) {
      this.model = options.model;
    } else {
      this.noteId = options.noteId;
    }
    this.notebook = options.notebook;
    this.notebooks = options.notebooks;
    this.listenToOnce(this.notebook, 'sync', this.setModel);
    this.listenTo(this.notebooks, 'sync', this.render);
    this.notebooks.fetch();
  },

  setModel: function () {
    this.model = this.model || this.notebook.notes().get(this.noteId);
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
        notebooks: this.notebooks
      });
      this.$el.html(content);
    }
    return this;
  }
});
