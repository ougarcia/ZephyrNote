module Api
  class TagsController < ApiController

    def index 
      @tags = current_user.tags
      render json: @tags
    end

    def show
      @tag = Tag.find(params[:id])
      if @tag
        render :show
      else
        render json: ['Tag Not Found'], status: 404
      end
    end

    def create
      @tag = Tag.new(tag_params)
      @tag.user = current_user
      if @tag.save
        render json: @tag
      else
        render json: @tag.error.full_messages, status: :unproccessable_entity
      end
    end

    def update
      @tag = Tag.find(params[:id])
      if @tag && @tag.update(tag_params)
        render json: @tag
      else
        render json: @tag.errurs.full_messages, status: :unproccessable_entity
      end
    end

    def destroy
      @tag = Tag.find(params[:id])
      @tag.destroy
      render json: {}
    end

    def tag_params
      params.require(:tag).permit(:title)
    end



  end
end
