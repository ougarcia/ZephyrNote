class Note < ActiveRecord::Base
  belongs_to :notebook
  validates :title, presence: true
end
