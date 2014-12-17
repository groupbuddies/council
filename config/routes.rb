Rails.application.routes.draw do
  defaults format: 'json' do
    constraints format: 'json' do
      resources :discussions, only: [:index, :show, :create, :update] do
        resources :comments, only: [:show, :create, :update]
      end
      resources :notifications, only: [:index, :destroy]
      resources :members, only: [:index]
      resources :users, only: [:show]
    end
  end

  devise_for :users, controllers: { sessions: 'sessions' , passwords: 'passwords' }

  resources :users, only: [:edit, :update]

  root to: 'pages#index'
end
