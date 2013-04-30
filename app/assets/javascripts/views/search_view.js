PI.Views.SearchView = Backbone.View.extend({
	events: {
		'click a.toggle-view': 'toggle',
		'click a.filter-option': 'filterOption',
		'click div.listed-specimen': 'viewDetails'
	},

	filterOption: function() {
		if (event.target.id === this.open) {
			this.open = null;
		} else {
			this.open = event.target.id
		}
		this.renderMenu();
	},

	viewDetails: function() {
		console.log(event.target.id);
		var specimen_id = event.target.id;
		if (!specimen_id) {
			specimen_id = $(event.target).closest('div').attr('id')
		}
		window.location='#specimens/' + specimen_id;
	},

	toggle: function() {
		if (this.viewType === "list view") {
			this.viewType = "map view"
		} else {
			this.viewType = "list view"
		}
		this.render();
		$('a.toggle-view').text(this.viewType);
	},

	initialize: function() {
		this.open = null;
		this.viewType = "map view";
		this.$menu = $("<div></div>");
		this.$menu.addClass('filter-menu');

		this.$mapContainer = $("<div></div>")
		this.$mapContainer.addClass('map-container');

		this.$el.append(this.$menu);
		this.$el.append(this.$mapContainer);

		this.dateFormView = JST["menus/date"]();
		this.descriptionFormView = JST["menus/description"]();
		this.taxonomyFormView = new PI.Views.TaxonomyView();
		this.taxonomySpecificity = JST["menus/specificity"]();
	},

	renderMenu: function() {
		var that = this;


		var filterOptions = JST["menus/filter"]();
		var toggleViews = JST["menus/toggle"]();
		that.$menu.html(toggleViews);
		that.$menu.append("<p><u>Filter Options</u></p>");

		//that.$menu.append(that.taxonomyFormView.render().el);
		this.$menu.append(filterOptions);
		$('.taxonomy-filter').html('');
		$('.date-filter').html('');
		$('.description-filter').html('');
		switch (that.open) {
			case "taxonomy":
				$('.taxonomy-filter').html(that.taxonomyFormView.render().el);
				$('.taxonomy-filter').append(that.taxonomySpecificity);
				break;
			case "date":
				$('.date-filter').html(that.dateFormView);
				break;
			case "description":
				$('.description-filter').html(that.descriptionFormView);
				break;
		}
	},

	render: function() {
		var that = this;
		if (!that.viewType) {
			that.viewType = "map view";
		}

		that.renderMenu();
		if (that.viewType === "map view") {
			this.mapResultsView = new PI.Views.MapResultsView({
				collection: this.collection
			});
			that.$mapContainer.html(that.mapResultsView.render().el);
		} else {
			this.specimenListView = new PI.Views.SpecimenListView({
				collection: this.collection
			});
			that.$mapContainer.html(that.specimenListView.render().el);

		}
		return that;
	},

	submit: function() {

	}
});