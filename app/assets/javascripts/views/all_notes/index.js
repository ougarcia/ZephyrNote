cleverNote.Views.allNotesIndex = Backbone.CompositeView.extend({
  template: JST['notes/index'],
  className: 'notes-index',

  initialize: function (options) {
    this.setRight = !options.stopRight;
    var that = this;
    this.collection.fetch({
      remove: false,
      data: { page: 1 },
      success: function() {
        that.setRightView();
        $('.notes').append(JST['notes/loading']);
      }
    });
    this.listenTo(this.collection, 'add', this.addItemView);
    this.listenTo(this.collection, 'remove', this.removeItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  setRightView: function() {
    if (typeof this.collection.first() === 'undefined') return;

    this.setRight && window.router.showNote(this.collection.first().id, true);
  },

  addItemView: function(note) {
    var subview = new cleverNote.Views.notesIndexItem({ model: note });
    this.addSubview('.notes', subview);
    $('abbr.timeago').timeago();
  },

  removeItemView: function(note) {
    this.removeModelSubview('.notes', note);
  },

  listenForScroll: function () {
    this.$('div.notes').off('scroll');
    var throttled = _.throttle(this.nextPage.bind(this), 200);
    this.$('div.notes').on("scroll", throttled);
  },

  nextPage: function () {
    var that = this;
    var notesDiv = this.$('div.notes');
    if (notesDiv.scrollTop() >= notesDiv.prop('scrollHeight') - notesDiv.height() - 5) {
      if (that.collection.page < that.collection.totalPages) {
        that.collection.fetch({
          data: { page: that.collection.page + 1 },
          remove: false,
          success: function () {
            $('#loading-gif').remove();
            $('.notes').append(JST['notes/loading']);
          }
        });
      } else {
        $('#loading-gif').remove();
      }
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    $('abbr.timeago').timeago();
    this.listenForScroll();
    return this;
  }
});
