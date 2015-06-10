module Api
  class NotebooksController < ApplicationController
    # probably add a before action to validate that notebook belongs to
    # user
    before_action :find_and_validate_notebook, only: [:show, :update, :destroy]
    
    def index
      @notebooks = current_user.notebooks
      render json: @notebooks
    end

    def show
      if @notebook
        render :show
      else
        render json: ['Notebook Not Found'], status: 404
      end
    end 


    def create
      @notebook = Notebook.new(notebook_params)
      @notebook.user = current_user
      if @notebook.save
        render json: @notebook
      else
        render json: @notebook.errors.full_messages, status: :unproccessable_entity
      end
    end

    def update
      if @notebook && @notebook.update(notebook_params)
        render json: @notebook
      else
        render json: @notebook.errors.full_messages, status: :unproccessable_entity
      end
    end

    def destroy
      @notebook.destroy
      render json: {}
    end

    private
    def notebook_params
      params.require(:notebook).permit(:title)
    end

    def find_and_validate_notebook
      @notebook = Notebook.find(params[:id])
      unless @notebook.user == current_user
        render json: ['Notebook does not belong to current user'], status: 403
      end
    end
  end
end
