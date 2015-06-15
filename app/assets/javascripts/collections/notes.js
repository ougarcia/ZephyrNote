cleverNote.Collections.Notes = Backbone.Collection.extend({
  model: cleverNote.Models.Note,
  url: '/api/notes',
  initialize: function(options){
    if (options && options.notebook) {
      this.notebook = options.notebook;
    }
  }
});
