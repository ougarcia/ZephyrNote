u1 = User.create(username: 'guest', password: 'password')
25.times do 
  FactoryGirl.create(:notebook, user: u1)
end


(1..25).each do |nb_id|
  25.times do
    FactoryGirl.create(:note, notebook_id: nb_id)
  end
end



10.times do
begin
  FactoryGirl.create(:tag, user: u1);
  rescue
    retry
end
end

tag_ids = u1.tags.pluck(:id).shuffle
note_ids = u1.notes.pluck(:id).shuffle


50.times do
  FactoryGirl.create(
    :tagging,
    tag_id: tag_ids.sample,
    note_id: note_ids.pop
  )
end
