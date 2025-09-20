/**
 * FRA Atlas & WebGIS Decision Support System
 * Map JavaScript File - Handles WebGIS functionality
 */

// Initialize map variables
let fraMap;
let baseLayers = {};
let overlayLayers = {};
let layerControl;
let currentState = 'all';

// GeoJSON data for states (simplified for demo)
const statesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Madhya Pradesh",
                "id": "madhya-pradesh",
                "ifr_claims": 245678,
                "ifr_approved": 187432,
                "cr_claims": 12567,
                "cr_approved": 8934,
                "cfr_claims": 5678,
                "cfr_approved": 3245
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[76.5, 21.0], [76.5, 24.5], [82.5, 24.5], [82.5, 21.0], [76.5, 21.0]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Tripura",
                "id": "tripura",
                "ifr_claims": 123456,
                "ifr_approved": 98765,
                "cr_claims": 5678,
                "cr_approved": 4321,
                "cfr_claims": 2345,
                "cfr_approved": 1876
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[91.5, 23.0], [91.5, 24.5], [92.5, 24.5], [92.5, 23.0], [91.5, 23.0]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Odisha",
                "id": "odisha",
                "ifr_claims": 198765,
                "ifr_approved": 156789,
                "cr_claims": 9876,
                "cr_approved": 7654,
                "cfr_claims": 4321,
                "cfr_approved": 3210
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[83.5, 18.0], [83.5, 22.0], [87.5, 22.0], [87.5, 18.0], [83.5, 18.0]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Telangana",
                "id": "telangana",
                "ifr_claims": 156789,
                "ifr_approved": 123456,
                "cr_claims": 7654,
                "cr_approved": 5432,
                "cfr_claims": 3210,
                "cfr_approved": 2109
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.5, 16.0], [77.5, 19.5], [81.5, 19.5], [81.5, 16.0], [77.5, 16.0]]]
            }
        }
    ]
};

// Sample IFR data (simplified for demo)
const ifrData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "state": "madhya-pradesh",
                "district": "balaghat",
                "village": "Mohgaon",
                "holder_name": "Ramesh Kumar",
                "area_hectares": 2.5,
                "status": "approved",
                "approval_date": "2022-05-15"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[80.1, 21.6], [80.1, 21.7], [80.2, 21.7], [80.2, 21.6], [80.1, 21.6]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "odisha",
                "district": "mayurbhanj",
                "village": "Jamda",
                "holder_name": "Sunita Murmu",
                "area_hectares": 1.8,
                "status": "approved",
                "approval_date": "2021-11-23"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[86.1, 21.6], [86.1, 21.7], [86.2, 21.7], [86.2, 21.6], [86.1, 21.6]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "tripura",
                "district": "dhalai",
                "village": "Ambassa",
                "holder_name": "Manik Debbarma",
                "area_hectares": 1.2,
                "status": "approved",
                "approval_date": "2023-02-10"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[91.8, 23.6], [91.8, 23.7], [91.9, 23.7], [91.9, 23.6], [91.8, 23.6]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "telangana",
                "district": "adilabad",
                "village": "Jainoor",
                "holder_name": "Lakshmi Naitam",
                "area_hectares": 2.1,
                "status": "approved",
                "approval_date": "2022-08-05"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[78.8, 19.1], [78.8, 19.2], [78.9, 19.2], [78.9, 19.1], [78.8, 19.1]]]
            }
        }
    ]
};

