class Photo < ActiveRecord::Base
  belongs_to :specimen
  attr_accessible :file_path, :thumb_path, :specimen_id
end
