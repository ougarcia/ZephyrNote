cleverNote.Views.NoteFormTags = Backbone.View.extend({
  className: 'form-group navbar-left',
  template: JST['notes/form/tags'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },

  onRender: function () {
    var $input = this.$('input#bst');

    // turn on tagsinput plugin
    $input.tagsinput({
      confirmKeys: [9, 13, 44, 32],
    });

    // preload the pre-existigns tags
    this.model.tags().each(function(tag) {
      $input.tagsinput('add', tag.get('title'));
    });

    this.setTypeAhead($input);
  },

  substringMatcher: function(strs) {
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
  },

  setTypeAhead: function ($input) {
    // return if $typeAhead hadn't been rendered on DOM yet
    var $typeAhead = $input.tagsinput('input');
    if (typeof $typeAhead === 'undefined') return null;

    //get all tag titles for use with typeahead
    var tags = this.collection.map(function(tag) {
      return tag.get('title');
    });
    // turn on typeahead
    $typeAhead.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
      classNames: {
        menu: "dropdown-menu"
      }
    }, {
      name: 'tags',
      source: this.substringMatcher(tags)
    });

    // clear typeahead when an input gets turned into a tag
    $('input#bst').on('itemAdded', function(e, tag) {
      $typeAhead.typeahead('close');
    });

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.onRender();
    return this;
  }

});
