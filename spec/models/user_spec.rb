require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_many(:notebooks).dependent(:destroy) }
  it { is_expected.to have_many(:tags).dependent(:destroy) }
  it { is_expected.to have_many(:notes).through(:notebooks).source(:notes) }

  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_presence_of(:password_digest) }
  it { is_expected.to validate_presence_of(:session_token) }

  it { is_expected.to validate_length_of(:password).is_at_least(6) }

  describe '::find_by_credentials' do
    before { FactoryGirl.create_list(:user, 2) }

    let!(:user) { User.create(username: 'username', password: 'password') }


    context 'with correct username and password' do
      subject do
        User.find_by_credentials(username: 'username', password: 'password')
      end

      it 'returns the user' do
        is_expected.to eq(user)
      end
    end

    context 'when password is wrong' do
      subject do
        User.find_by_credentials(username: 'username', password: 'passw0rd')
      end

      it { is_expected.to be_nil }
    end

    context 'when username is wrong' do
      subject do
        User.find_by_credentials(username: 'username1', password: 'password')
      end

      it { is_expected.to be_nil }
    end
  end

  describe '#is_password?' do
    let(:user) { FactoryGirl.create(:user, password: 'password') }

    context 'when correct password is passed' do
      it 'returns true' do
        expect(user.is_password?('password')).to be_truthy
      end
    end

    context 'when incorrect password is passed' do
      it 'returns false' do
        expect(user.is_password?('not_password')).to be_falsey
      end
    end
  end

  describe '#password=' do
    let(:user) { FactoryGirl.create(:user, password: 'password') }

    it 'sets the password attribute as an instance variable' do
      expect(user.password).to eq('password')
    end

    it 'sets the user\'s password digest' do
      expect(user.password_digest).to_not be_nil
    end

    it 'does not persist the user\'s password' do
      expect(User.find(user.id).password).to be_nil
    end
    it 'persists the user\'s password_digest' do
      expect(User.find(user.id).password_digest).to_not be_nil
    end
  end

  describe '#reset_session_token' do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:old_session_token) { user.session_token }
    before { user.reset_session_token }

    it 'should change the user\'s session token' do
      expect(user.session_token).to_not eq(old_session_token)
    end
  end

  describe '#ensure_session_token' do
    it 'initializes a user with a session token' do
      expect(User.new.session_token).to_not be_nil
    end
  end
end
