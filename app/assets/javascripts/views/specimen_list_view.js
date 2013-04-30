PI.Views.SpecimenListView = Backbone.View.extend({
	initialize: function() {
		this.$list = $("<div></div>");
		this.$list.addClass("species-list");
		this.$el.append(this.$list);
	},

	render: function() {
		var that = this;
		var renderedContent = JST["specimens/list"]({
			collection: that.collection
		})
		that.$el.html(renderedContent);
		console.log(this.collection);
		return that;
	}
});