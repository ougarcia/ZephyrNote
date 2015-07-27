cleverNote.Views.notesIndexItem = Backbone.View.extend({
  template: JST['notes/index_item'],
  className: 'note-list-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    //var bodyString = this.model.get('body').replace(/<(?:.|\n)*?>/gm, ' ');
    var bodyString = this.model.get('body');
    var content = this.template({
      note: this.model,
      tags: this.model.tags(),
      bodyString: bodyString
    });
    this.$el.html(content);
    return this;
  }
});
