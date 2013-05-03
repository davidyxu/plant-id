class IdentificationsController < ApplicationController
	def create
		identification = Identification.new(params[:identification]);
		identification.user_id = current_user.id
		identification.votes = 0
		if identification.save
			render :json => identification.to_json(
			:include => {
				:family => { :only => :name },
				:genus => { :only => :name },
				:species => { :only => :name }
			}
		)
		else
			render :json => identification.errors, :status => 422
		end
	end
	
	def index
		identifications = Identification
		identifications = Identification.where(specimen_id: params[:specimen_id]) if params[:specimen_id]
		render :json => identifications.all.to_json(
			:include => {
				:family => { :only => :name },
				:genus => { :only => :name },
				:species => { :only => :name }
			}
		)
	end
end
