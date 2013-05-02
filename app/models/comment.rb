class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :identification
  attr_accessible :content, :parent_id

  validates :content, :parent_id, :presence => true
end
