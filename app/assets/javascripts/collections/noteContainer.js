cleverNote.Collections.noteContainer = Backbone.Collection.extend({

  getOrFetch: function(id, cb) {
    var that = this;
    var item;
    if ( !(item = this.get(id)) ) {
      item = new this.model({ id: id });
      item.fetch({
        success: function () {
          that.add(item);
          !!cb && cb(item);
        }
      });
    } else {
      item.fetch({
        success: function () {
          !!cb && cb(item);
        }
      });
    }

    return item;
  }

});
