class Favorite < ActiveRecord::Base
  attr_accessible :user_id, :specimen_id

  belongs_to :user
  belongs_to :specimen

  validates :user_id, :specimen_id, :presence => true
  validates :user_id, :uniqueness => {:scope => :specimen_id}
end
