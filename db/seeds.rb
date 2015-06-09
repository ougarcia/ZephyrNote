# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#
u1 = User.create!(username: 'oscar', password: 'password')
Notebook.create!(user: u1, title: 'test-notebook')
Notebook.create!(user: u1, title: 'another test-notebook')
