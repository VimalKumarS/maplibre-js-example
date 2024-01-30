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
    console.log(data);
});
// console.log(21)

map.on('load', () => {

    map.loadImage(
        'https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            // Add a GeoJSON source with 3 points.
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                "geo_region":"NA"
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    -102.38406377285888,
                                    39.73185562910032
                                ]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                "geo_region":"EMEA"
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    8.820436495145827,
                                    48.90092328035064
                                ]
                            }
                        },
                        
                    ]
                }
            });

            // Add a symbol layer
            map.addLayer({
                'id': 'symbols',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker'
                }
            });
        });
});

let mapcontainer = document.getElementById('map-container');
let mapcontainer1 = document.getElementById('map-container1')
let filter = document.getElementById('filter')

map.on('mouseenter', 'symbols', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'symbols', () => {
    map.getCanvas().style.cursor = '';
});
map.on('click', 'symbols', (e) => {
    const coordinates =e.features[0].geometry.coordinates
    map.flyTo({
        center: e.features[0].geometry.coordinates
    });
    let bbox =[]
    if(e.features[0].properties.geo_region=="NA"){
     bbox = [[-79.05888905994738, 49.25221508200241], [-145.93855459244068, 32.2664922277412245]];
    }else{
         bbox = [[45.05888905994738, 56.25221508200241], [-37.93855459244068, 37.2664922277412245]];
    }

    const bounds = new maplibregl.LngLatBounds(bbox)
    map.fitBounds(bounds, {
        padding: 20
    });
    mapcontainer.style.display='none';
    mapcontainer1.style.display='block';
    filter.style.display='flex';
});

map.on('click',  (e) => {
   console.log(e)
});

map.dragRotate.disable();
map.touchZoomRotate.disableRotation();
map.scrollZoom.disable();

// let geolocate = new maplibregl.GeolocateControl({
//     positionOptions: {
//         enableHighAccuracy: true
//     },
//     trackUserLocation: true
//   });
//   // Add the control to the map.
//   map.addControl(geolocate);
//   // Set an event listener that fires
//   // when a trackuserlocationend event occurs.
//   geolocate.on('trackuserlocationend', function(event) {
//     console.log('A trackuserlocationend event has occurred.')
//     console.log(data)
//   });


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
    console.log('drag', map.getBounds())

  });

//https://www.jawg.io/docs/integration/maplibre-gl-js/add-marker/
// https://visgl.github.io/react-map-gl/docs/upgrade-guide


//try anchor and click event
// map transition focus with zoom to that location