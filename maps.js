//Инициализация Google карты по plaiceId
function initMapMarker(placeId, elementId) {
    var map = new google.maps.Map(document.getElementById(elementId), {
        center: {lat: 0, lng: 0},
        zoom: 11,
		scrollwheel: true,
        gestureHandling: 'cooperative'
    });
	//var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
	var lang = $('html').attr('lang');
    service.getDetails({
        placeId: placeId
    }, function(place, status) {
			map.setZoom(11);
            map.setCenter(place.geometry.location);
			if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var directionUrl = 'https://www.google.com/maps/dir/?api=1&origin=' + position.coords.latitude + ',' + position.coords.longitude + '&destination=QVB&destination_place_id=' + placeId;
					$('#' + elementId).prepend('<a href="' + place.url + '" class="view-map-btn" target="_blank">' + translation.View_On_Google_Maps(lang) + '</a>\
					<a href="' + directionUrl + '" class="direct-map-btn" target="_blank">' + translation.Get_Directions(lang) + '</a>');
			});
        }
    });
}

//Инициализация карты по координатам
function initMap(elementId){
    var myLatlng = new google.maps.LatLng($('#search-panel').attr('data-latitude'), $('#search-panel').attr('data-longitude'));
    map = new google.maps.Map(document.getElementById(elementId), {
        center: myLatlng,
        zoom: mapZoom,
        disableDefaultUI: true,
        scrollwheel: true,
        gestureHandling: 'cooperative'
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: mapTitle
    });
    marker.setMap(map);
}
//Инициализация карты местонахождения компании(можно объединить с предидущей)
function initOurLocationMap() {
    var myLatlng = new google.maps.LatLng(7.9927999, 98.3056705);
    map = new google.maps.Map(document.getElementById('ourLocation'), {
        center: myLatlng,
        zoom: 10,
        disableDefaultUI: true,
        scrollwheel: false,
        gestureHandling: 'cooperative'
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Boat Avenue, 49/15 Bandon-Cherngtalay Road, Thalang, Choeng Thale, Phuket, 83110'
    });
    marker.setMap(map);
}
//Вставка карты в панель поиска (сейчас уже не используется но присутствует в коде)
function appendMap(withPlaceId) {
	var placeId = $('#search-panel').attr('data-place-id');
    $('.search-content').empty().append('<div id="map"></div>');
    $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
    setTimeout(function(){
		if(withPlaceId){
			initMapMarker(placeId, 'map');
		}
		else{
			initMap('map');
		}
		}, 500);
}