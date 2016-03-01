module FeatureHelper
  def sign_in(username, password)
    visit(new_session_path)
    fill_in('username', with: username)
    fill_in('password', with: password)
    click_button('Log In')
  end

  def backbone_path
    URI.parse(current_url).fragment
  end
end
