cleverNote.Views.notesContainerIndexItem = Backbone.View.extend({
  tagName: 'li',
  className: 'container-list-item',
  template: JST['note_container/index_item'],

  initialize: function (options) {
    if (!!this.model) {
      this.listenTo(this.model, 'sync', this.render);
      this.title = this.model.get('title');
      this.destination = this.model.navigation();
    } else {
      this.title = options.title;
      this.destination = options.destination;
    }
  },

  render: function () {
    var content = this.template({
      destination: this.destination,
      title: this.title
    });
    this.$el.html(content);
    return this;
  }
});
