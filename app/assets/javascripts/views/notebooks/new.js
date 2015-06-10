cleverNote.Views.NewNotebook = Backbone.View.extend({
  tagName: 'form',
  template: JST['notebooks/form'],

  events: {
    'submit': 'handleSubmit'
  },

  handleSubmit: function(event) {
    console.log('hadling submit');
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        console.log('successfuly saved notebook');
        that.collection.add(that.model);
        Backbone.history.navigate('notebooks', { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);
    return this;
  }
});
