# A tag. One of the ways to organize notes.
class Tag < ActiveRecord::Base
  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :notes, through: :taggings, source: :note

  validates :title, :user, presence: true, uniqueness: true
end
