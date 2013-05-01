PI.Views.SpecimenMapView = Backbone.View.extend({
	initialize: function() {
		var that = this;
		
		this.$map = $("<div></div>").width("300px").height("300px")
		this.$map.addClass("map");
		this.$map.gmap3({
			marker: {
				latLng: [this.model.get('lat'), this.model.get('lng')]
			},
			map: {
				options: {
					zoom: 10
				}
			}
		});
	},

	render: function() {
		var that = this;
		that.$el.html(this.$map);
		return that;
	}
});