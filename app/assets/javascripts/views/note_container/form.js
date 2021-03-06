cleverNote.Views.noteContainerForm = Backbone.View.extend({
  className: "modal-dialog",
  template: JST['note_container/form'],

  events: {
    'click button.submit': 'handleSubmit',
    'click button.delete': 'handleDelete'
  },

  initialize: function(options) {
    this.$parent = options.parent;
  },

  handleDelete: function(event) {
    event.preventDefault();
    var that = this;
    this.$parent.modal('toggle');
    this.$parent.one('hidden.bs.modal', function(e) {
      that.model.destroy();
      Backbone.history.navigate('', { trigger: true});
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.$parent.modal('toggle');
    var that = this;
    var attrs = this.$('form').serializeJSON();
    this.model.set(attrs);
    // gotta wait for the modal to go away before redirecting
    this.$parent.one('hidden.bs.modal', function(e) {
      that.model.save({}, {
        success: function () {
          Backbone.history.navigate(that.model.routesName + '/' + that.model.id, { trigger: true });
        }
      });
    });
  },

  render: function () {
    var content = this.template({ item: this.model });
    this.$el.html(content);
    return this;
  }
});
