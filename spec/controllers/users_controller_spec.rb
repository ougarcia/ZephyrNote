require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe '#new' do
    before { get :new }

    it 'instantiates a new user' do
      expect(assigns(:user)).to be_a(User)
    end
  end

  describe '#edit' do
    context 'when user params are valid' do
      let(:user_params) { { username: 'username', password: 'password' } }

      before { post :create, user: user_params }

      it { is_expected.to redirect_to(root_url) }

      it 'creates a new user' do
        expect(assigns(:user)).to be_persisted
      end

      it 'logs the created user in' do
        expect(session[:session_token]).to eq(assigns(:user).session_token)
      end
    end

    context 'when user params are invalid' do
      before { post :create, user: { username: 'abc', password: '123' } }

      it { is_expected.to render_template(:new) }

      it { is_expected.to set_flash }
    end
  end
end
