PI.Collections.GenusSpecies = Backbone.Collection.extend({
	initialize: function(genus_id) {
		this.genus_id = genus_id
	},
	model: PI.Models.Species,
	url: function() {
		return "/genus/" + this.genus_id + "/species"
	}
});