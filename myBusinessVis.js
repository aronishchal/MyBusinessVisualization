function visualizeBusinesses() {
    $.ajax({
        url: "/mybusinessservice/businesses",
        type: 'GET',
        dataType: 'json',
        success: $.proxy(function(businesses) {
            var iconFeatures = [];

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    src: './data/icon.png',
                    scale: 0.1
                })
            });

            $.each(businesses, function(index, business) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([business.lon, business.lat], 'EPSG:4326', 'EPSG:3857')),
                    name: business.name
                });
                iconFeature.setStyle(iconStyle);
                iconFeatures.push(iconFeature);
            });

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

olms(
    'map',
    'https://api.maptiler.com/maps/topo/style.json?key=' + apiKey
).then($.proxy(function(map) {
    this.map = map;
    map.addControl(new ol.control.FullScreen());
    visualizeBusinesses();
}, this));