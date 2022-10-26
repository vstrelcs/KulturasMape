//novadkultura.lv !!!!!!!!!!!!
   
   // Map initialization 
    var map = L.map('map').setView([56.8796, 24.6032], 8);

  


    //osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);
    // map.addLayer(osm)

    // water color 
    var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    Stamen_Toner.addTo(map)

    // dark map 
    var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    // dark.addTo(map)



    var polygon1 = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    82.880859375,
                    28.311635046750613
                  ],
                  [
                    82.85064697265625,
                    28.127705557287978
                  ],
                  [
                    83.02642822265625,
                    27.962869019359157
                  ],
                  [
                    83.39996337890625,
                    27.78320162016678
                  ],
                  [
                    83.85589599609375,
                    27.928900753321876
                  ],
                  [
                    83.92730712890625,
                    28.263263279931966
                  ],
                  [
                    83.77899169921875,
                    28.507315578441784
                  ],
                  [
                    83.5125732421875,
                    28.5941685062326
                  ],
                  [
                    82.880859375,
                    28.311635046750613
                  ]
                ]
              ]
            }
          }
        ]
      }

    /*==============================================
                GEOJSON
    ================================================*/
    var pointData = L.geoJSON(pointJson).addTo(map)
    var lineData = L.geoJSON(lineJson).addTo(map)
    var polygonData = L.geoJSON(polygonJson, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
        },
        style: {
            fillColor: 'red',
            fillOpacity: 1,
            color: '#c0c0c0',
        }
    }).addTo(map);



    var polygon1 = turf.polygon([[
        [128, -26],
        [141, -26],
        [141, -21],
        [128, -21],
        [128, -26]
    ]], {
        "fill": "#F00",
        "fill-opacity": 0.1
    });

    var polyGeojson = L.geoJSON(polygon1).addTo(map)



    /*==============================================
                    LAYER CONTROL
    ================================================*/
    var baseMaps = {
        "OSM": osm,
        "Water color map": watercolor,
        'Dark': dark,
        'Google Street': googleStreets,
        "Google Satellite": googleSat,
    };
    var overlayMaps = {
        "First Marker": singleMarker,
        'Second Marker': secondMarker,
        'Point Data': pointData,
        'Line Data': lineData,
        'Polygon Data': polygonData,
        'wms': wms
    };
    // map.removeLayer(singleMarker)

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);


    /*==============================================
                    LEAFLET EVENTS
    ================================================*/
    map.on('mouseover', function () {
        console.log('your mouse is over the map')
    })

    map.on('mousemove', function (e) {
        document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
        console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
    })

