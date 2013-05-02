class FavoritesController < ApplicationController
	def index
		favorites = Favorite.where(user_id: current_user.id)
		render :json => favorites.all
	end

	def create

	end

	def destroy
		favorite = Favorite.find_by_user_id_and_specimen_id(current_user.id, params[:specimen_id])
		if favorite.destroy
			render :json => favorite
		else
			render :json => favorite.errors, :errors => 422
		end
	end
end
