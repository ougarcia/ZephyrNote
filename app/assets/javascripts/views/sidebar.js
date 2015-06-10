cleverNote.Views.Sidebar = Backbone.View.extend({
  className: 'bg-danger',
  //remove bg-danger class eventually, this is just so i can keep track
  //of the sidebar for now
  template: JST['sidebar'],

  initialize: function (options) {
  },

  render: function () {
    console.log('rendering sidebar');
    var content = this.template();
    this.$el.html('<h1>heyheyhye</h1>');
    return this;
  }
});
