require 'rails_helper'

RSpec.describe Api::TagsController, type: :controller do
  let(:user) { FactoryGirl.create(:user) }

  before { login!(user) }

  shared_examples 'an ownership validator' do |verb, action, tag_params|
    context 'when user does not own tag' do
      let(:tag) { FactoryGirl.create(:tag) }
      let (:params) { { id: tag.id, format: :json, tag: tag_params } }

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end

    context 'when tag does not exist' do
      let(:params) { { id: 7, format: :json, tag: tag_params } }

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end
  end

  describe '#index' do
    let!(:tags) { FactoryGirl.create_list(:tag, 2, user: user) }
    before { get :index }

    it { is_expected.to respond_with(200) }

    it "responds with the user's tags" do
      expect(response.body).to eq(tags.to_json)
    end
  end

  describe '#show' do
    it_behaves_like 'an ownership validator', :get, :show, title: 'new-title'

    let!(:tag) { FactoryGirl.create(:tag, user: user) }

    before { get :show, id: tag.id, format: :json }

    it { is_expected.to respond_with(200) }
    it { is_expected. to render_template(:show) }
  end

  describe '#create' do
    before { post :create, format: :json, tag: { title: 'new tag title' } }

    it 'sets the correct attributes' do
      expect(assigns(:record).title).to eq('new tag title')
    end

    it 'creates the tag' do
      expect(assigns(:record)).to be_persisted
    end
  end

  describe '#update' do
    it_behaves_like 'an ownership validator', :patch, :update, title: 'new-title'

    let!(:tag) { FactoryGirl.create(:tag, user: user) }

    before { patch :update, format: :json, id: tag.id, tag: { title: 'newtitle' } }

    it { is_expected.to respond_with(200) }

    it 'updates the tag' do
      expect(tag.reload.title).to eq('newtitle')
    end
  end

  describe '#destroy' do
    it_behaves_like 'an ownership validator', :delete, :destroy

    let!(:tag) { FactoryGirl.create(:tag, user: user) }

    before { delete :destroy, id: tag.id, format: :json }

    it { is_expected.to respond_with(200) }

    it 'destroys the tag' do
      expect(Tag.find_by(id: tag.id)).to be_nil
    end
  end
end
