# A notebook. One of the ways to organize notes.
class Notebook < ActiveRecord::Base
  belongs_to :user

  has_many :notes, dependent: :destroy

  validates :title, presence: true
  validates :user, presence: true
end
