cleverNote.Views.NoteForm = Backbone.CompositeView.extend({
  className: 'row',
  template: JST['notes/form'],

  events: {
    'click .submit': 'handleSubmit'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.notebooks = options.notebooks;
    this.tags = options.tags;
    this.setSubviews();
  },

  setSubviews: function () {
    this.addTagsSubview();
    this.addNotebooksSubview();
    this.addNoteBodySubview();
    this.render();
  },

  addNotebooksSubview: function () {
    var subview = new cleverNote.Views.NoteFormNotebooks({
      collection: this.notebooks,
      model: this.model 
    });
    this.addSubview('#notebooks-form', subview);
  },

  addTagsSubview: function () {
    this.tagsSubview = new cleverNote.Views.NoteFormTags({
      collection: this.tags,
      model: this.model
    });
    this.addSubview('#tags-form', this.tagsSubview);
  },

  addNoteBodySubview: function () {
    this.noteBodySubview = new cleverNote.Views.NoteFormBody({ model: this.model });
    this.addSubview('#note-body-form', this.noteBodySubview);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    attrs['note']['body'] = this.noteBodySubview._editor.getHTML();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate(
          'notebooks/' + that.model.get('notebook_id'),
          { trigger: true }
        );
      }
    });
  },


  render: function () {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    this.attachSubviews();
    // the first part of these shouldn't be necessary when i'm done.kjj
    this.noteBodySubview && this.noteBodySubview.onRender();
    this.tagsSubview && this.tagsSubview.onRender();
    return this;
  }
});
