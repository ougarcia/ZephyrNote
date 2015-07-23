cleverNote.Models.Tag = cleverNote.Models.noteContainer.extend({
  urlRoot: '/api/tags',
  routesName: 'tags',
  parseOptions: {},

  navigation: function () {
    return ('/#tags/' + this.id);
  }
});
