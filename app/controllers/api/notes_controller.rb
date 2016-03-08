module Api
  class NotesController < ApiController
    before_action :find_note, only: [:show, :update, :destroy]

    def index
      @notes = current_user.notes.order(updated_at: :desc).page(params[:page])
      @page  = params[:page]
      @total_pages = @notes.total_pages
    end

    def create
      @note = Note.new(note_params)

      create_model(@note)
    end

    def update
      update_model(@note, note_params)
    end

    def destroy
      destroy_model(@note)
    end

    private

    def note_params
      params.require(:note).permit(:title, :body, :notebook_id, :tags_string)
    end

    def find_note
      @note = current_user.notes.find_by(id: params[:id])

      render json: ['Notebook not found'], status: 404 unless @note
    end
  end
end
