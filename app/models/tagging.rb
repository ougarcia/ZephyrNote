class Tagging < ActiveRecord::Base
  validates :note, :tag, presence: true
  belongs_to :note
  belongs_to :tag
end
