cleverNote.Views.NoteFormNotebooks = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/notebooks'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var nbid;
    if (!!this.model.get('notebook_id')) {
      nbid = this.model.get('notebook_id');
    } else {
      //TODO: fix this when I implement default notebooks
      nbid = 1;
    }
    var content = this.template({
      notebooks: this.collection,
      nbid: nbid
    });
    this.$el.html(content);
    return this;
  }
});
