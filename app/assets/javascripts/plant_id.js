window.PI = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	Store: {},

	initialize: function($main, groupsData, favoritesData) {
		PI.Store.favorites = new PI.Collections.Favorites(favoritesData);
		PI.Store.majorGroups = new PI.Collections.MajorGroups(groupsData);
		PI.Store.search = new PI.Models.Search();
		PI.Store.specimensSearch = new PI.Collections.SpecimensSearch(PI.Store.search);

		PI.Store.FamiliesRouter = new PI.Routers.FamiliesRouter($main);
		
		Backbone.history.start();
	}
};

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  console.log("yes");
  if (this.onClose){
   this.onClose();
  }
}