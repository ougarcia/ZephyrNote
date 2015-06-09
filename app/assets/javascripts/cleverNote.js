window.cleverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    var router = new cleverNote.Routers.Router({
      $rootEl: $('#content'),
      notebooks: new cleverNote.Collections.Notebooks()
    });
    Backbone.history.start();
  }

};

$(document).ready(function(){
  cleverNote.initialize();
});
