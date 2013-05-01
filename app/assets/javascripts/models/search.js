PI.Models.Search = Backbone.Model.extend({
	query: function() {
		var url = "/searches?";
		attributes = _.clone(this.attributes);
		Object.keys(attributes).forEach(function (key) {
			url += key + "=" + attributes[key] + "&";
		});

		if (url[url.length-1] === "&") {
			return url.slice(0, -1);
		} else {
			return url;
		}
	}
});