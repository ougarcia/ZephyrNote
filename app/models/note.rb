# A note object.
class Note < ActiveRecord::Base
  belongs_to :notebook

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag

  has_one :user, through: :notebook, source: :user

  paginates_per 8

  validates :notebook, presence: true
  validates :title, presence: true

  # Takes comma-seperated list of titles for tags the associated with the note.
  def tags_string=(titles)
    self.tags = titles.split(',').map do |title|
      Tag.find_or_create_by(title: title, user: user)
    end
  end
end
