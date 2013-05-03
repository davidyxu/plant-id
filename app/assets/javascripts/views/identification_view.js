PI.Views.IdentificationView = Backbone.View.extend({
	render: function() {
		var that = this;
		var renderedContent = JST["identifications/details"]({
			model: that.model
		})
		that.$el.html(renderedContent)
		return that;
	}
})