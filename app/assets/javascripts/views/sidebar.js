cleverNote.Views.Sidebar = Backbone.View.extend({
  className: 'text-center',
  //remove bg-danger class eventually, this is just so i can keep track
  //of the sidebar for now
  template: JST['sidebar'],

  events: {
    'click #notebooks-button': 'goToNotebooks',
    'click #home-button': 'goToHome'
  },

  initialize: function (options) {
  },


  goToNotebooks: function () {
    console.log($(event.currentTarget).attr('id'));
    Backbone.history.navigate('notebooks', {trigger: true});
  },

  goToHome: function (event) {
    console.log($(event.currentTarget).attr('id'));
    Backbone.history.navigate('', {trigger: true} );
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
