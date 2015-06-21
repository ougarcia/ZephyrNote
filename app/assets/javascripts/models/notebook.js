cleverNote.Models.Notebook = cleverNote.Models.noteContainer.extend({
    urlRoot: '/api/notebooks',
    routesName: 'notebooks',
    parseOptions: { parse: true }
});
