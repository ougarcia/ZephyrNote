require 'rails_helper'

RSpec.feature "Login", type: :feature, js: true do
  let!(:user) do
    FactoryGirl.create(:user, username: 'username', password: 'password')
  end

  let!(:guest) do
    FactoryGirl.create(:user, username: 'guest', password: 'password')
  end

  scenario 'with valid credentials' do
    sign_in('username', 'password')

    expect(page).to have_content('Log Out')
  end

  scenario 'with invalid credentials' do
    sign_in('username', '123')

    expect(current_path).to eq('/session')
  end

  scenario 'as guest' do
    visit(new_session_path)
    click_button('Demo the App!')

    expect(page).to have_content('Log Out')
  end
end
