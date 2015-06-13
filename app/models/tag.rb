class Tag < ActiveRecord::Base
  validates :title, :user, presence: true
  validates :title, uniqueness: true
  belongs_to :user
  has_many :taggings, dependent: :destroy
  has_many :notes, through: :taggings, source: :note
end
