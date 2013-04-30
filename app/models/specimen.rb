class Specimen < ActiveRecord::Base
  belongs_to :family
  belongs_to :genus
  belongs_to :species
  belongs_to :user

  attr_accessible :date, :description, :lat, :lng, :title, :user_id, :family_id, :species_id, :genus_id

  has_many :identifications
end
