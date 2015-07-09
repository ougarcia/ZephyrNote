cc_recipe = "<div><span style=\"font-family: sans-serif;\"><b><span style=\"font-size: 18px;\">Ingredients</span></b></span></div><ul><li><span style=\"font-family: sans-serif;\">2 tablespoons unsalted butter</span></li><li><span style=\"font-family: sans-serif;\">1 medium onion, finely diced</span></li><li><span style=\"font-family: sans-serif;\">2 celery stalks (reserve tender leaves) trimmed, quartered lengthwise, then sliced into 1/4-inch pieces</span></li><li><span style=\"font-family: sans-serif;\">3 tablespoons all-purpose flour</span></li><li><span style=\"font-family: sans-serif;\">2 cups chicken or vegetable stock</span></li><li><span style=\"font-family: sans-serif;\">2 (10-ounce) cans chopped clams in juice</span></li><li><span style=\"font-family: sans-serif;\">1 cup heavy cream</span></li><li><span style=\"font-family: sans-serif;\">2 bay leaves</span></li><li><span style=\"font-family: sans-serif;\">1 pound Idaho potatoes, cut into 1/2- inch cubes</span></li><li><span style=\"font-family: sans-serif;\">Salt and freshly ground black pepper</span></li><li><span style=\"font-family: sans-serif;\">Pan Toasted Croutons:</span></li><li><span style=\"font-family: sans-serif;\">2 to 3 tablespoons unsalted butter</span></li><li><span style=\"font-family: sans-serif;\">1/2 baguette, cut into 1-inch cubes</span></li><li><span style=\"font-family: sans-serif;\">3 tablespoons freshly chopped flat-leaf parsley</span></li><li><span style=\"font-family: sans-serif;\">Salt and freshly ground black pepper</span></li></ul><div><br></div><div><span style=\"font-family: sans-serif;\"><span style=\"font-size: 18px;\"><b>Directions</b></span></span></div><div>Heat the butter in a large pot over medium-high heat. Add the onion and celery and saute until softened, mixing often. Stir in the flour to distribute evenly. Add the stock, juice from 2 cans of chopped clams (reserve clams), cream, bay leaves, and potatoes and stir to combine. Bring to a simmer, stirring consistently (the mixture will thicken), then reduce the heat to medium-low and cook 20 minutes, stirring often, until the potatoes are nice and tender. Then add clams and season to taste with salt and pepper, cook until clams are just firm, another 2 minutes.</div>"

ccc_recipe = "<div><span style=\"font-size: 18px;\"><b><u>Ingredients</u></b></span></div><ul><li><span style=\"font-family: sans-serif;\">1 1/2cups packed brown sugar</span></li><li><span style=\"font-family: sans-serif;\">1 cup butter or margarine, softened</span></li><li><span style=\"font-family: sans-serif;\">1 teaspoon vanilla</span></li><li><span style=\"font-family: sans-serif;\">1 egg</span></li><li><span style=\"font-family: sans-serif;\">2 cups quick-cooking oats</span></li><li><span style=\"font-family: sans-serif;\">1 1/2 cups Gold Medal™ all-purpose or unbleached flour</span></li><li><span style=\"font-family: sans-serif;\">1 teaspoon baking soda</span></li><li><span style=\"font-family: sans-serif;\">1/4 teaspoon salt</span></li><li><span style=\"font-family: sans-serif;\">1 cup semisweet chocolate chips (6 oz)</span></li><li><span style=\"font-family: sans-serif;\">1 cup chopped nuts, if desired</span></li></ul><div><br></div><div><span style=\"font-family: sans-serif;\"><span style=\"font-size: 18px;\"><b><u>Directions</u></b></span></span></div><ol><li>Heat oven to 350°F. In large bowl, stir brown sugar and butter until blended. Stir in vanilla and egg until light and fluffy. Stir in oats, flour, baking soda and salt; stir in chocolate chips and nuts.</li><li>Onto ungreased cookie sheet, drop dough by rounded tablespoonfuls about 2 inches apart.</li><li>Bake 10 to 12 minutes or until golden brown. Cool slightly; remove from cookie sheet to wire rack.</li></ol>"

