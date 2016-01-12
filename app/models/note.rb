# A note object.
class Note < ActiveRecord::Base
  belongs_to :notebook

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag

  has_one :user, through: :notebook, source: :user

  paginates_per 8

  validates :title, :notebook, presence: true

  def tags_string=(str)
    tag_titles = str.split(',')

    tags = tag_titles.map do |tag_title|
      Tag.find_or_create_by(title: tag_title, user: user)
    end

    self.tags = tags
  end
end
