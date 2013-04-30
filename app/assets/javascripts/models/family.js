PI.Models.Family = Backbone.RelationalModel.extend({
	urlRoot: "/families",

	relation: [{
		type: Backbone.HasMany,
		key: "genus",
		relationalModel: "PI.Models.Genus",
		collectionType: "PI.Collections.FamilyGenus",

		reverseRelation: {
			key: "family",
			keySource: "family_id",
			includeInJSON: "id"
		}
	}]
});