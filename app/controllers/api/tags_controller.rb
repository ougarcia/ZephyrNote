# Controller for tags
module Api
  class TagsController < ApiController
    def index
      @tags = current_user.tags

      render json: @tags
    end

    def show
      @tag = current_user.tags.find_by(id: params[:id])

      if @tag
        render :show
      else
        render json: ['Tag Not Found'], status: 404
      end
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
      @tag = current_user.tags.find_by(id: params[:id])

      if @tag && @tag.update(tag_params)
        render json: @tag
      elsif @tag
        render json: @tag.errors.full_messages, status: :unproccessable_entity
      else
        render json: ['Tag Not Found'], status: 404
      end
    end

    def destroy
      @tag = current_user.tags.find_by(id: params[:id])

      if @tag
        @tag.destroy
        render json: {}
      else
        render json: ['Tag Not Found'], status: 404
      end
    end

    private

    def tag_params
      params.require(:tag).permit(:title)
    end
  end
end
