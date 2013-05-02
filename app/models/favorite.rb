class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :specimen
  # attr_accessible :title, :body
end
