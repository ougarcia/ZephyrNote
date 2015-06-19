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
  },


  getOrFetch: function(id, cb) {
    var that = this;
    var note;
    if ( !(note = this.get(id)) ) {
      note = new cleverNote.Models.Note({ id: id });
      note.fetch({
        success: function () {
          that.add(note);
          if (cb) {
            cb(note);
          }
        }
      });
    } else {
      note.fetch({
        success: cb
      });
    }

    return note;
  }
});
