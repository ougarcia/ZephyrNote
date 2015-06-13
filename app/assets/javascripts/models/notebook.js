cleverNote.Models.Notebook = Backbone.Model.extend(
  _.extend({}, cleverNote.Models.noteContainer, {
    urlRoot: '/api/notebooks',
    routesName: 'notebooks',
  })
);
