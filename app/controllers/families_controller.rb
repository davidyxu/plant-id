class FamiliesController < ApplicationController
	def index
		respond_to do |format|
			format.json do
				families = Family
				families = families.where(major_group_id: params[:major_group_id]) if params[:major_group_id]
				families =  families.where("name LIKE ?", "#{params[:term]}%") if params[:term]
				families = families.all

				render :json => families
			end

			format.html { render :index }
		end
	end

	def show
		family = Family.includes(:genus).find(params[:id])
		render :json => family.genus
	end
end
