PI.Views.SearchView = Backbone.View.extend({
	events: {
		'click a.toggle-view': 'toggle',
		'click a.filter-option': 'filterOption',
		'click div.listed-specimen': 'viewDetails',
		'click button.dropdown-toggle': 'toggleView',
		'blur ul.dropdown-menu': 'menuClose'
	},

	menuClose: function() {
		$('.btn-group').removeClass('open');
	},

	toggleView: function() {
		$('.btn-group').toggleClass('open');
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
		this.renderView();
		$('a.toggle-view').text(this.viewType);
	},

	initialize: function() {
		this.viewType = "map view";
		this.open = null;

		PI.Store.specimensSearch.on("all", function() {this.render()}, this);
		PI.Store.search.on("all", function() { PI.Store.specimensSearch.fetch()});

		this.renderedContent = JST["menus/filter"]();

		this.dateFormView = JST["menus/date"]();
		this.descriptionFormView = JST["menus/description"]();
		this.taxonomyFormView = new PI.Views.TaxonomyView();
		this.taxonomySpecificity = JST["menus/specificity"]();
	},

	render: function() {
		var that = this;

		that.$el.html(that.renderedContent);
		that.renderMenu();
		that.renderView();
		return that;
	},

	renderMenu: function() {
		var that = this;
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

	renderView: function() {
		var that = this;
		if (that.viewType === "map view") {
			mapResultsView = new PI.Views.MapResultsView({
				collection: PI.Store.specimensSearch
			});
			$('.view-container').html(mapResultsView.render().el);
		} else {
			specimenListView = new PI.Views.SpecimenListView({
				collection: this.collection
			});
			$('.view-container').html(specimenListView.render().el);
		}
	}
});