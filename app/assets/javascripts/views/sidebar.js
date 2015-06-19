cleverNote.Views.Sidebar = Backbone.View.extend({
  className: 'text-center',
  template: JST['sidebar'],

  events: {
    'click button': 'goTo'
  },

  initialize: function (options) {
  },

  goTo: function(event) {
    var destination;
    switch($(event.currentTarget).attr('id')) {
      case 'new-button':
        destination = 'notes/new';
        break;
      case 'notebooks-button':
        destination = 'notebooks';
        break;
      case 'home-button':
        destination = '';
        break;
      case 'tags-button':
        destination = 'tags';
        break;
      case 'log-out-button':
        this.logOut();
        break;
      default:
        // do nothing
    }
    Backbone.history.navigate(destination, {trigger: true});
  },

  logOut: function () {
    $.ajax({
      url: "/session",
      method: "delete",
    });
    window.location.replace('session/new');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
