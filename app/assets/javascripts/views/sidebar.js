cleverNote.Views.Sidebar = Backbone.View.extend({
  className: 'text-center',
  //remove bg-danger class eventually, this is just so i can keep track
  //of the sidebar for now
  template: JST['sidebar'],

  events: {
    'click button': 'goTo'
  },

  initialize: function (options) {
  },

  goTo: function(event) {
    var destination;
    switch($(event.currentTarget).attr('id')) {
      case 'notebooks-button':
        destination = 'notebooks';
        break;
      case 'home-button':
        destination = '';
        break;
      default:
        // do nothing
    }
    Backbone.history.navigate(destination, {trigger: true});
  },

  goToNotebooks: function (event) {
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
