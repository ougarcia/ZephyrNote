# A user of the web app.
class User < ActiveRecord::Base
  after_initialize :ensure_session_token

  attr_reader :password

  has_many :notes, through: :notebooks, source: :notes
  has_many :notebooks, dependent: :destroy
  has_many :tags, dependent: :destroy

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: true
  validates :session_token, presence: true
  validates :username, presence: true, uniqueness: true

  def self.find_by_credentials(credentials)
    @user = User.find_by(username: credentials[:username])

    @user if @user && @user.is_password?(credentials[:password])
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
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
