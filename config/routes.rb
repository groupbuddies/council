Rails.application.routes.draw do
  devise_for :users
  root to: 'application#index'

  constraints format: 'json' do
    resources :discussions, only: [:index]
  end
end
