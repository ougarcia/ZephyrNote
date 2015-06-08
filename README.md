# cleverNote

[Heroku link][heroku]

[heroku]: ??

## Minimum Viable Product
cleverNote is a clone of evernote built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create/Edit Notes
- [ ] View Notes
- [ ] Sort notes by title, date created, date updated
- [ ] Organize Notes within Notebooks
- [ ] Organize Notes with Tags
- [ ] Tag a note with multiple tags


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
I will add API routes jbuilder views to serve note data as JSON, then add a
backbone collection for notes, as well as backbone views for note new, edit,
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
- [ ] Search
- [ ] Share notes with other user
- [ ] Shortcuts
- [ ] Fancier text editing capabilities
- [ ] Snippet view in NotesIndex and NotesByTagIndex



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
