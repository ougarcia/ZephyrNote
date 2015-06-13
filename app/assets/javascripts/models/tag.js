cleverNote.Models.Tag = Backbone.Model.extend(
  _.extend({}, cleverNote.Models.noteContainer, {
    urlRoot: '/api/tags',
    routesName: 'tags',
  })
);