// Sample CR data (simplified for demo)
const crData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "state": "madhya-pradesh",
                "district": "mandla",
                "village": "Bichhiya",
                "community": "Baiga Tribal Community",
                "area_hectares": 125.5,
                "status": "approved",
                "approval_date": "2022-03-18",
                "rights_type": "grazing"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[80.8, 22.6], [80.8, 22.8], [81.0, 22.8], [81.0, 22.6], [80.8, 22.6]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "odisha",
                "district": "rayagada",
                "village": "Muniguda",
                "community": "Dongria Kondh Community",
                "area_hectares": 210.3,
                "status": "approved",
                "approval_date": "2021-09-12",
                "rights_type": "minor_forest_produce"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[83.4, 19.2], [83.4, 19.4], [83.6, 19.4], [83.6, 19.2], [83.4, 19.2]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "tripura",
                "district": "north-tripura",
                "village": "Dasda",
                "community": "Reang Tribal Community",
                "area_hectares": 95.8,
                "status": "approved",
                "approval_date": "2023-01-05",
                "rights_type": "water_bodies"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[92.0, 24.1], [92.0, 24.2], [92.1, 24.2], [92.1, 24.1], [92.0, 24.1]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "telangana",
                "district": "komaram-bheem",
                "village": "Asifabad",
                "community": "Gond Tribal Community",
                "area_hectares": 178.2,
                "status": "approved",
                "approval_date": "2022-06-22",
                "rights_type": "grazing"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[79.2, 19.3], [79.2, 19.5], [79.4, 19.5], [79.4, 19.3], [79.2, 19.3]]]
            }
        }
    ]
};

// Sample CFR data (simplified for demo)
const cfrData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "state": "madhya-pradesh",
                "district": "dindori",
                "village": "Samnapur",
                "community": "Baiga-Gond Joint Forest Management",
                "area_hectares": 520.5,
                "status": "approved",
                "approval_date": "2022-02-10"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[81.1, 22.8], [81.1, 23.0], [81.3, 23.0], [81.3, 22.8], [81.1, 22.8]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "odisha",
                "district": "kandhamal",
                "village": "Phulbani",
                "community": "Kutia Kondh Forest Protection Committee",
                "area_hectares": 785.2,
                "status": "approved",
                "approval_date": "2021-07-18"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[84.0, 20.2], [84.0, 20.4], [84.2, 20.4], [84.2, 20.2], [84.0, 20.2]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "tripura",
                "district": "dhalai",
                "village": "Gandacherra",
                "community": "Tripura Tribal Forest Conservancy",
                "area_hectares": 320.8,
                "status": "approved",
                "approval_date": "2022-11-15"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[91.9, 23.5], [91.9, 23.7], [92.1, 23.7], [92.1, 23.5], [91.9, 23.5]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "telangana",
                "district": "bhadradri-kothagudem",
                "village": "Bhadrachalam",
                "community": "Koya Tribal Forest Management",
                "area_hectares": 650.3,
                "status": "approved",
                "approval_date": "2022-04-30"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[80.6, 17.8], [80.6, 18.0], [80.8, 18.0], [80.8, 17.8], [80.6, 17.8]]]
            }
        }
    ]
};

// Sample water bodies data (simplified for demo)
const waterBodiesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "state": "madhya-pradesh",
                "name": "Tawa Reservoir",
                "type": "reservoir",
                "area_hectares": 210.5
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[77.9, 22.5], [77.9, 22.6], [78.1, 22.6], [78.1, 22.5], [77.9, 22.5]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "odisha",
                "name": "Hirakud Dam",
                "type": "dam",
                "area_hectares": 385.2
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[83.8, 21.5], [83.8, 21.6], [84.0, 21.6], [84.0, 21.5], [83.8, 21.5]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "tripura",
                "name": "Gumti Reservoir",
                "type": "reservoir",
                "area_hectares": 120.8
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[91.6, 23.5], [91.6, 23.6], [91.7, 23.6], [91.7, 23.5], [91.6, 23.5]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "telangana",
                "name": "Godavari River",
                "type": "river",
                "area_hectares": 450.3
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[79.5, 18.8], [79.5, 18.9], [79.7, 18.9], [79.7, 18.8], [79.5, 18.8]]]
            }
        }
    ]
};

// Sample agricultural land data (simplified for demo)
const agricultureData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "state": "madhya-pradesh",
                "district": "seoni",
                "village": "Keolari",
                "crop_type": "paddy",
                "area_hectares": 85.3
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[79.5, 22.1], [79.5, 22.2], [79.6, 22.2], [79.6, 22.1], [79.5, 22.1]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "odisha",
                "district": "koraput",
                "village": "Jeypore",
                "crop_type": "millets",
                "area_hectares": 65.8
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[82.6, 18.8], [82.6, 18.9], [82.7, 18.9], [82.7, 18.8], [82.6, 18.8]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "tripura",
                "district": "west-tripura",
                "village": "Mohanpur",
                "crop_type": "rubber",
                "area_hectares": 45.2
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[91.2, 23.8], [91.2, 23.9], [91.3, 23.9], [91.3, 23.8], [91.2, 23.8]]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "state": "telangana",
                "district": "warangal",
                "village": "Parkal",
                "crop_type": "cotton",
                "area_hectares": 95.7
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[79.7, 18.2], [79.7, 18.3], [79.8, 18.3], [79.8, 18.2], [79.7, 18.2]]]
            }
        }
    ]
};

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupMapControls();
});

