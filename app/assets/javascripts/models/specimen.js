PI.Models.Specimen = Backbone.Model.extend({
	markerValue: function() {
		var that = this;
		return {
			latLng: [that.get('lat'), that.get('lng')],
			data: "<b><a href='#specimens/" + this.id + "'>" + this.get('title') + "</a></b><br>" + this.get('content') 
		}
	},
	urlRoot: "/specimens"
})