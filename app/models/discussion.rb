class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User

  validates_presence_of :title, :subtitle, :open, :author_id
  validates_inclusion_of :open, in: [true, false]
end
