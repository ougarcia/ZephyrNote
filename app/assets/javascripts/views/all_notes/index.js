cleverNote.Views.allNotesIndex = Backbone.CompositeView.extend({
  // might be able to dry this up
  template: JST['notes/index'],

  initialize: function () {
    this.collection.fetch({
      remove: false,
      data: { page: 1 }
    });
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function(note) {
    var subview = new cleverNote.Views.notesIndexItem({ model: note });
    this.addSubview('ul.notes', subview);
  },

  removeItemView: function(note) {
    this.removeModelSubview('ul.notes', note);
  },

  listenForScroll: function () {

    $(window).off("scroll");
    var throttled = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttled);
  },

  nextPage: function () {
    var that = this;
    console.log(this.collection.length);
    if ($(window).scrollTop() > $(document).height() - $(window).height() -40) {
      if (that.collection.page < that.collection.totalPages) {
        that.collection.fetch({
          data: { page: that.collection.page + 1 },
          remove: false
        });
      }
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.listenForScroll();
    return this;
  }
});
