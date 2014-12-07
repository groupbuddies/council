require_relative 'production'

Mail.register_interceptor RecipientInterceptor.new(ENV['EMAIL_RECIPIENTS'])

TwoCent::Application.configure do
  # ...

  config.action_mailer.default_url_options = { host: 'staging.two_cents.com' }
end
