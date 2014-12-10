class Notification < ActiveRecord::Base
  belongs_to :subscription

  validates :subscription_id, presence: true
end
