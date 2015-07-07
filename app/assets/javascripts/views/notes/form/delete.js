cleverNote.Views.NoteFormDelete = Backbone.View.extend({
  className: "modal-dialog",
  template: JST['notes/form/delete'],

  events: {
    'click button.confirm-delete': 'handleConfirm',
    'click button.cancel-delete': 'handleCancel'
  },

  initialize: function() {
  },

  handleConfirm: function(event) {
    event.preventDefault();
    var that = this;
    $('.confirm-modal').modal('toggle');
    $('.confirm-modal').one('hidden.bs.modal', function(e) {
      that.model.destroy();
      Backbone.history.navigate(
        'notebooks/' + that.model.get('notebook_id'),
        { trigger: true }
      );
    });
  },

  handleCancel: function(event) {
    event.preventDefault();
    var that = this;
    $('.confirm-modal').modal('toggle');
  },

  render: function() {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    return this;
  }

});
