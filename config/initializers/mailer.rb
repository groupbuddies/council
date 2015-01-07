ActionMailer::Base.delivery_method = if Rails.env.production?
  :headquarters
elsif Rails.env.development?
  :letter_opener
elsif Rails.env.test?
  :test
end
