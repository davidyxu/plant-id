module PhotosHelper
	def savePhoto(params)
		tmp = params[:qqfile].tempfile

		dir = Rails.root.join("app", "assets", "images", "photos", "specimen", params[:specimen_id]);
		FileUtils.mkdir_p(dir) unless File.directory?(dir)

	 	file = File.join("app", "assets", "images", "photos", "specimen", params[:specimen_id], params[:qqfile].original_filename)
		FileUtils.cp(tmp.path, file)

		prepareParams(params,file)
	end

	def prepareParams(params, file)
		photo_params = {}
		photo_params[:specimen_id] = params[:specimen_id]
		photo_params[:file_size] = params[:qqtotalfilesize]
		photo_params[:file_path] = File.join("assets", "photos", "specimen", params[:specimen_id], params[:qqfile].original_filename)
		photo_params[:file_name] = params[:qqfile].original_filename
		return photo_params
	end
end
