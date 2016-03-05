module Api
  class NotebooksController < ApiController
    before_action :find_and_validate_notebook, only: [:show, :update, :destroy]

    def index
      @notebooks = current_user.notebooks

      render json: @notebooks
    end

    def create
      @notebook = current_user.notebooks.new(notebook_params)

      if @notebook.save
        render json: @notebook
      else
        render json: @notebook.errors.full_messages, status: 422
      end
    end

    def update
      if @notebook.update(notebook_params)
        render json: @notebook
      else
        render json: @notebook.errors.full_messages, status: 422
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
      @notebook = current_user.notebooks.find_by(id: params[:id])

      render json: ['Notebook not found'], status: 404 unless @notebook
    end
  end
end
