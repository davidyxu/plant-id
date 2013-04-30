PI.Collections.GroupFamilies = Backbone.Collection.extend({
	initialize: function(major_group_id) {
		this.major_group_id = major_group_id
	},
	model: PI.Models.Family,
	url: function() {
		return "/major_groups/" + this.major_group_id + "/families"
	}
});