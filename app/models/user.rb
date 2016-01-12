# A user of the web app.
class User < ActiveRecord::Base
  after_initialize :ensure_session_token

  attr_reader :password

  has_many :notebooks, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :notes, through: :notebooks, source: :notes

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(creds)
    @user = User.find_by(username: creds[:username])

    @user if @user && @user.is_password?(creds[:password])
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
    save

    session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
