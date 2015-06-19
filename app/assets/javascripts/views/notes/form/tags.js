cleverNote.Views.NoteFormTags = Backbone.View.extend({
  className: 'form-group',
  template: JST['notes/form/tags'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },

  onRender: function () {
    var x= $('.tm-input');
    var prefilledTitles = [];
    this.model.tags().each( function(tag) {
      prefilledTitles.push(tag.get('title'));
    });
    this.tagApi = this.$('.tm-input').tagsManager({
      prefilled: prefilledTitles,
      delimiters: [9, 13, 44, 32],
      deleteTagsOnBackspace: false,
      hiddenTagListName: 'note[tags_string]',
      tagsContainer: '#tags-target',
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

    $('.tm-input').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
      classNames: {
        menu: "dropdown-menu"
      }
    }, {
      name: 'tags',
      source: substringMatcher(tags)
    }).on('typeahead:selected', function (e, d) {
      this.tagApi.tagsManager("pushTag", d.name);
    });
    // the listener starting onl ine 58 might not be necessary
 
    $('.tm-input').on('tm:refresh', function(e, tag) {
      $('.tm-input').typeahead('close');
    });

  },

  render: function () {
    var tagIds = this.model.tags().map( function(tag) {
      return tag.id;
    });
    var content = this.template({
      tags: this.collection,
      tagIds: tagIds
    });
    this.$el.html(content);
    this.onRender();
    return this;
  }

});
