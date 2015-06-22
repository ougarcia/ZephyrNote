cleverNote.Models.Note = Backbone.Model.extend({
  urlRoot: '/api/notes',

  tags: function () {
    this._tags = this._tags || new cleverNote.Collections.Tags([], {
      note: this
    });
    return this._tags;
  },


  parse: function (response) {
    if (response.tags) {
      this.tags().set(response.tags);
      delete response.tags;
    }

    return response;
  }
});
