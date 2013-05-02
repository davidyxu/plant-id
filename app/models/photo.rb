class Photo < ActiveRecord::Base
  belongs_to :specimen
  attr_accessible :file_name, :file_path, :file_size, :specimen_id
end
