PI.Models.Genus = Backbone.Model.extend({
	urlRoot: "/genus"

	// relation: [{
	// 	type: Backbone.HasMany,
	// 	key: "species",
	// 	relationalModel: "PI.Models.Species",
	// 	collectionType: "PI.Collections.GenusSpecies",

	// 	reverseRelation: {
	// 		key: "genus",
	// 		keySource: "genus_id",
	// 		includeInJSON: "id"
	// 	}
	// }]
});