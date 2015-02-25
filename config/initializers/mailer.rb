ActionMailer::Base.delivery_method = if Rails.env.production?
  Headquarters::RailsDeliveryMethod.credentials = {
    client_id: ENV['HQ_APP_ID'],
    client_secret: ENV['HQ_APP_SECRET']
  }

  :headquarters
elsif Rails.env.development?
  Headquarters::RailsDeliveryMethod.credentials = {
    client_id: ENV['HQ_APP_ID'],
    client_secret: ENV['HQ_APP_SECRET']
  }
  :headquarters
elsif Rails.env.test?
  :test
end

