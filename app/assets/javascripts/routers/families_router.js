PI.Routers.FamiliesRouter = Backbone.Router.extend({
	initialize: function($menu, $el) {
		this.$menu = $menu;
		this.$rootEl = $el;

	},

	routes: {
		"": "index",
		"browse/favorites": "browseFavorites",
		"browse/:page_id": "browse",
		'search': 'search',
		"specimens/new": "specimenNew",
		"specimens/:specimen_id/identification": "specimenID",
		"specimens/:specimen_id": "specimenDetails",
	},

	browse: function(page_id) {
		var that = this;
		var specimensPage = new PI.Collections.SpecimensPage(page_id);
		var browseView = new PI.Views.SpecimenListView({
			collection: specimensPage
		});
		that.switchView(browseView);
	},

	browseFavorites: function() {
		var that = this;
		var specimensPage = new PI.Collections.SpecimensPage();

		var browseView = new PI.Views.SpecimenListView({
			collection: PI.Store.favorites
		});
		that.switchView(browseView);
	},

	index: function() {
		var that = this;
		var indexView = new PI.Views.IndexView();

		// var familyIndexView = new PI.Views.FamilyIndexView({
		// 	collection: PI.Store.families
		// });
		
		that.switchView(indexView);
		//this.$rootEl.html(indexView.render().el);
	},

	specimenNew: function() {
		var that = this;
		var specimenNewView = new PI.Views.SpecimenNewView();
		//this.$rootEl.html(specimenNewView.render().$el);

		that.switchView(specimenNewView);
	 	$(function() {
			PI.Store.manualUploader = new qq.FineUploader({
	      element: $('#manual-fine-uploader')[0],
	      request: {
	        endpoint: "/photos"
	      },
	      autoUpload: false,
	      text: {
	        uploadButton: ' Upload Images '
	      }
	    });
	  });
	},

	search: function() {
		var that = this;

		PI.Store.specimensSearch.fetch({
			success: function() {
				var searchView = new PI.Views.SearchView();

				that.switchView(searchView);
				//that.$rootEl.html(searchView.render().$el);
			}
		});
	},

	specimenID: function(specimen_id) {
		var that = this;
		var specimenIDView = new PI.Views.SpecimenIDView();

	},

	specimenDetails: function(specimen_id) {
		var that = this;
		var specimen = PI.Store.specimensSearch.get(specimen_id);
		var specimenPhotos = new PI.Collections.SpecimenPhotos(specimen_id);

		if (specimen) {
			specimenPhotos.fetch({success: function() {
				specimen.set({photos: specimenPhotos})
				var specimenDetailView = new PI.Views.SpecimenDetailView({
					model: specimen
				});
				that.switchView(specimenDetailView);
				//that.$rootEl.html(specimenDetailView.render().$el);
			}});
		} else {
			specimen = new PI.Models.Specimen();
			specimen.set({id: specimen_id})
			specimen.fetch({
				success: function() {
					specimenPhotos.fetch({success: function() {
					specimen.set({photos: specimenPhotos})
					//console.log(specimen)
						var specimenDetailView = new PI.Views.SpecimenDetailView({
							model: specimen
						});
						that.switchView(specimenDetailView);
						//that.$rootEl.html(specimenDetailView.render().$el);					
					}});
				}
			})
		}
	},

	switchView: function(newView) {
		if (PI.Store.currentView) {
			console.log("closed")
			PI.Store.currentView.close();
		}
		console.log("currentView")
		console.log(PI.Store.currentView);
		PI.Store.currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}
});