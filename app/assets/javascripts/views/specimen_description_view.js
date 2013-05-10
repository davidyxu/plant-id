PI.Views.SpecimenDescriptionView = Backbone.View.extend({
	render: function() {
		var that = this;
		var renderedContent = JST["specimens/description"]({
			specimen: that.model
		})
		that.$el.html(renderedContent);
		return that
	}
})