cleverNote.Views.NoteFormTags = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/tags'],

  initialize: function (options) {
    this.tagIds = options.tagIds;
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      tags: this.collection,
      tagIds: this.tagIds
    });
    this.$el.html(content);
    return this;
  }

});
