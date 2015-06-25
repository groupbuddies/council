Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions', passwords: 'passwords', omniauth_callbacks: 'omniauth_callbacks' }

  defaults format: 'json' do
    constraints format: 'json' do
      resources :discussions, only: [:index, :show, :create, :update] do
        resources :comments, except: :destroy
        resource :notification, only: [:destroy]
      end
      resources :notifications, only: [:index]
      resources :users, only: [:index, :show, :update]
      get '/me', to: 'users#me'
    end
  end

  root to: 'pages#index'
end
