window.cleverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    var notebooks = new cleverNote.Collections.Notebooks();
    var router = new cleverNote.Routers.Router({
      $rootEl: $('#content'),
      notebooks: notebooks
    });
    Backbone.history.start();
  }

};

$(document).ready(function(){
  cleverNote.initialize();
});
