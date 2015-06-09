cleverNote.Models.Notebook = Backbone.Model.extend({
  urlRoot: '/api/notebooks',

  notes: function () {
  },


  parse: function (response) {
    return response;
  }
});

