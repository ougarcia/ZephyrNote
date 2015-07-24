cleverNote.Models.Tag = cleverNote.Models.noteContainer.extend({
  urlRoot: '/api/tags',
  routesName: 'tags',
  modelName: 'tag',
  parseOptions: {},

  navigation: function () {
    return ('/#tags/' + this.id);
  }
});
