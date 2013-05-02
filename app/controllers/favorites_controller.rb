class FavoritesController < ApplicationController
	def index
		favorites = Favorite.where(user_id: current_user.id)
		render :json => favorites.all.to_json(:include => :specimen)
	end

	def create
		favorite = Favorite.new(user_id: current_user.id, specimen_id: params[:specimen_id])
		if favorite.save
			render :json => favorite
		else
			render :json => favorite.errors, :status => 422
		end
	end

	def destroy
		favorite = Favorite.find(params[:id])
		if favorite.destroy
			render :json => favorite
		else
			render :json => favorite.errors, :errors => 422
		end
	end
end
