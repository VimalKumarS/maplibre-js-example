import maplibregl from 'maplibre-gl';
import Map from 'react-map-gl/maplibre';

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet location
    center: [0, 0], // starting position [lng, lat]
    zoom: 1, // starting zoom

});
let bbox = [[-144.05888905994738, 62.25221508200241], [-121.93855459244068, 7.2664922277412245]]; //<=usa
bbox=[[142.79302711855752, 63.345634727907424],[-140.0239270223874,5.0661667640883365]]
let newCameraTransform = map.fitBounds(bbox, {
  padding: {top: 2, bottom:25, left: 15, right: 5}
},(data)=>{
    
});
// console.log(21)


let geolocate = new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
  });
  // Add the control to the map.
  map.addControl(geolocate);
  // Set an event listener that fires
  // when a trackuserlocationend event occurs.
  geolocate.on('trackuserlocationend', function(event) {
    console.log('A trackuserlocationend event has occurred.')
    console.log(data)
  });


map.on('zoom', () => {
    const currentZoom = map.getZoom();
    // if (currentZoom > lastZoom) {
    //   // zoom in
    // } else {
    //   // zoom out
    // }
  
    console.log(map.getBounds())
  });

//   map.on('mousemove', function(e) {
//     // var c = map.project(e.lngLat);
//     // voteDiv1.style.left = (c.x) - 50 + 'px';
//     // voteDiv1.style.top = (c.y) - 50 + 'px';
//     console.log(map.getBounds())
//   });

  map.on('drag', (e) => {
    console.log(map.getBounds())

  });

//https://www.jawg.io/docs/integration/maplibre-gl-js/add-marker/
// https://visgl.github.io/react-map-gl/docs/upgrade-guide