cleverNote.Views.NoteForm = Backbone.CompositeView.extend({
  className: '',
  template: JST['notes/form'],

  events: {
    'click .submit': 'handleSubmit',
    'click button.delete': 'handleDelete'
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

  addNoteDeleteSubview: function () {
    this.noteDeleteSubview = new cleverNote.Views.NoteFormDelete({ model: this.model });
    this.addSubview('.confirm-modal', this.noteDeletesubview);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    attrs['note']['body'] = this.noteBodySubview._editor.getHTML();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate('', { trigger: true });
      }
    });
  },

  handleDelete: function(event) {
    event.preventDefault();
    var that = this;
    var $confirm = $('.confirm-modal');
    $confirm.modal();
  },

  setModal: function() {
    var confirmSubview = new cleverNote.Views.NoteFormDelete({
      model: this.model
    });
    this.$('.confirm-modal').html(confirmSubview.$el);
    confirmSubview.render();
  },

  render: function () {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.noteBodySubview && this.noteBodySubview.onRender();
    this.tagsSubview && this.tagsSubview.onRender();
    this.setModal();
    return this;
  }
});
