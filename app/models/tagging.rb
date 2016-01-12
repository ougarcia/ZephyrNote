# Model corresponding to join table for notes and tags.
class Tagging < ActiveRecord::Base
  belongs_to :note
  belongs_to :tag

  validates :note, :tag, presence: true
end
