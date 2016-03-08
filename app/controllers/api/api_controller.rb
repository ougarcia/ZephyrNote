module Api
  class ApiController < ApplicationController
    def create_model(model)
      if model.save
        render json: model
      else
        render json: model.errors.full_messages, status: 422
      end
    end

    def destroy_model(model)
      model.destroy
      render json: {}
    end

    def update_model(model, model_params)
      if model.update(model_params)
        render json: model
      else
        render json: model.errors.full_messages, status: 422
      end
    end
  end
end
