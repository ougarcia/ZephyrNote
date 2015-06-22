module Api
  class NotesController < ApiController

    def show
      @note = Note.find(params[:id]);
      if @note
        render :show
      else
        render json: {}, status: :unproccessable_entity
      end
    end

    def index
      @notes = current_user.notes.order(updated_at: :desc).page(params[:page])
      @page  = params[:page]
      @total_pages = @notes.total_pages
      #render json: {
        #models: @notes,
        #page: params[:page],
        #total_pages: @notes.total_pages
      #}
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
      @note = Note.find(params[:id])
      if @note && @note.update(note_params)
        render json: @note
      else
        render json: @note.errors.full_messages, status: :unproccessable_entity
      end
    end

    def destroy
      @note = Note.find(params[:id])
      @note.destroy
      render json: {}
    end

    private
    def note_params
      params.require(:note).permit(:title, :body, :notebook_id, :tags_string)
    end
  end
end
