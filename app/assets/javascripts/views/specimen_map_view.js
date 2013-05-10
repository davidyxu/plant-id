PI.Views.SpecimenMapView = Backbone.View.extend({
	events: {


	},

	initialize: function() {
		var that = this;
		that.$map = $('.map-container');
	},

	render: function() {
		var that = this;

		PI.Store.map.show();
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
		return that;
	},
});