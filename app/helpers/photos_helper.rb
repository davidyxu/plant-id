require 'mini_magick'
require 'aws/s3'
#MiniMagick.processor = :gm

AWS::S3::DEFAULT_HOST.replace "s3.amazonaws.com"
AWS::S3::Base.establish_connection!(

  :access_key_id     => ENV['AWS_ACCESS'], 
  :secret_access_key => ENV['AWS_SECRET']
)

module PhotosHelper
	def savePhoto(params)
		tmpfile = params[:qqfile].tempfile
		file = File.open(tmpfile)

		tmpfile.inspect
		dir="#{params[:specimen_id]}/full/#{params[:qqfile].original_filename}"
		test = AWS::S3::S3Object.store(dir, tmpfile, 'plantae_photos',:access => :public_read)
		
		thumb = MiniMagick::Image.open(tmpfile.path)
		thumb.resize "75x75"
		dir="#{params[:specimen_id]}/thumb/#{params[:qqfile].original_filename}"

		a = AWS::S3::S3Object.store(dir, thumb.to_blob, 'plantae_photos', :access => :public_read)

		prepareParams(params,file)
	end

	def prepareParams(params, file)
		photo_params = {}
		photo_params[:specimen_id] = params[:specimen_id]
		photo_params[:file_path] = "https://s3.amazonaws.com/plantae_photos/#{params[:specimen_id]}/full/#{params[:qqfile].original_filename}"
		photo_params[:thumb_path] = "https://s3.amazonaws.com/plantae_photos/#{params[:specimen_id]}/thumb/#{params[:qqfile].original_filename}"
		return photo_params
	end
end
