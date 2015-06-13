cleverNote.Collections.Tags = Backbone.Collection.extend(
  _.extend({}, cleverNote.Collections.noteContainer, {
    url: '/api/tags',
    model: cleverNote.Models.Tag,
  })
);
