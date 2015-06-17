cleverNote.Views.NoteFormTags = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/tags'],

  initialize: function (options) {
    this.tagIds = options.tagIds;
    this.listenTo(this.collection, 'sync', this.render);
  },

  onRender: function () {
    var x= $('.tm-input');
    var prefilledTitles = [];
    this.model.tags().each( function(tag) {
      prefilledTitles.push(tag.get('title'));
    });
    this.$('.tm-input').tagsManager({
      prefilled: prefilledTitles,
      delimiters: [9, 13, 44, 32],
      deleteTagsOnBackspace: false,
      hiddenTagListName: 'note[tags_string]'
    });
    this.setTypeahead();
  },

  setTypeahead: function () {
    var tags = [];
    this.collection.each( function(tag) {
      tags.push(tag.get('title'));
    });

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if(substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      mingLength: 1
    }, {
      name: 'tags',
      source: substringMatcher(tags)
    }).on('typeahead:selected', function (e, d) {
      tagApi.tagsManager("pushTag", d.name);
    });


  },

  render: function () {
    var content = this.template({
      tags: this.collection,
      tagIds: this.tagIds
    });
    this.$el.html(content);
    this.onRender();
    return this;
  }

});
