class Discussion < ActiveRecord::Base
  has_many :comments
  belongs_to :author, class_name: User

  validates_presence_of :title, :open, :author_id, :body
  validates_inclusion_of :open, in: [true, false]

  default_scope -> { order('updated_at DESC') }
end
