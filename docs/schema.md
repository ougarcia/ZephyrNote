# Schema Information

## notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
notebook_id | integer   | not null, foreign key (references notebooks)
title       | string    | not null
body        | string    |

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null, unique


Not exactly sure if I want the user_id column or not. I think this denormalizes
my database, but It might come in handy if i want to get a user's tags. Without
it, I would need to do: user.notes.taggings.tags. Is there a solution that solves
these problems?

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
note_id     | integer   | not null, foreign key (references notes)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique


index on all foreign keys, and user.session_token
