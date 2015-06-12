cleverNote.Views.notesIndexItem = Backbone.View.extend({
  template: JST['notes/index_item'],
  tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    return this;
  }
});
