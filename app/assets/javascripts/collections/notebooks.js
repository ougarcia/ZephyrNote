cleverNote.Collections.Notebooks = Backbone.Collection.extend({
  url: '/api/notebooks',
  model: cleverNote.Models.Notebook,

  getOrFetch: function(id, cb) {
    var that = this;
    var notebook;
    if ( !(notebook = this.get(id)) ) {
      notebook = new cleverNote.Models.Notebook({ id: id });
      notebook.fetch({
        success: function () {
          that.add(notebook);
          if (cb) {
            cb(notebook);
          }
        }
      });
    } else {
      notebook.fetch({
        success: cb
      });
    }

    return notebook;
  }
});
