cleverNote.Collections.Notebooks = Backbone.Collection.extend({
  url: '/api/notebooks',
  title: 'Notebooks',
  model: cleverNote.Models.Notebook,
});

_.extend(
  cleverNote.Collections.Notebooks.prototype,
  cleverNote.Mixins.getOrFetchable
);
