class Identification < ActiveRecord::Base
  belongs_to :user
  belongs_to :specimen
  belongs_to :family
  belongs_to :genus
  belongs_to :species
  attr_accessible :content, :votes
end
