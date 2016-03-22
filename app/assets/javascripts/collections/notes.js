cleverNote.Collections.Notes = Backbone.Collection.extend({
  model: cleverNote.Models.Note,
  url: '/api/notes',

  initialize: function(options){
    if (options && options.notebook) this.notebook = options.notebook;
  },

  // Need to figure out why I'm returning response.models in one case
  parse: function(response) {
    if (typeof response.page !== 'undefined') {
      this.page = parseInt(response.page, 10);
      this.totalPages = parseInt(response.total_pages, 10);
      return response.models;
    }

    return response;
  }
});

_.extend(
  cleverNote.Collections.Notes.prototype,
  cleverNote.Mixins.getOrFetchable
);

