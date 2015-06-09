class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true
  has_many :notebooks
  after_initialize :ensure_session_token
  # associations

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(creds)
    @user = User.find_by({ username: creds[:username] })
    if @user && @user.is_password?(creds[:password])
      @user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save

    session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
