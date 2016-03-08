class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  private

  def login!(user)
    session[:session_token] = user.reset_session_token
  end

  def logout!
    current_user.reset_session_token
  end

  def ensure_logged_in
    redirect_to new_session_url unless logged_in?
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
