PI.Views.SpecimenView = Backbone.View.extend({
		render: function() {
		var that = this;
		var renderedContent = JST["specimens/single"]({
			model: that.model
		})
		that.$el.html(renderedContent)
		return that;
	}
})