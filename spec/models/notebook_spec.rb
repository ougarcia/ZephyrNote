require 'rails_helper'

RSpec.describe Notebook, type: :model do
  it { is_expected.to belong_to(:user) }

  it { is_expected.to have_many(:notes) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:user) }
end
