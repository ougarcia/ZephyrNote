require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe '#new' do
    before { get :new }

    it { is_expected.to render_template(:new) }

    it 'instantiates a new user' do
      expect(assigns(:user)).to_not be_nil
    end
  end

  describe '#create' do
    let(:user) { FactoryGirl.create(:user, password: 'password') }

    context 'when user_params is valid' do
      let(:user_params) { { username: user.username, password: 'password' } }

      before { post :create, user: user_params }

      it { is_expected.to redirect_to(root_url) }

      it 'should log the user in' do
        expect(session[:session_token]).to eq(assigns(:user).session_token)
      end
    end

    context 'when user_params is invalid' do
      let(:user_params) { { username: user.username, password: '123' } }
      before { post :create, user: user_params }

      it { is_expected.to render_template(:new) }

      it { is_expected.to set_flash }
    end
  end

  describe '#destroy' do
    let(:user) { FactoryGirl.create(:user) }

    before do
      session[:session_token] = user.session_token
      delete :destroy
    end

    it { is_expected.to redirect_to(new_session_url) }
  end
end
