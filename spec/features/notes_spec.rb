require 'rails_helper'

RSpec.feature "Notes", type: :feature, js: true do
  let!(:user) do
    FactoryGirl.create(:user, username: 'username', password: 'password')
  end

  let!(:notebook) { FactoryGirl.create(:notebook, user: user) }

  let!(:note) do
    FactoryGirl.create(:note, notebook: notebook, title: 'test-title')
  end

  before { sign_in('username', 'password') }

  scenario 'navigating to new note page' do
    find_link('New Note').click

    expect(backbone_path).to eq('notes/new')
  end

  scenario 'creating a new note' do
    go_to_new_notes_page
    fill_in_note_form_with('new-note')

    expect(middle).to have_content('new-note')
    expect(backbone_path).to eq('')
  end

  scenario 'updating a note' do
    select_note(note.title)
    fill_in_note_form_with('new-title')

    expect(middle).to have_content('new-title')
    expect(middle).to have_no_content('test-title')
    expect(backbone_path).to eq('')
  end

  scenario 'deleting a note' do
    delete_note(note.title)

    expect(middle).to have_no_content(note.title)
    expect(backbone_path).to eq('')
  end

  def go_to_new_notes_page
    find_link('New Note').click
  end

  def fill_in_note_form_with(title)
    within('#right-content') { fill_in('note-title', with: title) }
    click_on('Save')
  end

  def select_note(title)
    within('#middle-content') { find('h4', text: title).click }
  end

  def delete_note(title)
    select_note(title)
    within('#right-content') { click_button('Delete') }
    click_button('confirm-note-delete')
    click_link('Home')
  end

  def middle
    find('#middle-content')
  end
end
