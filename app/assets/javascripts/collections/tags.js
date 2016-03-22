cleverNote.Collections.Tags = Backbone.Collection.extend({
  url: '/api/tags',
  title: 'Tags',
  model: cleverNote.Models.Tag,
});

_.extend(
  cleverNote.Collections.Tags.prototype,
  cleverNote.Mixins.getOrFetchable
);
