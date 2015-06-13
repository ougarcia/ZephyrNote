create a special controller action to fetch the 25 most recently updated
notes.

on the start page, send two requests:
* one for the notebooks index
* one for the 25 most recent notes
I might use pagination to keep  rendering more notes until all of them
are fetched.

I might want to move away from bootstrap row/columns for my sidebar.
bootstrap is kinda sucky with sidebars and I could benefit from having
way more control.

gotta find an alternative to horizontal rules in my sidebar

create a mixin (_.extend) for my notebooks and tags
