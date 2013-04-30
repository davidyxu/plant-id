class Family < ActiveRecord::Base
  attr_accessible :name, :major_group_id

  has_many :genus
  has_many :species, :through => :genus

  validates :name, :uniqueness => true
end
