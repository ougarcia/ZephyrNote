module Api
  class NotebooksController < ApplicationController
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    
    def index
      @notebooks = current_user.notebooks
      render json: @notebooks
    end

    def show
      @notebook = Notebook.find(params[:id])
      if @notebook && @notebook.user == current_user
        render json: @notebook
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
      @notebook = Notebook.find(params[:id])
      if @notebook && @notebook.update(notebook_params)
        render json: @notebook
      else
        render json: @notebook.errors.full_messages, status: :unproccessable_entity
      end
    end

    def destroy
      @notebook = Notebook.find(params[:id])
      @note.destroy
      render json: {}
    end

    private
    def notebook_params
      params.require(:notebook).permit(:title)
    end
  end
end
