class Note < ActiveRecord::Base
  belongs_to :notebook
  validates :title, :notebook, presence: true
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag
  # paginates_par 10

  def tags_string=(str)
    tag_titles = str.split(",")
    tags = tag_titles.map do |tag_title|
      Tag.find_or_create_by(title: tag_title)
    end
    
    self.tags = tags
  end

end
