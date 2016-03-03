require 'rails_helper'

RSpec.feature "Tags", type: :feature, js: true do
  let!(:user) do
    FactoryGirl.create(:user, username: 'username', password: 'password')
  end

  let!(:tag) { FactoryGirl.create(:tag, user: user) }

  before { sign_in('username', 'password') }

  scenario 'creating a tag' do
    click_link_in_tags_list('New Tag')
    submit_tag_form_with_title('test-tag')

    expect(middle).to have_content('test-tag')
  end

  scenario 'deleting a tag' do
    click_link_in_tags_list(tag.title)
    open_tag_form
    click_button('Delete')
    open_tags_list

    expect(sidebar).to have_no_content(tag.title)
  end

  scenario 'updating a tag' do
    click_link_in_tags_list(tag.title)
    open_tag_form
    submit_tag_form_with_title('new-title')
    open_tags_list

    expect(sidebar).to have_content('new-title')
  end

  # Actions

  def click_link_in_tags_list(link)
    find('#tags-list').click
    find_link(link).click
  end

  def open_tag_form
    within('#middle-content') { find('.edit-link').click }
  end

  def open_tags_list
    click_link('Home')
    find('#tags-list').click
  end

  def submit_tag_form_with_title(title)
    fill_in('tag-title', with: title)
    click_button('Submit')
  end

  # Page scopes

  def middle
    find('#middle-content')
  end

  def sidebar
    find('#sidebar')
  end
end
