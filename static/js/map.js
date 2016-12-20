var map;
var coords = {lat: 41.557808, lng: 2.096109};

function initMap() {
	var mapOptions = {
		center: new google.maps.LatLng(coords.lat, coords.lng),
		zoom: 17
	};

	map = new google.maps.Map(document.getElementById("map"),
								mapOptions);

	var marker = new google.maps.Marker({
		position: coords,
		map: map
		//title: 'Hello world'
	});

    
    var contentString = '<div class="info-window">' +
                '<h3>MeteoFIB</h3>' +
                '<div class="info-content">' +
                '<p>Ubicación de la estación meteorológica</p>' + 
		'<p>08208 Sabadell</p>' +
                '</div>' +
                '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

}
