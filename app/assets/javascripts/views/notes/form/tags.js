cleverNote.Views.NoteFormTags = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/tags'],

  initialize: function (options) {
    this.tagIds = options.tagIds;
    this.listenTo(this.collection, 'sync', this.render);
  },

  onRender: function () {
    var x= $('.tm-input');
    var titles = [];
    this.model.tags().each( function(tag) {
      titles.push(tag.get('title'));
    });
    this.$('.tm-input').tagsManager({ prefilled: titles });
  },

  render: function () {
    var content = this.template({
      tags: this.collection,
      tagIds: this.tagIds
    });
    this.$el.html(content);
    this.onRender();
    return this;
  }

});
