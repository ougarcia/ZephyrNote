class Note < ActiveRecord::Base
  belongs_to :notebook
  validates :title, :notebook, presence: true
end
