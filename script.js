var map = L.map('map').setView([1.29, 103.85], 13);

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

tileLayer.addTo(map);

loadData()

async function loadData() {
    let response = await axios.get("cycling-path.geojson");
    console.log(response.data);

    const cyclingLayer = L.geoJson(response.data, {
      onEachFeature: function(feature, layer) {
      console.log(feature);

      layer.bindPopup(feature.properties.Description)
      }
    })

cyclingLayer.addTo(map);

cyclingLayer.setStyle({
    color: 'red'
});

}

loadData2 ()

async function loadData2(){
    let response = await axios.get("nparks.geojson");
    console.log(response.data);

    const nparksLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            console.log(feature);
            layer.bindPopup(feature.properties.Description)
        }
    })
    nparksLayer.addTo(map);
    nparksLayer.setStyle({
        color: 'green'
    })
    
}
