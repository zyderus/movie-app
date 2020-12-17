console.log('gmap.js');

let map;
let marker;
let activeInfoWindow;
let myLatLng;
let directionsService;
let directionsRenderer;

async function initMap(coords) {
  myLatLng = { lat: coords.lat, lng: coords.lon };

  // Set map theme and marker depending on site theme
  const style = toggleSwitch.checked ? styles.night : styles.retro;
  const iconUrl = toggleSwitch.checked ? '/img/marker-light.png' : '/img/marker-dark.png';

  // Fetch nearby movie theater locations
  const url = '/api/places?';
  const params = new URLSearchParams({ language });
  params.append('location', `${coords.lat},${coords.lon}`);
  params.append('radius', '2500');
  params.append('type', 'movie_theater');
  const theaters = await fetchData(url + params);

  // Activate direction services
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  // Draw map
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 13,
    disableDefaultUI: true,
    styles: style,
  });
  directionsRenderer.setMap(map);

  // Place current position marker
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    animation: google.maps.Animation.DROP,
    title: 'Your data shows you are here!',
    icon: {
      url: iconUrl,
      scaledSize: new google.maps.Size(40, 40),
    },
  });
  marker.addListener('mouseover', toggleBounce);
  marker.addListener('mouseout', toggleBounce);

  // Add marker for each movie theater
  theaters.forEach(theater => {
    addMarker(theater);
  });

  // Change map theme and marker on theme toggle
  google.maps.event.addDomListener(toggleSwitch, 'change', function(e) {
    if (e.target.checked) {
      map.setOptions({ styles: styles.night });
      marker.setOptions({ icon: { 
          url: '/img/marker-light.png',
          scaledSize: new google.maps.Size(40, 40) },
      });
    } else {
      map.setOptions({
        styles: styles.retro,
      });
      marker.setOptions({ icon: { 
          url: '/img/marker-dark.png',
          scaledSize: new google.maps.Size(40, 40) },
      });
      // marker.setIcon('/img/marker-dark.png'),
    }
  });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// Add theaters and infowindows
function addMarker(place) {
  let marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    icon: {
      url: place.icon,
      scaledSize: new google.maps.Size(20, 20),
    },
    title: place.name,
  });

  // Infowindow content
  const contentString = `
    <div><h3>${place.name}</h3></div>
    <div>🚩 ${place.vicinity}</div>
    <div>⭐ ${place.rating} (${place.user_ratings_total})</div><br>
    <div><button id="router-btn" class="btn-custom">Route</button></div>
  `;

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  // Click on button in Infowindow to display route
  google.maps.event.addListener(infowindow, 'domready', () => {
	  const routerBtn = document.getElementById('router-btn');
    routerBtn.addEventListener('click', () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer, place.geometry.location)
		});
  });
  
  // Open Infowindow on click
  marker.addListener('click', () => {
    if (activeInfoWindow) { activeInfoWindow.close();}
    infowindow.open(map, marker);
    activeInfoWindow = infowindow;
  });
}

// Display route
function calculateAndDisplayRoute(directionsService, directionsRenderer, endCoords) {
  if (activeInfoWindow) { activeInfoWindow.close();}
  directionsService.route(
    {
      origin: myLatLng,
      destination: endCoords,
      avoidTolls: true,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

// Map styles
const styles = {
  default: [
    { icon: 'purple' },
  ],
  night: [
    { icon: 'orangered' },
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
  retro: [
    { icon: 'purple' },
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ],
  hiding: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};