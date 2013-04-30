class Identification < ActiveRecord::Base
  belongs_to :user
  belongs_to :specimen
  belongs_to :family
  belongs_to :species
  attr_accessible :comment, :genus, :references, :votes
end
