cleverNote.Views.NoteFormNotebooks = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/notebooks'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      notebooks: this.collection,
      defaultNotebook: this.model
    });
    this.$el.html(content);
    return this;
  }
});
