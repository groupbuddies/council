source 'https://rubygems.org'

gem 'rails', '4.2'

gem 'active_model_serializers', '~> 0.8.0'
gem 'airbrake'
gem 'appsignal'
gem 'angular-rails-templates'
gem 'autoprefixer-rails'
gem 'bower'
gem 'cancancan', '~> 1.9'
gem 'devise'
gem 'dotenv-rails'
gem 'email_validator'
gem 'font-awesome-rails'
gem 'foreman'
gem 'headquarters', '~> 0.3.0'
gem 'omniauth-headquarters', '~> 0.2.0'
gem 'jquery-rails'
gem 'newrelic_rpm'
gem 'ngannotate-rails'
gem 'omniauth'
gem 'omniauth-oauth2'
gem 'recipient_interceptor'
gem 'sass-rails', '5.0.0.beta1'
gem 'slim-rails'
gem 'state_machine'
gem 'title'
gem 'uglifier'
gem 'puma'

group :development, :test do
  gem 'awesome_print'
  gem 'letter_opener'
  gem 'quiet_assets'
  gem 'rubocop', require: false
  gem 'sqlite3'
  gem 'faker'
end

group :production do
  gem 'pg'
  gem 'lograge'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.1.0'
  gem 'pry-rails'
end

group :test do
  gem 'database_cleaner'
  gem 'factory_girl_rails', '~> 4.2'
end

group :deploy do
  gem 'capistrano', '~> 3.2.1'
  gem 'capistrano-rvm'
  gem 'capistrano-rails'
  gem 'capistrano-bundler'
  gem 'capistrano-foreman', github: 'groupbuddies/capistrano-foreman', branch: :master
  gem 'capistrano-bower', github: 'groupbuddies/capistrano-bower'
end
