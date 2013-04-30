class Genus < ActiveRecord::Base
  attr_accessible :name, :family_id
  
  belongs_to :family
  has_many :species

  validates :name, :uniqueness => true
end
