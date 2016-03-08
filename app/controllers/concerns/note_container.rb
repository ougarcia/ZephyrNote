# Encapsulates logic used for controllers of models that have many notes
module NoteContainer
  extend ActiveSupport::Concern

  included do
    before_action :find_model, only: [:show, :update, :destroy]
  end

  def index
    @records = current_user.send(record_name_plural)

    render json: @records
  end

  def create
    @record = current_user.send(record_name_plural).new(record_params)

    if @record.save
      render json: @record
    else
      render json: @record.errors.full_messages, status: 422
    end
  end

  def update
    if @record.update(record_params)
      render json: @record
    else
      render json: @record.errors.full_messages, status: 422
    end
  end

  def destroy
    @record.destroy
    render json: {}
  end

  private

  def find_model
    @record = current_user.send(record_name_plural).find_by(id: params[:id])

    unless @record
      render json: ["#{controller_name.classify} not found"], status: 404
    end
  end

  def record_name
    controller_name.singularize.to_sym
  end

  def record_name_plural
    controller_name.to_sym
  end

  def record_params
    params.require(record_name).permit(:title)
  end
end