pancakes_recipe = "<div><span style=\"font-family: sans-serif;\">INGREDIENTS:</span></div><ul><li>1 1/4 cups whole wheat flour</li><li>2 teaspoons baking powder</li><li>1 egg</li><li>1 cup milk, plus more if necessary</li><li>1/2 teaspoon salt</li><li>1 tablespoon artificial sweetener</li><li>1/2 cup blueberries</li></ul><div><br></div><div><span style=\"font-size: 18px;\">DIRECTIONS:</span></div><ol><li>Sift together flour and baking powder, set aside. Beat together the egg, milk, salt and artificial sweetener in a bowl. Stir in flour until just moistened, add blueberries, and stir to incorporate.</li><li>Preheat a heavy-bottomed skillet over medium heat, and spray with cooking spray. Pour approximately 1/4 cup of the batter into the pan for each pancake. Cook until bubbly, about 1 1/2 minutes. Turn, and continue cooking until golden brown.</li></ol><div><br></div><div style=\"text-align: center;\"><img src=\"http://images.media-allrecipes.com/userphotos/250x250/287734.jpg\"></div>"

salmon_recipe = "<div><span style=\"font-size: 18px;\"><b><u>INGREDIENTS:</u></b></span></div><ul><li>1 1/2 pounds salmon fillets</li><li>lemon pepper to taste</li><li>garlic powder to taste</li><li>salt to taste</li><li>1/3 cup soy sauce</li><li>1/3 cup brown sugar</li><li>1/3 cup water</li><li>1/4 cup vegetable oil</li></ul><div><br></div><div><span style=\"font-size: 18px;\"><b><u>DIRECTIONS:</u></b></span></div><ol><li>Season salmon fillets with lemon pepper, garlic powder, and salt.</li><li>In a small bowl, stir together soy sauce, brown sugar, water, and vegetable oil until sugar is dissolved. Place fish in a large resealable plastic bag with the soy sauce mixture, seal, and turn to coat. Refrigerate for at least 2 hours.</li><li>Preheat grill for medium heat.</li><li>Lightly oil grill grate. Place salmon on the preheated grill, and discard marinade. Cook salmon for 6 to 8 minutes per side, or until the fish flakes easily with a fork.</li></ol><div><br></div><div style=\"text-align: center;\"><img src=\"http://images.media-allrecipes.com/userphotos/250x250/800839.jpg\"></div>"

# three notebooks
# three tags
# 7 notes per notebook
u1 = User.create(username: 'guest', password: 'password')

nb1 = Notebook.create(
  title: "Todo List",
  user: u1
)
  Note.create(
    title: "Laundry",
    notebook: nb1
  )

  Note.create(
    title: "Dishes",
    notebook: nb1
  )

  Note.create(
    title: "Pay Bills",
    notebook: nb1
  )

  Note.create(
    title: "Pack Lunch",
    notebook: nb1
  )

nb2 = Notebook.create(
  title: "Jokes",
  user: u1
)
  Note.create(
    title: "Did you know....",
    body: "...there's enough bones in your body to make an entire human skeleton!",
    notebook: nb2
  )

  Note.create(
    title: "A SQL query goes into a bar...",
    body: "A SQL query goes inot a bar, walks up to two tables and asks, \"Can I join you?\"",
    notebook: nb2
  )

  Note.create(
    title: "What's the object-oriented way to become wealthy?",
    body: "Inheritance",
    notebook: nb2
  )



nb3 = Notebook.create(
  title: "Recipes",
  user: u1
)

  Note.create(
    title: "clam chowder",
    body: cc_recipe,
    notebook: nb3
  )

  nb3n2 = Note.create(
    title: "Oatmeal Chocolate Chip Cookies",
    body: ccc_recipe,
    notebook: nb3
  )

  nb3n3 = Note.create(
    title: "Whole Wheat Blueberry Pancakes",
    body: pancakes_recipe,
    notebook: nb3
  )

  nb3n4 = Note.create(
    title: "Grilled Salmon",
    body: salmon_recipe,
    notebook: nb3
  )

t1 = Tag.create(
  title: "pictures",
  user: u1
)

  Tagging.create(
    note: nb3n2,
    tag: t1
  )
  Tagging.create(
    note: nb3n3,
    tag: t1
  )
  Tagging.create(
    note: nb3n4,
    tag: t1
  )

5.times do 
  FactoryGirl.create(:notebook, user: u1)
end


(4..8).each do |nb_id|
  5.times do
    FactoryGirl.create(:note, notebook_id: nb_id)
  end
end

#10.times do
#begin
  #p "trying to create tag"
  #FactoryGirl.create(:tag, user: u1);
  #rescue
    #retry
#end
#end

#tag_ids = u1.tags.pluck(:id).shuffle
#note_ids = u1.notes.pluck(:id).shuffle


#50.times do
  #FactoryGirl.create(
    #:tagging,
    #tag_id: tag_ids.sample,
    #note_id: note_ids.pop
  #)
#end
