cleverNote.Mixins.getOrFetchable = {
  getOrFetch: function(id, cb) {
    var item = this.get(id) || new this.model({ id: id });
    item.fetch({ success: this._onFetchSuccess.bind(this, cb, item) });

    return item;
  },

  _onFetchSuccess: function(cb, item) {
    this.add(item, { merge: true });
    if (cb) return cb(item);
  }
};
