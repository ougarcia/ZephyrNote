cleverNote.Models.Notebook = Backbone.Model.extend({
  urlRoot: '/api/notebooks',
  routesName: 'notebooks',

  notes: function () {
    this._notes = this._notes || new cleverNote.Collections.Notes({
      notebook: this
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

