require 'fileutils'
class PhotosController < ApplicationController
	include PhotosHelper
	def create
		photo_params = savePhoto(params)
		photo = Photo.new(photo_params)
		if photo.save
			render :json => photo
		else
			render :json => photo.errors, :status => 422
		end
	end

	def index
		photos = Photo
		photos = photos.where(specimen_id: params[:specimen_id]) if params[:specimen_id]

		render :json => photos.all
	end
end