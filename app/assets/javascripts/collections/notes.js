cleverNote.Collections.Notes = Backbone.Collection.extend({
  model: cleverNote.Models.Note,
  url: '/api/notes',

  initialize: function(options){
    if (options && options.notebook) {
      this.notebook = options.notebook;
    }
  },

  parse: function(response) {
    if (response.page) {
      this.page = parseInt(response.page);
      this.totalPages = parseInt(response.total_pages);
      return response.models;
    } else {
      return response;
    }
  }
});
