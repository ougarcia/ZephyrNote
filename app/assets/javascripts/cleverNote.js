window.cleverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    var notebooks = new cleverNote.Collections.Notebooks();
    var tags = new cleverNote.Collections.Tags();
    var router = new cleverNote.Routers.Router({
      $rootEl: $('#big-container'),
      notebooks: notebooks,
      tags: tags
    });
    Backbone.history.start();
  }

};

$(document).ready(function(){
  cleverNote.initialize();
});
