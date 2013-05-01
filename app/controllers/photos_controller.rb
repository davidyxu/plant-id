require 'fileutils'
class PhotosController < ApplicationController
	def create
		tmp = params[:qqfile].tempfile

		path = "/public/photos/specimen/#{params[:specimen_id]}"

		dir = File.dirname(path)

		p dir

		FileUtils.mkdir_p(dir) unless File.directory?(dir)

	 	file = File.join(path, params[:qqfile].original_filename)
		FileUtils.cp(tmp.path, file)

		params[:photo][:file_size] = params[:qqtotalfilesize]
		params[:photo][:file_path] = file.path
		params[:photo][:file_name] = file.original_filename
		photo = Photo.new(params[:photo])
		if photo.save
			render :json => photo
		else
			render :json => photo.errors, :status => 422
		end
	end
end
