cleverNote.Views.notesIndexItem = Backbone.View.extend({
  template: JST['notes/index_item'],
  className: 'note-list-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    debugger;
    var content = this.template({
      note: this.model,
      tags: this.model.tags()
    });
    this.$el.html(content);
    return this;
  }
});
