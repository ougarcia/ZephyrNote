require 'rails_helper'

RSpec.describe Tag, type: :model do
  subject { FactoryGirl.create(:tag) }

  it { is_expected.to belong_to(:user) }

  it { is_expected.to have_many(:taggings).dependent(:destroy) }
  it { is_expected.to have_many(:notes).through(:taggings).source(:note) }

  # Would prefer to scope to user but:
  # https://github.com/thoughtbot/shoulda-matchers/issues/814
  it { is_expected.to validate_uniqueness_of(:title).scoped_to(:user_id) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:user) }
end
