require 'rails_helper'

RSpec.describe Api::NotesController, type: :controller do
  let(:user) { FactoryGirl.create(:user) }
  let(:notebook) { FactoryGirl.create(:notebook, user: user) }

  before { login!(user) }

  shared_examples 'an ownership validator' do |verb, action, note_params|
    context 'when user does not own note' do
      let(:note) { FactoryGirl.create(:note_with_associations) }
      let (:params) { { id: note.id, format: :json, note: note_params } }

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end

    context 'when note does not exist' do
      let(:params) { { id: 7, format: :json, note: note_params } }

      before { send(verb, action, params) }

      it { is_expected.to respond_with(404) }
    end
  end

  describe '#show' do
    it_behaves_like 'an ownership validator', :get, :show

    context 'when note belongs to user' do
      let(:note) { FactoryGirl.create(:note, notebook: notebook) }

      before { get :show, format: :json, id: note.id }

      it { is_expected.to respond_with(200) }
      it { is_expected.to render_template(:show) }
    end
  end

  describe '#index' do
    let(:notes) { FactoryGirl.create_list(:note, 3, notebook: notebook) }

    before { get :index, format: :json }

    it { is_expected.to respond_with(200) }
    it { is_expected.to render_template(:index) }

    it "instantiates the current user's notes" do
      expect(assigns(:notes)).to match_array(notes)
    end
  end

  describe '#create' do
    context 'when note params are valid' do
      before { post :create, note: { title: 'title', notebook_id: notebook.id } }

      it { is_expected.to respond_with(200) }

      it 'saves a new note to database' do
        expect(assigns(:note)).to be_persisted
      end

      it 'sets the correct attributes' do
        expect(assigns(:note).title).to eq('title')
      end

      it 'sets the correct associations' do
        expect(assigns(:note).notebook).to eq(notebook)
        expect(assigns(:note).user).to eq(user)
      end
    end

    context 'when note params are invalid' do
      before { post :create, format: :json, note: { title: 'title' } }

      it { is_expected.to respond_with(422) }
    end
  end

  describe '#update' do
    it_behaves_like 'an ownership validator', :patch, :update, title: 'title'

    context 'when params are invalid' do
      let(:note) { FactoryGirl.create(:note, notebook: notebook) }

      before { patch :update, id: note.id, note: { notebook_id: 9 } }

      it { is_expected.to respond_with(422) }
    end

    context 'when params are valid' do
      let(:note) { FactoryGirl.create(:note, notebook: notebook) }

      before { patch :update, id: note.id, note: { title: 'new title' } }

      it { is_expected.to respond_with(200) }

      it 'updates the note' do
        expect(note.reload.title).to eq('new title')
      end

      it 'responds with the updated note' do
        expect(response.body).to eq(note.reload.to_json)
      end
    end
  end

  describe '#destroy' do
    it_behaves_like 'an ownership validator', :delete, :destroy

    let(:note) { FactoryGirl.create(:note, notebook: notebook) }

    before { delete :destroy, id: note.id }

    it { is_expected.to respond_with(200) }

    it 'deletes note' do
      expect(Note.find_by(id: note.id)).to be_nil
    end
  end
end
