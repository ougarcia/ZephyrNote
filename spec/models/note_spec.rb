require 'rails_helper'

RSpec.describe Note, type: :model do
  it { is_expected.to belong_to(:notebook) }
  it { is_expected.to have_one(:user) }
  it { is_expected.to have_many(:taggings).dependent(:destroy) }
  it { is_expected.to have_many(:tags).through(:taggings).source(:tag) }

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:notebook) }

  describe '#tags_string=' do
    let(:note) { FactoryGirl.create(:note_with_associations) }

    context 'assigning tags that already exist' do
      let(:tags)  { FactoryGirl.create_list(:tag, 2, user: note.user) }
      let(:tags_string) { tags.map(&:title).join(',') }

      before { note.tags_string = tags_string }

      it 'finds existing tags and creates a relation' do
        expect(note.tags).to eq(tags)
      end

    end

    context 'assigning tags that do not already exists' do
      let(:tags_string) { 'tag1,tag2' }

      before { note.tags_string = tags_string }

      it 'creates the tag anda relation' do
        expect(note.tags.map(&:title)).to eq(%w(tag1 tag2))
      end
    end
  end
end
