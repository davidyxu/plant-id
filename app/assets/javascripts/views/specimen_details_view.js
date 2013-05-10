PI.Views.SpecimenDetailView = Backbone.View.extend({
	events: {
		"click a.back": "back",
		"click a.favorite-btn": "favorite"
	},

	favorite: function() {
		var that = this;
		if (event.target.id === "favorite") {
			var favorite = new PI.Models.Favorite({specimen_id: that.model.id});
			favorite.save({}, {
				success: function() {
					PI.Store.favorites.add(favorite);
					that.render();
				}
			})
		} else {
			PI.Store.favorites.findWhere({specimen_id: that.model.id}).destroy({
				success: function() {
					that.render();
				}
			});	
		}
	},

	back: function() {
		window.history.back();
	},

	initialize: function() {

	},

	render: function() {
		var that = this;
		that.view = "meh"
		if (PI.Store.favorites.findWhere({specimen_id: that.model.id})) {
			var favorited = true
		} else {
			var favorited = false
		}
		var renderedTitle = JST["specimens/title"]({
			specimen: that.model,
			favorited: favorited
		});
		that.$el.html(renderedTitle);
			var galleryView = new PI.Views.SpecimenGalleryView({
				model: this.model
			});
			that.$el.append(galleryView.render().$el);

			var descriptionView = new PI.Views.SpecimenDescriptionView({
				model: this.model
			});
			that.$el.append(descriptionView.render().$el);

			this.specimenMapView = new PI.Views.SpecimenMapView({
				model: this.model
			});
			that.$el.append(that.specimenMapView.render().$el);
		var identificationView = new PI.Views.SpecimenIdentificationView({
			model: this.model
		});
		that.$el.append(identificationView.render().$el);
		var backButton = $('<a>').addClass("back").text("<< Back")
		that.$el.append(backButton);
		return that;
	}
});