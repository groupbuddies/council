Rails.application.routes.draw do
  defaults format: 'json' do
    constraints format: 'json' do
      resources :discussions, only: [:index, :show, :create, :update] do
        resources :comments, only: [:show, :create, :update]
      end
      resources :notifications, only: [:index, :destroy]
      resource :team, only: [:show]
    end
  end

  devise_for :users, controllers: { sessions: 'sessions' }

  root to: 'pages#index'
end
