PI.Routers.FamiliesRouter = Backbone.Router.extend({
	initialize: function($menu, $el) {
		this.$menu = $menu;
		this.$rootEl = $el;

	},

	routes: {
		"": "index",
		"taxonomy": "taxonomyView",
		"map": "map",
		"specimens/favorites": "favorites",
		'search': 'search',
		"specimens/new": "specimenNew",
		"search/results": 'searchResults',
		"specimens/:specimen_id/identification": "specimenID",
		"specimens/:specimen_id": "specimenDetails",
	},

	index: {
		// var familyIndexView = new PI.Views.FamilyIndexView({
		// 	collection: PI.Store.families
		// });
		
		// this.$rootEl.html(familyIndexView.render().el);
	},

	taxonomyView: function() {
		var that = this;
		var taxonomyView = new PI.Views.TaxonomyView();
		this.$rootEl.html(taxonomyView.render().$el);
	},

	map: function() {
		var that = this;
		var mapView = new PI.Views.MapView();
		this.$rootEl.html(mapView.render().$el);

	},

	specimenNew: function() {
		var that = this;
		var specimenNewView = new PI.Views.SpecimenNewView();
		this.$rootEl.html(specimenNewView.render().$el);
	},

	search: function() {
		var that = this;

		PI.Store.lastSearchResults.fetch({
			success: function() {
				var searchView = new PI.Views.SearchView({
					collection: PI.Store.lastSearchResults
				})
				that.$rootEl.html(searchView.render().$el);
			}
		});
	},

	searchResults: function() {
		var that = this;

		PI.Store.lastSearchResults.fetch({
			success: function() {
				var searchResultsView = new PI.Views.SearchResultsView({
					collection: PI.Store.lastSearchResults
				})
				that.$rootEl.html(searchResultsView.render().$el);
			}
		});
	},

	specimenID: function(specimen_id) {
		var that = this;
		var specimenIDView = new PI.Views.SpecimenIDView({

		});

	},

	specimenDetails: function(specimen_id) {
		var that = this;
		var specimen = PI.Store.lastSearchResults.get(specimen_id);
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