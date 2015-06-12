module Api
  class NotesController < ApiController
    # gotta wrap params becaause of tag_ids
    #   tag_ids is some ruby magic where you update the tags through the
    #   tags association
    wrap_parameters :note, include: [:tag_ids, :title, :body, :notebook_id]

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
      # might need to manually wrap tag_ids
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
      params.require(:note).permit(:title, :body, :notebook_id, tag_ids: [])
    end
  end
end
