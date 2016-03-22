window.cleverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  initialize: function() {
    var notebooks = new cleverNote.Collections.Notebooks();
    var tags = new cleverNote.Collections.Tags();
    window.router = new cleverNote.Routers.Router({
      $rootEl: $('#big-container'),
      notebooks: notebooks,
      tags: tags
    });
    Backbone.history.start();
  }

};

$(document).ready(function(){
  if (document.querySelector('body').className === "static_pages root") {
    cleverNote.initialize();
  }
});
