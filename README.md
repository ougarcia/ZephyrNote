# [ZephyrNote] [live]

[![Code Climate](https://codeclimate.com/github/ougarcia/ZephyrNote/badges/gpa.svg)][codeclimate]
[![Build Status](https://travis-ci.org/ougarcia/ZephyrNote.svg?branch=master)][travis]


[Live Link][live]

[codeclimate]: https://codeclimate.com/github/ougarcia/ZephyrNote
[travis]: https://travis-ci.org/ougarcia/ZephyrNote
[live]: http://zephyrnote.xyz

## Minimum Viable Product
ZephyrNote is responsive single-page web application inspired by EverNote. It's
built using Ruby on Rails and Backbone.

Users can:
- [x] Create/Edit Notes
- [x] View Notes
- [x] Organize Notes within Notebooks
- [x] Organize Notes with Tags
- [x] Tag a note with multiple tags


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication; Creating, Viewing, Renaming, Destroying, and Organizing Notebooks (~2 days)

I will implement user authentication in Rails based on the practices learned at
App Academy. I will add API routes and jbuilder views to serve notebook data as
JSON, then add a backbone collection and a backbone model for notebooks. I will
add backbone views for notebook new and show.

[Details][phase-one]

### Phase 2: Creating, Viewing, Editing, and Destroying Notes (~1.5 days)
and show. The notebook show will also be the notes index. Users will be able to
sort notes in the notes index.

[Details][phase-two]

### Phase 3: Create, View, Edit, and Destroy Tags (~1.5 days)
I will add API routes and jbuilder views to serve tag data as
JSON, then add a backbone collection and a backbone model for tags. I will
add backbone views for tag new, index, and show.
[Details][phase-three]

### Phase 4: Tag Notes and View Notes by Tags (~1 days)
I will add a taggings rails-model/db-table, which is a join table between tags
and notes. I will add a notes-by-tag index view and update noteNew and noteEdit
to allow for tags. I will also update the tags.json.jbuilder view so that it
returns the ids of the notes that belong to the tag. I'll have a NotesIndexByTag
collection to help me keep track of all the notes that belong to a tag.

[Details][phase-four]

### Bonus Features (TBD)
- [x] Pretty html/css
- [x] Prettier Tag Selection (max-favilli/tagmanager + twitter/typeahead.js)
- [x] Fancier text editing capabilities (Quill JS)
- [x] Sort notes by title, date created, date updated
- [ ] Search
- [ ] fancier landing page
- [ ] Pretty transitions between pages (Animate css)
- [ ] Shortcuts
- [ ] Snippet view in NotesIndex




[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
