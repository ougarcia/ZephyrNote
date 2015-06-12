cleverNote.Models.Tag = Backbone.Model.extend({
  urlRoot: '/api/tags',
  routesName: 'tags',

  notes: function () {
    this._notes = this._notes || new cleverNote.Collections.Notes({
      tag: this
    });
    return this._notes;
  },



  parse: function (response) {
    if (response.notes) {
      this.notes().set(response.notes, { parse: true });
      delete response['notes'];
    }

    return response;
  }
});
