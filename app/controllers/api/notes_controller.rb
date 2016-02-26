module Api
  class NotesController < ApiController
    def show
      @note = current_user.notes.find_by(id: params[:id])

      if @note
        render :show
      else
        render json: {}, status: 404
      end
    end

    def index
      @notes = current_user.notes.order(updated_at: :desc).page(params[:page])
      @page  = params[:page]
      @total_pages = @notes.total_pages
    end

    def create
      @note = Note.new(note_params)

      if @note.save
        render json: @note
      else
        render json: @note.errors.full_messages, status: :unproccessable_entity
      end
    end

    def update
      @note = current_user.notes.find_by(id: params[:id])

      if @note && @note.update(note_params)
        render json: @note
      elsif @note
        render json: @note.errors.full_messages, status: :unproccessable_entity
      else
        render json: {}, status: 404
      end
    end

    def destroy
      @note = current_user.notes.find_by(id: params[:id])

      if @note
        @note.destroy
        render json: {}
      else
        render json: {}, status: 404
      end
    end

    private

    def note_params
      params.require(:note).permit(:title, :body, :notebook_id, :tags_string)
    end
  end
end
