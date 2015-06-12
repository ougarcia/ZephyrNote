class Tag < ActiveRecord::Base
  belongs_to :user
  validates :title, :user, presence: true
  validates :title, uniqueness: true
  has_many :taggings
  has_many :notes, through: :taggings, source: :note
end
