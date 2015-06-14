cleverNote.Views.NotebookForm = cleverNote.Views.noteContainerForm.extend({
  template: JST['notebooks/form'],

  initialize: function () {
    this.templateOptions = { notebook: this.model };
  }
});
