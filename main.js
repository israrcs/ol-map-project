import Map from 'ol/Map';
import View from 'ol/View';
// import {Draw, Modify, Snap} from 'ol/interaction.js';
import {OSM, Vector as VectorSource, TileWMS} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
// import {get} from 'ol/proj.js';
import {Circle} from 'ol/geom.js';
// import {createXYZ} from 'ol/tilegrid.js';
import Feature from 'ol/Feature.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
// import {Style} from 'ol/style.js';
// import Projection from 'ol/proj/Projection.js';


const radius = 1000;
var centerLonlat = {lng: 28.239834, lat: -26.129185};
displayInfo(radius);
const circleFeature = new Feature({
    geometry: new Circle(fromLonLat([centerLonlat.lng, centerLonlat.lat]), radius),
});
function displayInfo(a) {
    var d = a,
        h = d / 1E3,
        k = 6.21371E-4 * d,
        f = 3.28084 * d,
        r = "<div>"
            + d.toFixed(2) + " Meters</div><div>"
            + h.toFixed(2) + " Km</div><div>"
            + k.toFixed(2) + " Miles</div><div>"
            + f.toFixed(0) + " Feet</div>";
    document.getElementById('radius').innerHTML = r
}
const source = new VectorSource({
    features: [circleFeature],
});
const mapGoogle = new google.maps.Map(
    document.getElementById("googleMap"),
    {
        zoom: 14,
        center: centerLonlat,
        mapTypeId: "terrain",
    }
);

var cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: mapGoogle,
    center: new google.maps.LatLng(centerLonlat.lat,
        centerLonlat.lng),
    zoom: 14,
    radius: radius,
});

const vector = new VectorLayer({
    source: source,
    visible: true,
});

const osmLayer = new TileLayer({
    source: new OSM(),
});

const map = new Map({
    layers: [osmLayer, vector],
    target: 'map',
    view: new View({
        center: fromLonLat([centerLonlat.lng, centerLonlat.lat]),
        zoom: 14,
    }),
});
