require 'rails_helper'

RSpec.feature "Notebooks", type: :feature, js: true do
  let!(:user) do
    FactoryGirl.create(:user, username: 'username', password: 'password')
  end

  let!(:notebook) { FactoryGirl.create(:notebook, user: user) }
  let!(:note) { FactoryGirl.create(:note, title: 'note-title', notebook: notebook) }

  before { sign_in('username', 'password') }

  it "contains it's notes" do
    click_link_in_notebook_list(notebook.title)

    expect(middle).to have_content('note-title')
  end

  scenario 'creating a new notebook' do
    click_link_in_notebook_list('New Notebook')
    submit_notebook_form_with_title('test-notebook')

    expect(middle).to have_content('test-notebook')
  end

  scenario 'deleting a notebook' do
    click_link_in_notebook_list(notebook.title)
    open_notebook_form
    click_button('Delete')
    open_notebooks_list

    expect(sidebar).to have_no_content(notebook.title)
  end

  scenario 'updating a notebook' do
    click_link_in_notebook_list(notebook.title)
    open_notebook_form
    submit_notebook_form_with_title('new-title')
    open_notebooks_list

    expect(sidebar).to have_content('new-title')
  end

  # Actions

  def click_link_in_notebook_list(link)
    find('#notebooks-list').click
    find_link(link).click
  end

  def open_notebook_form
    within('#middle-content') { find('.edit-link').click }
  end

  def open_notebooks_list
    click_link('Home')
    find('#notebooks-list').click
  end

  def submit_notebook_form_with_title(title)
    fill_in('notebook-title', with: title)
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
