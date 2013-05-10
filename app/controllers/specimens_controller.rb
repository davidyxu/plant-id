class SpecimensController < ApplicationController
	include SpecimensHelper
	def index
		specimen = Specimen
		specimen = specimen.order("created_at DESC")
		specimen = specimen.page(params[:page]) if params[:page]
		specimen = specimen.as_json(
			:include => {
				:family => { :only => :name },
				:genus => { :only => :name },
				:species => { :only => :name }
			}
		)
		if params[:page]
			render :json => {specimens: specimen, total_pages: (Specimen.count/25.0).ceil}
		else
			render :json => specimen
		end
	end

	def create
		specimen = Specimen.new(params[:specimen])
		specimen.user_id = current_user.id
		if specimen.save
			render :json => specimen
		else
			render :json => specimen.errors, :status => 422
		end
	end

	def show
		specimen = Specimen.find(params[:id])
		render :json => specimen.as_json(
			:include => {
				:family => { :only => :name },
				:genus => { :only => :name },
				:species => { :only => :name }
			}
		)
	end
end
