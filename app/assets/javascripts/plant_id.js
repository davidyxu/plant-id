window.PI = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	Store: {},

	initialize: function($menu, $main, groupsData) {
		//PI.Store.families = new PI.Collections.Families(familiesData);
		PI.Store.majorGroups = new PI.Collections.MajorGroups(groupsData);
		PI.Store.lastSearchResults = new PI.Collections.Specimens();
		PI.Store.lastSearchResults.fetch();
		PI.Store.FamiliesRouter = new PI.Routers.FamiliesRouter($menu, $main);


		Backbone.history.start();
	}
};