cleverNote.Views.NotebookForm = Backbone.View.extend({
  tagName: 'form',
  template: JST['notebooks/form'],

  events: {
    'submit': 'handleSubmit'
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        Backbone.history.navigate('notebooks/' + that.model.id, { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);
    return this;
  }
});
