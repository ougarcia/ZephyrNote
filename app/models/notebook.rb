class Notebook < ActiveRecord::Base
  belongs_to :user
  has_many :notes 
  validates :title, :user, presence: true
end
