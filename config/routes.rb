Rails.application.routes.draw do
  scope 'api' do
    resources :tasks
    resources :upgrades
    resources :paychecks
    resources :income_sources
    resources :expenses do
      collection do
        get 'week', to: 'expenses#week'
      end
    end
    resources :categories
    resources :asset_transactions
    resources :assets
    resources :asset_types
    get 'budget_status', to: 'budget_statuses#budget_status'
    get 'budget_status/refresh', to: 'budget_statuses#refresh'
    get 'income_summary', to: 'summary#income_summary'
    get 'yearly_average_income', to: 'users#yearly_average_income'
    get 'category_summary', to: 'summary#category_summary'
    get 'graph_data', to: 'summary#graph_data'
    resources :users, only: [:index]
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    get "up" => "rails/health#show", as: :rails_health_check

    # Defines the root path route ("/")
    # root "posts#index"
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
