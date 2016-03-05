# Controller for tags
module Api
  class TagsController < ApiController
    before_action :find_tag, only: [:show, :update, :destroy]

    def index
      @tags = current_user.tags

      render json: @tags
    end

    def create
      @tag = current_user.tags.new(tag_params)

      if @tag.save
        render json: @tag
      else
        render json: @tag.error.full_messages, status: :unproccessable_entity
      end
    end

    def update
      if @tag.update(tag_params)
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unproccessable_entity
      end
    end

    def destroy
      @tag.destroy
      render json: {}
    end

    private

    def tag_params
      params.require(:tag).permit(:title)
    end

    def find_tag
      @tag = current_user.tags.find_by(id: params[:id])

      render json: ['Notebook not found'], status: 404 unless @tag
    end
  end
end
