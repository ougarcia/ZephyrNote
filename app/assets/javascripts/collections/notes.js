cleverNote.Collections.Notes = Backbone.Collection.extend({
  model: cleverNote.Models.Note,
  url: '/api/notes',
  initialize: function(options){
    this.notebook = options.notebook;
  }
});
