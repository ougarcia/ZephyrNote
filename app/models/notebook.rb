class Notebook < ActiveRecord::Base
  belongs_to :user
  validates :title, :user, presence: true
end
