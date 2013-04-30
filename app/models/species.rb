class Species < ActiveRecord::Base
  belongs_to :genus
  attr_accessible :name, :genus_id

  validates :name, :uniqueness => true
end
