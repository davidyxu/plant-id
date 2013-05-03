PI.Views.TaxonomyView = Backbone.View.extend({
	events: {
		'change select#major-group': 'getFamily',
	},

	initialize: function() {
		this.familiesList = new PI.Collections.GroupFamilies(0);
		this.genusList = new PI.Collections.FamilyGenus(0);
		this.speciesList = new PI.Collections.GenusSpecies(0);

		this.renderedForm = JST["taxonomy/form"]({
			groupsCollection: PI.Store.majorGroups,
		});

		this.$el.html(this.renderedForm);
	},

	render: function() {
		var that = this;
		this.renderFamily();
		this.renderGenus();
		this.renderSpecies();

		return this;
	},

	renderFamily: function() {
		var that = this;

		that.$( "#family-autocomplete" ).autocomplete({
	  	source: that.familiesList.toAutocomplete(),
	  	change: function (event, ui) {
				var family = that.familiesList.findWhere({name: $(this).val()});
				if (family) {
					that.genusList = new PI.Collections.FamilyGenus(family.id);
					if (that.model) {
						that.model.set(that.getVal());
					}
					that.genusList.fetch({
						success: function() {
							that.renderGenus();
						}
					});
				}
	    }
		});
	},

	renderGenus: function() {
		var that = this;
		this.$( "#genus-autocomplete" ).autocomplete({
	  	source: that.genusList.toAutocomplete(),
	  	change: function (event, ui) {
				var genus = that.genusList.findWhere({name: $(this).val()});
				if (genus) {
					that.speciesList = new PI.Collections.GenusSpecies(genus.id);

					if (that.model) {
						that.model.set(that.getVal());
					}
					
					that.speciesList.fetch({
						success: function() {
							that.renderSpecies();

						}
					});
				}
	    }
		});
	},

	renderSpecies: function() {
		var that = this;
		console.log(that.speciesList.toAutocomplete());
		this.$( "#species-autocomplete" ).autocomplete({
	  	source: that.speciesList.toAutocomplete(),
	  	change: function (event, ui) {
	  		var species = that.speciesList.findWhere({name: $(this).val()});
				if (that.model) {
					that.model.set(that.getVal());
				}
	  	}
		});
	},

	getFamily: function() {
		var that = this;
		var groupID = $('select#major-group').val();
		if (groupID && groupID != that.familiesList.major_group_id) {
			that.familiesList = new PI.Collections.GroupFamilies(groupID);
			that.familiesList.fetch({
				success: function() {
					that.renderFamily();
				}
			});
		}
	},

	getVal: function() {
		var taxonomyValues = {}
		var selectedFamily = this.familiesList.findWhere({name: $('input#family-autocomplete').val()})
		if (selectedFamily) {
			taxonomyValues.family_id = selectedFamily.id
		} else {
			taxonomyValues.family = $('input#family-autocomplete').val()
		}
		var selectedGenus = this.genusList.findWhere({name: $('input#genus-autocomplete').val()})
		if (selectedGenus) {
			taxonomyValues.genus_id = selectedGenus.id
		} else {
			taxonomyValues.genus = $('input#genus-autocomplete').val()
		}
		var selectedSpecies = this.speciesList.findWhere({name: $('input#species-autocomplete').val()})
		if (selectedSpecies) {
			taxonomyValues.species_id = selectedSpecies.id
		} else {
			taxonomyValues.species = $('input#species-autocomplete').val()
		}
		return taxonomyValues;
	}
})