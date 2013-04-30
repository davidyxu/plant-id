PI.Views.TaxonomyView = Backbone.View.extend({
	events: {
		'click input#family': 'familyAuto',
		'click input#genus': 'genusAuto',
		'click input#species': 'speciesAuto',

		'click li': 'select',
		"keyup input": "render",
	},

	initialize: function() {
		this.selected = null;
		this.familiesList = new PI.Collections.GroupFamilies(0);
		this.genusList = new PI.Collections.FamilyGenus(0);
		this.speciesList = new PI.Collections.GenusSpecies(0);
		
		this.renderedForm = JST["taxonomy/form"]({
			groupsCollection: PI.Store.majorGroups,
			familiesCollection: this.filterList("family", this.familiesList),
			genusCollection: this.filterList("genus", this.genusList),
			speciesList: this.filterList("species", this.speciesList)
		});
		this.$el.html(this.renderedForm);

	},

	render: function() {
		this.$(".family-autocomplete").html("");
		this.$(".genus-autocomplete").html("");
		this.$(".species-autocomplete").html("");
		switch (this.selected) {
			case null:
				break;
			case "family":

				this.renderedAutocomplete = JST["taxonomy/autocomplete"]({
					collection: this.filterList("family", this.familiesList)
				});
				this.$(".family-autocomplete").html(this.renderedAutocomplete)

				break;
			case "genus":

				this.renderedAutocomplete = JST["taxonomy/autocomplete"]({
					collection: this.filterList("genus", this.genusList)
				});
				this.$(".genus-autocomplete").html(this.renderedAutocomplete)

				break;
			case "species":

				this.renderedAutocomplete = JST["taxonomy/autocomplete"]({
					collection: this.filterList("species", this.speciesList)
				});
				this.$(".species-autocomplete").html(this.renderedAutocomplete)

				break;
		}
		return this;
	},

	filterList: function(type, list) {
		switch (type) {
			case "family":
					var value = $('input#family').val();
				break;
			case "genus":
					var value = $('input#genus').val();
				break;
			case "species":
					var value = $('input#species').val();
				break;
		}

		if (value) {
			query = "^" + value;
			var filteredRegExp = new RegExp(query, "i");
			var filtered = list.filter(function(value) {
				return filteredRegExp.test(value.get("name"));
			});

			switch (type) {
				case "family":
						return new PI.Collections.GroupFamilies(filtered);
					break;
				case "genus":
						return new PI.Collections.FamilyGenus(filtered);
					break;
				case "species":
						return new PI.Collections.GenusSpecies(filtered);
					break;
			}
		} else {
			return list;
		}
	},

	familyAuto: function() {
		var that = this;

		that.selected = "family";
		var groupID = $('select#major-group').val();
		if (groupID && groupID != that.familiesList.major_group_id) {
			that.familiesList = new PI.Collections.GroupFamilies(groupID);
			that.familiesList.fetch({
				success: function() {
					that.render();
				}
			});
		}
	},

	genusAuto: function() {
		var that = this;

		that.selected = "genus";
		var familyName = $('input#family').val();
		var family = this.familiesList.findWhere({name: familyName});
		if (family && family.id != that.genusList.family_id) {
			that.genusList = new PI.Collections.FamilyGenus(family.id);
			that.genusList.fetch({
				success: function() {
					that.render();
				}
			});
		}
	},


	speciesAuto: function() {
		var that = this;

		that.selected = "species";
		var genusName = $('input#genus').val();
		var genus = this.genusList.findWhere({name: genusName});
		if (genus && genus.id != that.genusList.genus_id) {
			that.speciesList = new PI.Collections.GenusSpecies(genus.id);
			that.speciesList.fetch({
				success: function() {
					console.log(that.speciesList);
					that.render();
				}
			});
		}
	},


	select: function () {
		$('input#' + this.selected).val($.trim($(event.target).text()));
		this.selected=null;
		this.render();
	},

	getVal: function() {
		var taxonomyValues = {}
		var selectedFamily = this.familiesList.findWhere({name: $('input#family').val()})
		if (selectedFamily) {
			taxonomyValues.family_id = selectedFamily.id
		}
		var selectedGenus = this.genusList.findWhere({name: $('input#genus').val()})
		if (selectedGenus) {
			taxonomyValues.genus_id = selectedGenus.id
		}
		var selectedSpecies = this.speciesList.findWhere({name: $('input#species').val()})
		if (selectedSpecies) {
			taxonomyValues.species_id = selectedSpecies.id
		}
		return taxonomyValues;
	}
})