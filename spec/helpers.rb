module Helpers
  def login!(user)
    session[:session_token] = user.reset_session_token
  end
end
