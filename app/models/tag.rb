# A tag. One of the ways to organize notes.
class Tag < ActiveRecord::Base
  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :notes, through: :taggings, source: :note

  # Would prefer to scope to user but:
  # https://github.com/thoughtbot/shoulda-matchers/issues/814
  validates :title,  presence: true, uniqueness: { scope: :user_id }
  validates :user, presence: true
end
