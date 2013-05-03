class Identification < ActiveRecord::Base
  belongs_to :user
  belongs_to :specimen
  belongs_to :family
  belongs_to :genus
  belongs_to :species
  attr_accessible :content, :votes, :specimen_id, :family_id, :genus_id, :species_id, :user_id

  validates :content, :votes, :user, :presence => :true
  validates_uniqueness_of :specimen_id, :scope => [:family_id, :genus_id, :species_id]
end
