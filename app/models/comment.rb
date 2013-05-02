class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :identification
  attr_accessible :content, :parent_id
end
