require 'rails_helper'

RSpec.describe Tagging, type: :model do
  it { is_expected.to belong_to(:note) }
  it { is_expected.to belong_to(:tag) }

  it { is_expected.to validate_presence_of(:note) }
  it { is_expected.to validate_presence_of(:tag) }
end
