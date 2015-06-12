class Notebook < ActiveRecord::Base
  belongs_to :user
  has_many :notes, dependent: :destroy
  validates :title, :user, presence: true
end
