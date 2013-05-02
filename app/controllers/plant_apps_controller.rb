class PlantAppsController < ApplicationController
	def index
		if current_user
			render :index
		else
			redirect_to :new_user_session
		end
	end
end
