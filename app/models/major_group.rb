class MajorGroup < ActiveRecord::Base
  attr_accessible :name
  
  has_many :families
end
