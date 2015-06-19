cleverNote.Views.NoteFormBody = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/body'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  onRender: function () {
    $('#full-editor').length > 0 && this.setEditor();
  },

  setEditor: function () {
    this._editor = new Quill('#full-editor', {
      modules: {
        'toolbar': { container: '#full-toolbar' },
        'image-tooltip': true,
        'link-tooltip': true
      },
      theme: 'snow'
    });
    var body = (this.model.get('body') || "");
    this._editor.setHTML(body);
    this.$('#full-editor').addClass('form-control');
  },

  render: function () {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    this.onRender();
    return this;
  }
});
