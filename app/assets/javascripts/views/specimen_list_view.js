PI.Views.SpecimenListView = Backbone.View.extend({
	initialize: function() {
		this.$list = $("<div></div>");
		this.$list.addClass("species-list");
		this.$el.append(this.$list);
	},

	render: function() {
		var that = this;
		var renderedContent = JST["specimens/list"]({
			collection: PI.Store.specimensSearch
		})
		that.$el.html(renderedContent);
		return that;
	}
});