Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, default: { format: :json } do
    resources :notebooks, except: [:new, :edit]
    resources :notes, only: [:create, :update, :destroy]
  end
  root to: 'static_pages#root'
end
