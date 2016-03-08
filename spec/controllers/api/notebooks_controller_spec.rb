require 'rails_helper'

RSpec.describe Api::NotebooksController, type: :controller do
  let(:user) { FactoryGirl.create(:user) }
  before { login!(user) }

  shared_examples 'an ownership validator' do |verb, action, notebook_params|
    context 'when user does not own notebook' do
      let(:notebook) { FactoryGirl.create(:notebook) }

      let (:params) do
        { id: notebook.id, format: :json, notebook: notebook_params }
      end

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end

    context 'when notebook does not exist' do
      let(:params) do
        { id: 7, format: :json, notebook: notebook_params }
      end

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end
  end

  describe '#index' do
    let!(:notebooks) { FactoryGirl.create_list(:notebook, 3, user: user) }
    let!(:other_notebooks) { FactoryGirl.create_list(:notebook, 2) }

    before { get :index, format: :json }

    it "responds with the current user's notebooks" do
      expect(response.body).to eq(notebooks.to_json)
    end
  end

  describe '#show' do
    it_behaves_like 'an ownership validator', :get, :show

    context 'when user owns notebook' do
      let(:notebook) { FactoryGirl.create(:notebook, user: user) }

      before { get :show, id: notebook.id, format: :json }

      it 'finds the correct notebook' do
        expect(assigns(:record)).to eq(notebook)
      end

      it 'renders template :show' do
        expect(response).to render_template(:show)
      end
    end
  end

  describe '#create' do
    before { post :create, notebook: { title: 'test-title' } }

    it 'creates a notebook' do
      expect(assigns(:record)).to be_persisted
    end

    it do
      expect(assigns(:record)).to be_a(Notebook)
    end

    it 'responds with notebook' do
      expect(response.body).to eq(assigns(:record).to_json)
    end
  end

  describe '#update' do
    it_behaves_like 'an ownership validator', :patch, :update, title: 'newtitle'

    context 'when user owns notebook' do
      let(:notebook) { FactoryGirl.create(:notebook, user: user) }

      before { patch :update, id: notebook.id, notebook: { title: 'newtitle' } }

      it 'updates the notebook' do
        expect(notebook.reload.title).to eq('newtitle')
      end

      it 'responds with the updated notebook' do
        expect(response.body).to eq(notebook.reload.to_json)
      end
    end
  end

  describe '#destroy' do
    it_behaves_like 'an ownership validator', :delete, :destroy

    context 'when user owns notebook' do
      let(:notebook) { FactoryGirl.create(:notebook, user: user) }

      before { delete :destroy, id: notebook.id }

      it 'destroys the notebook'  do
        expect(Notebook.find_by(id: notebook.id)).to be_nil
      end
    end
  end
end
