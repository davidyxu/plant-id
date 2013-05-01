PI.Routers.FamiliesRouter = Backbone.Router.extend({
	initialize: function($menu, $el) {
		this.$menu = $menu;
		this.$rootEl = $el;

	},

	routes: {
		"": "index",
		"specimens/favorites": "favorites",
		'search': 'search',
		"specimens/new": "specimenNew",
		"specimens/:specimen_id/identification": "specimenID",
		"specimens/:specimen_id": "specimenDetails",
	},

	index: function() {
		var that = this;
		var indexView = new PI.Views.IndexView();

		// var familyIndexView = new PI.Views.FamilyIndexView({
		// 	collection: PI.Store.families
		// });
		
		this.$rootEl.html(indexView.render().el);
	},

	specimenNew: function() {
		var that = this;
		var specimenNewView = new PI.Views.SpecimenNewView();
		this.$rootEl.html(specimenNewView.render().$el);

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
				that.$rootEl.html(searchView.render().$el);
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
		console.log(specimen);
		if (specimen) {
			var specimenDetailView = new PI.Views.SpecimenDetailView({
				model: specimen
			});
			that.$rootEl.html(specimenDetailView.render().$el);
		} else {
			specimen = new PI.Models.Specimen();
			specimen.set({id: specimen_id})
			specimen.fetch({
				success: function() {
					var specimenDetailView = new PI.Views.SpecimenDetailView({
						model: specimen
					});
					that.$rootEl.html(specimenDetailView.render().$el);					
				}
			})
		}
	}
});