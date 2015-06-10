module Api
  class NotesController < ApplicationController

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
      params.require(:note).permit(:title, :body, :notebook_id)
    end
  end
end
