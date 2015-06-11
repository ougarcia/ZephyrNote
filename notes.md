create a special controller action to fetch the 25 most recently updated
notes.

on the start page, send two requests:
* one for the notebooks index
* one for the 25 most recent notes
I might use pagination to keep  rendering more notes until all of them
are fetched.

dont render the notebooks until the user explicitly wants them.

I might want to move away from bootstrap row/columns for my sidebar.
bootstrap is kinda sucky with sidebars and I could benefit from having
way more control.

gotta find an alternative to horizontal rules in my sidebar
right now I have both a notebook show and a notes index I want to do
something where instead of a notebook show I have a notes index. The
only problem with that is that I dont know where ot but the edit button
for notebooks and how to get the url for the note address.
I think I have notebook_id on the notes mode, so that might solve the
last problem

