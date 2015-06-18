cleverNote.Views.notesIndexItem = Backbone.View.extend({
  template: JST['notes/index_item'],
  className: 'note-list-item',

  handleClick: function () {
    console.log('handling click!!');
    Backbone.history.navigate(
     'notebooks/' + this.model.get('notebook_id') + '/notes/' + this.model.id,
     { trigger: true }
    );
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    return this;
  }
});
