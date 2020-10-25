function visualizeBusinesses() {
    $.ajax({
        url: "/mybusinessservice/businesses",
        type: 'GET',
        dataType: 'json',
        success: $.proxy(function(businesses) {
            var iconFeatures = [];

            $.each(businesses, $.proxy(function(index, business) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([business.lon, business.lat], 'EPSG:4326', 'EPSG:3857')),
                    name: business.name,
                    address: business.address
                });
                iconFeature.setStyle(this.iconStyle);
                iconFeatures.push(iconFeature);
            }, this));

            var vectorSource = new ol.source.Vector({
                features: iconFeatures
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            this.map.addLayer(vectorLayer);
        }, this)
    });
}

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        src: './data/icon.png',
        scale: 0.1
    })
});

var highlightStyle = new ol.style.Style({
    image: new ol.style.Icon({
        src: './data/icon_hover.png',
        scale: 0.1
    })
});

olms(
    'map',
    'https://api.maptiler.com/maps/topo/style.json?key=' + apiKey
).then($.proxy(function(map) {
    this.map = map;

    var selected = null;
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    map.addControl(new ol.control.FullScreen());
    map.addOverlay(overlay);
    
    visualizeBusinesses();

    map.on('pointermove', function(e) {
        map.forEachFeatureAtPixel(e.pixel, function(f) {
            if (selected !== null) {
                selected.setStyle(iconStyle);
                selected = null;
            }

            if (f instanceof ol.Feature) {
                selected = f;
                f.setStyle(highlightStyle);
                content.innerHTML = '<div style="font-family: Helvetica; color:#0D4D93; margin-bottom: 5px;"><span style="font-weight: bold;">Name: </span>' + f.getProperties().name + '</div>';
                content.innerHTML += '<div style="font-family: Helvetica; color:#0D4D93;"><span style="font-weight: bold;">Address: </span>' + f.getProperties().address + '</div>';
                overlay.setPosition(f.getGeometry().getCoordinates());
                return true;
            } else {
                overlay.setPosition(undefined);
                return false;
            }
        });
    });
}, this));