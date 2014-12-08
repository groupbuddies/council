Rails.application.routes.draw do
  defaults format: 'json' do
    constraints format: 'json' do
      resources :discussions, only: [:index, :show, :create]
    end
  end

  devise_for :users, controllers: { sessions: 'sessions' }
  root to: 'pages#index'
end