/**
 * Initialize the Leaflet map
 */
function initializeMap() {
    // Get map container
    const mapContainer = document.getElementById('fra-map');
    
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    // Create map placeholder text
    mapContainer.innerHTML = 'Loading FRA Atlas Map...';
    
    // Initialize the map
    fraMap = L.map('fra-map', {
        center: [22.5, 82], // Center of India
        zoom: 5,
        minZoom: 4,
        maxZoom: 12
    });
    
    // Add base layers
    baseLayers = {
        'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        'Terrain': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
        })
    };
    
    // Add default base layer
    baseLayers['OpenStreetMap'].addTo(fraMap);
    
    // Add state boundaries
    const statesLayer = L.geoJSON(statesData, {
        style: function(feature) {
            return {
                fillColor: '#3388ff',
                weight: 2,
                opacity: 1,
                color: '#2c3e50',
                dashArray: '3',
                fillOpacity: 0.1
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with state information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>${props.name}</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">IFR Claims:</span>
                            <span class="stat-value">${props.ifr_claims.toLocaleString()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">IFR Approved:</span>
                            <span class="stat-value">${props.ifr_approved.toLocaleString()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">CR Claims:</span>
                            <span class="stat-value">${props.cr_claims.toLocaleString()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">CR Approved:</span>
                            <span class="stat-value">${props.cr_approved.toLocaleString()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">CFR Claims:</span>
                            <span class="stat-value">${props.cfr_claims.toLocaleString()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">CFR Approved:</span>
                            <span class="stat-value">${props.cfr_approved.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
            
            // Add hover effect
            layer.on({
                mouseover: function(e) {
                    const layer = e.target;
                    layer.setStyle({
                        fillOpacity: 0.3
                    });
                },
                mouseout: function(e) {
                    const layer = e.target;
                    layer.setStyle({
                        fillOpacity: 0.1
                    });
                },
                click: function(e) {
                    fraMap.fitBounds(e.target.getBounds());
                }
            });
        }
    }).addTo(fraMap);
    
    // Create overlay layers
    const ifrLayer = createIFRLayer();
    const crLayer = createCRLayer();
    const cfrLayer = createCFRLayer();
    const waterLayer = createWaterBodiesLayer();
    const agricultureLayer = createAgricultureLayer();
    
    // Add overlay layers to map
    ifrLayer.addTo(fraMap);
    crLayer.addTo(fraMap);
    
    // Define overlay layers for layer control
    overlayLayers = {
        'Individual Forest Rights': ifrLayer,
        'Community Rights': crLayer,
        'Community Forest Resource Rights': cfrLayer,
        'Water Bodies': waterLayer,
        'Agricultural Land': agricultureLayer
    };
    
    // Add layer control
    layerControl = L.control.layers(baseLayers, overlayLayers).addTo(fraMap);
    
    // Add scale control
    L.control.scale().addTo(fraMap);
}

/**
 * Create IFR layer
 */
function createIFRLayer() {
    return L.geoJSON(ifrData, {
        style: function(feature) {
            return {
                fillColor: '#ff5733',
                weight: 1,
                opacity: 1,
                color: '#d63031',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with IFR information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>Individual Forest Right</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">Holder:</span>
                            <span class="stat-value">${props.holder_name}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Village:</span>
                            <span class="stat-value">${props.village}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">District:</span>
                            <span class="stat-value">${props.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">State:</span>
                            <span class="stat-value">${props.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Area:</span>
                            <span class="stat-value">${props.area_hectares} hectares</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Status:</span>
                            <span class="stat-value">${props.status.toUpperCase()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Approval Date:</span>
                            <span class="stat-value">${props.approval_date}</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
        },
        filter: function(feature) {
            // Filter based on selected state
            return currentState === 'all' || feature.properties.state === currentState;
        }
    });
}

/**
 * Create CR layer
 */
function createCRLayer() {
    return L.geoJSON(crData, {
        style: function(feature) {
            return {
                fillColor: '#33ff57',
                weight: 1,
                opacity: 1,
                color: '#27ae60',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with CR information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>Community Right</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">Community:</span>
                            <span class="stat-value">${props.community}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Village:</span>
                            <span class="stat-value">${props.village}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">District:</span>
                            <span class="stat-value">${props.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">State:</span>
                            <span class="stat-value">${props.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Area:</span>
                            <span class="stat-value">${props.area_hectares} hectares</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Rights Type:</span>
                            <span class="stat-value">${props.rights_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Status:</span>
                            <span class="stat-value">${props.status.toUpperCase()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Approval Date:</span>
                            <span class="stat-value">${props.approval_date}</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
        },
        filter: function(feature) {
            // Filter based on selected state
            return currentState === 'all' || feature.properties.state === currentState;
        }
    });
}

/**
 * Create CFR layer
 */
function createCFRLayer() {
    return L.geoJSON(cfrData, {
        style: function(feature) {
            return {
                fillColor: '#3357ff',
                weight: 1,
                opacity: 1,
                color: '#2980b9',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with CFR information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>Community Forest Resource Right</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">Community:</span>
                            <span class="stat-value">${props.community}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Village:</span>
                            <span class="stat-value">${props.village}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">District:</span>
                            <span class="stat-value">${props.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">State:</span>
                            <span class="stat-value">${props.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Area:</span>
                            <span class="stat-value">${props.area_hectares} hectares</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Status:</span>
                            <span class="stat-value">${props.status.toUpperCase()}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Approval Date:</span>
                            <span class="stat-value">${props.approval_date}</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
        },
        filter: function(feature) {
            // Filter based on selected state
            return currentState === 'all' || feature.properties.state === currentState;
        }
    });
}

/**
 * Create Water Bodies layer
 */
function createWaterBodiesLayer() {
    return L.geoJSON(waterBodiesData, {
        style: function(feature) {
            return {
                fillColor: '#33a8ff',
                weight: 1,
                opacity: 1,
                color: '#0984e3',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with water body information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>Water Body</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">Name:</span>
                            <span class="stat-value">${props.name}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Type:</span>
                            <span class="stat-value">${props.type.replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">State:</span>
                            <span class="stat-value">${props.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Area:</span>
                            <span class="stat-value">${props.area_hectares} hectares</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
        },
        filter: function(feature) {
            // Filter based on selected state
            return currentState === 'all' || feature.properties.state === currentState;
        }
    });
}

/**
 * Create Agriculture layer
 */
function createAgricultureLayer() {
    return L.geoJSON(agricultureData, {
        style: function(feature) {
            return {
                fillColor: '#ffda33',
                weight: 1,
                opacity: 1,
                color: '#f39c12',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            // Add popup with agriculture information
            const props = feature.properties;
            const popupContent = `
                <div class="map-popup">
                    <h4>Agricultural Land</h4>
                    <div class="popup-stats">
                        <div class="stat-row">
                            <span class="stat-label">Village:</span>
                            <span class="stat-value">${props.village}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">District:</span>
                            <span class="stat-value">${props.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">State:</span>
                            <span class="stat-value">${props.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Crop Type:</span>
                            <span class="stat-value">${props.crop_type.replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Area:</span>
                            <span class="stat-value">${props.area_hectares} hectares</span>
                        </div>
                    </div>
                </div>
            `;
            layer.bindPopup(popupContent);
        },
        filter: function(feature) {
            // Filter based on selected state
            return currentState === 'all' || feature.properties.state === currentState;
        }
    });
}

/**
 * Set up map controls and event listeners
 */
function setupMapControls() {
    // Get layer checkboxes
    const layerIFR = document.getElementById('layer-ifr');
    const layerCR = document.getElementById('layer-cr');
    const layerCFR = document.getElementById('layer-cfr');
    const layerAssets = document.getElementById('layer-assets');
    const layerWater = document.getElementById('layer-water');
    const layerAgriculture = document.getElementById('layer-agriculture');
    
    // Get filter selects
    const stateSelect = document.getElementById('state-select');
    
    // Add event listeners to layer checkboxes
    if (layerIFR) {
        layerIFR.addEventListener('change', function() {
            toggleLayer('Individual Forest Rights', this.checked);
        });
    }
    
    if (layerCR) {
        layerCR.addEventListener('change', function() {
            toggleLayer('Community Rights', this.checked);
        });
    }
    
    if (layerCFR) {
        layerCFR.addEventListener('change', function() {
            toggleLayer('Community Forest Resource Rights', this.checked);
        });
    }
    
    if (layerWater) {
        layerWater.addEventListener('change', function() {
            toggleLayer('Water Bodies', this.checked);
        });
    }
    
    if (layerAgriculture) {
        layerAgriculture.addEventListener('change', function() {
            toggleLayer('Agricultural Land', this.checked);
        });
    }
    
    // Add event listener to state select
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            filterMapByState(this.value);
        });
    }
}

/**
 * Toggle layer visibility
 */
function toggleLayer(layerName, isVisible) {
    if (!fraMap || !overlayLayers[layerName]) return;
    
    if (isVisible) {
        if (!fraMap.hasLayer(overlayLayers[layerName])) {
            fraMap.addLayer(overlayLayers[layerName]);
        }
    } else {
        if (fraMap.hasLayer(overlayLayers[layerName])) {
            fraMap.removeLayer(overlayLayers[layerName]);
        }
    }
}

/**
 * Filter map by state
 */
function filterMapByState(state) {
    // Update current state
    currentState = state;
    
    // Remove existing overlay layers
    Object.values(overlayLayers).forEach(layer => {
        if (fraMap.hasLayer(layer)) {
            fraMap.removeLayer(layer);
        }
    });
    
    // Create new filtered layers
    overlayLayers['Individual Forest Rights'] = createIFRLayer();
    overlayLayers['Community Rights'] = createCRLayer();
    overlayLayers['Community Forest Resource Rights'] = createCFRLayer();
    overlayLayers['Water Bodies'] = createWaterBodiesLayer();
    overlayLayers['Agricultural Land'] = createAgricultureLayer();
    
    // Add checked layers back to map
    const layerIFR = document.getElementById('layer-ifr');
    const layerCR = document.getElementById('layer-cr');
    const layerCFR = document.getElementById('layer-cfr');
    const layerWater = document.getElementById('layer-water');
    const layerAgriculture = document.getElementById('layer-agriculture');
    
    if (layerIFR && layerIFR.checked) {
        fraMap.addLayer(overlayLayers['Individual Forest Rights']);
    }
    
    if (layerCR && layerCR.checked) {
        fraMap.addLayer(overlayLayers['Community Rights']);
    }
    
    if (layerCFR && layerCFR.checked) {
        fraMap.addLayer(overlayLayers['Community Forest Resource Rights']);
    }
    
    if (layerWater && layerWater.checked) {
        fraMap.addLayer(overlayLayers['Water Bodies']);
    }
    
    if (layerAgriculture && layerAgriculture.checked) {
        fraMap.addLayer(overlayLayers['Agricultural Land']);
    }
    
    // Update layer control
    if (layerControl) {
        fraMap.removeControl(layerControl);
    }
    
    layerControl = L.control.layers(baseLayers, overlayLayers).addTo(fraMap);
    
    // Zoom to state if specific state selected
    if (state !== 'all') {
        const stateFeature = statesData.features.find(feature => feature.properties.id === state);
        
        if (stateFeature) {
            const bounds = L.geoJSON(stateFeature).getBounds();
            fraMap.fitBounds(bounds);
        }
    } else {
        // Reset view to India
        fraMap.setView([22.5, 82], 5);
    }
}

// Add custom CSS for map popups
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .map-popup h4 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
        }
        
        .popup-stats {
            font-size: 14px;
        }
        
        .stat-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-weight: 600;
            color: #7f8c8d;
        }
        
        .stat-value {
            color: #2c3e50;
        }
        
        .leaflet-popup-content {
            margin: 12px;
            min-width: 200px;
        }
    `;
    document.head.appendChild(style);
});