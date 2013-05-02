PI.Views.MapResultsView = Backbone.View.extend({
	initialize: function() {
		var that = this;
		that.$map = $('.map-container');
	},

	loadMarkers: function() {
		var that = this;
			that.$map.gmap3({
				clear: {
					name: "marker"
				}
			});
			that.$map.gmap3({
			marker: {
				values: PI.Store.specimensSearch.markerValues(),
				options: {
					draggable: false
				},
				events: {
					click: function(marker, event, context){
		        var map = $(this).gmap3("get"),
		          infowindow = $(this).gmap3({get:{name:"infowindow"}});
		        if (infowindow){
		        	if (infowindow.getMap()) {
			          infowindow.close();
		        	} else {
		          infowindow.open(map, marker);
		          infowindow.setContent(context.data);

		        	}
		        } else {
		          $(this).gmap3({
		            infowindow:{
		              anchor:marker, 
		              options:{content: context.data}
		            }
		          });
		        }
		      }
				}
			}
		})
	},

	render: function() {
		PI.Store.map.show();
		this.loadMarkers();
		return this;
	}
});