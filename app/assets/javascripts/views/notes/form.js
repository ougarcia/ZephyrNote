cleverNote.Views.NoteForm = Backbone.View.extend({
  className: 'row',
  template: JST['notes/form'],

  events: {
    'click button': 'handleSubmit'
  },

  initialize: function (options) {
    if (options.model) {
      this.model = options.model;
    } else {
      this.noteId = options.noteId;
    }

    this.notebook = options.notebook;
    this.listenToOnce(this.notebook, 'sync', this.setModel);
  },

  setModel: function () {
    this.model = this.model || this.notebook.notes().get(this.noteId);
    this.render();
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$('form').serializeJSON();
    attrs['note']['notebook_id'] = this.notebook.id;
    this.model.save(attrs, {
      patch: true,
      success: function() {
        that.notebook.notes().add(that.model);
        Backbone.history.navigate(
          'notebooks/' + that.notebook.id + '/notes/' + that.model.id,
          { trigger: true }
        );
      }
    });
  },

  render: function () {
    if (this.model) {
      var content = this.template({ note: this.model });
      this.$el.html(content);
    }
    return this;
  }
});
