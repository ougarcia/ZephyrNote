u1 = User.create(username: 'oscar', password: 'password')
10.times do 
  FactoryGirl.create(:notebook, user: u1)
end


(1..10).each do |nb_id|
  10.times do
    FactoryGirl.create(:note, notebook_id: nb_id)
  end
end
