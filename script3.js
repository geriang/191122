var map = L.map('map').setView([1.29, 103.85], 13);

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

tileLayer.addTo(map);

loadData()

async function loadData() {
    let cyclingResponse = await axios.get("cycling-path.geojson");
    console.log(cyclingResponse.data);
    let nparksResponse = await axios.get("nparks.geojson");
    console.log(nparksResponse.data);


    const cyclingLayer = L.geoJson(cyclingResponse.data, {
      onEachFeature: function(feature, layer) {
      console.log(feature);

      layer.bindPopup(feature.properties.Description)
      }
    })

    const nparksLayer = L.geoJson(nparksResponse.data, {
        onEachFeature: function(feature, layer) {
            console.log(feature);
            layer.bindPopup(feature.properties.Description)
        }
    })



cyclingLayer.addTo(map);

cyclingLayer.setStyle({
    color: 'red'
});

nparksLayer.addTo(map);
nparksLayer.setStyle({
    color: 'green'
});


const baseLayer = {};
const overLayer = {
"Cycling": cyclingLayer, 
"Nparks": nparksLayer
};

// create a layer control (allows the user to toggle between layers)
  // L.control.layers() has two parameters
  // parameter 1 - the base layers (only one can be active)
  // parameter 2 - overlays (multiple can be active)
L.control.layers(baseLayer, overLayer).addTo(map);

}


    
    



