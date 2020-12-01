console.log('gmap.js');

let map;
let marker;

function initMap(coords) {
  const myLatLng = { lat: coords.lat, lng: coords.lon };

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 14,
    disableDefaultUI: true,
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    animation: google.maps.Animation.DROP,
    title: 'Your data shows you are here!',
  });
  marker.addListener('mouseover', toggleBounce);
  marker.addListener('mouseout', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
