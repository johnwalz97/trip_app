var map;
var infowindow;
function createMap(coords, zoom){
    var mapOptions = {
        zoom: zoom,
        center: new google.maps.LatLng(coords.latitude, coords.longitude),
        panControl: false,
        panControlOptions: {
            coords: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            coords: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false
    };
    infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
function createPoint(coords, title, html, MyMap){
    var myPoint = new google.maps.LatLng(coords.latitude, coords.longitude);
    var point = new google.maps.Marker({
        title: title,
        html: html
    })
    point.setPosition(myPoint);
    point.setMap(MyMap);
    google.maps.event.addListener(point, 'click', function(){
        infowindow.setContent(this.html);
        infowindow.open(map, this);
    })
}
function addMarker(place, places) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });
    google.maps.event.addListener(marker, 'click', function() {
        places.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infowindow.setContent(result.name);
            infowindow.open(map, marker);
        });
    });
}