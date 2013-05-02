class Favorite < ActiveRecord::Base
  attr_accessible :user_id, :specimen_id

  belongs_to :user
  belongs_to :specimen
end
