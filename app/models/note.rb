class Note < ActiveRecord::Base
  belongs_to :notebook
  validates :title, :notebook, presence: true
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag
  # paginates_par 10
end
