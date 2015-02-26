Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', passwords: 'passwords', omniauth_callbacks: 'omniauth_callbacks' }

  defaults format: 'json' do
    constraints format: 'json' do
      resources :discussions, only: [:index, :show, :create, :update] do
        resources :comments, except: :destroy
        resource :notification, only: [:destroy]
      end
      resources :notifications, only: [:index]
      resources :users, only: [:show, :update]
    end
  end

  resources :users, only: [:edit, :update]

  root to: 'pages#index'
end
