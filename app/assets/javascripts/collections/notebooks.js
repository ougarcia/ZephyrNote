cleverNote.Collections.Notebooks = Backbone.Collection.extend(
  _.extend({}, cleverNote.Collections.noteContainer, {
  url: '/api/notebooks',
  model: cleverNote.Models.Notebook,
  })
);
