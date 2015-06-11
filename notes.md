create a special controller action to fetch the 25 most recently updated
notes.

on the start page, send two requests:
* one for the notebooks index
* one for the 25 most recent notes
I might use pagination to keep  rendering more notes until all of them
are fetched.

dont render the notebooks until the user explicitly wants them.

