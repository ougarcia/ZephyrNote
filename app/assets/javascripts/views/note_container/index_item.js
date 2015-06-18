cleverNote.Views.notesContainerIndexItem = Backbone.View.extend({
  tagName: 'div',
  className: 'container-list-item',
  template: JST['note_container/index_item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ item: this.model });
    this.$el.html(content);
    return this;
  }
});
