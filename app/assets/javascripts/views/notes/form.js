cleverNote.Views.NoteForm = Backbone.CompositeView.extend({
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
    this.tagIds = this.model.tags().map( function(tag) {
      return tag.id;
    });
    this.addTagsSubview();
    this.addNotebooksSubview();
    this.render();
  },

  addNotebooksSubview: function () {
    var subview = new cleverNote.Views.NoteFormNotebooks({
      collection: this.notebooks,
      model: this.notebook
    });
    this.addSubview('#notebooks-form', subview);
  },

  addTagsSubview: function () {
    var subview = new cleverNote.Views.NoteFormTags({
      collection: this.tags,
      tagIds: this.tagIds
    });
    this.addSubview('#tags-form', subview);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    this.model.set(attrs);
    this.model.save({}, {
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
      // gotta keep this from repeating
      var content = this.template({
        note: this.model,
        notebooks: this.notebooks,
        defaultNotebook: this.notebook,
        tags: this.tags,
        tagIds: this.tagIds
      });
      this.$el.html(content);
      this.attachSubviews();
    }
    return this;
  }
});
