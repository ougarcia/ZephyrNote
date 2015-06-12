class Note < ActiveRecord::Base
  belongs_to :notebook
  validates :title, :notebook, presence: true
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag
end
