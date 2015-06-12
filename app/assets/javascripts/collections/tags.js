cleverNote.Collections.Tags = Backbone.Collection.extend({
  url: '/api/tags',
  model: cleverNote.Models.Tag,

  getOrFetch: function(id) {
    var that = this;
    var tag;
    if ( !(tag = this.get(id)) ) {
      tag = new cleverNote.Models.Tag({ id: id });
      tag.fetch({
        success: function () {
          that.add(tag);
        }
      });
    } else {
      tag.fetch();
    }

    return tag;
  }
});

