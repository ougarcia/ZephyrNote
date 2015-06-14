cleverNote.Views.TagForm = cleverNote.Views.noteContainerForm.extend({
  template: JST['tags/form'],

  initialize: function () {
    this.templateOptions = { tag: this.model };
  }
});
