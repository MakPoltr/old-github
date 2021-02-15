let quest_data = JSON.parse(localStorage.getItem('quest_data'))
let quest_coordinates = quest_data.geometry.coordinates;
let heading = quest_data.properties.name_location_quest;
let content = quest_data.properties.description_quest_location;
let URL_video = quest_data.properties.URL_video_location_quest;
let model_pointing_quest_locations = document.getElementById("modelPointingQuestLocations");
let geotag_display_status_button = document.getElementsByClassName("geotagDisplayStatusButton")[0];
let container_describing_location = document.getElementsByClassName("containerDescribingLocation")[0];
let location_description_open_button = document.getElementsByClassName("locationDescriptionOpenButton")[0];
let hidden_location_description_button = document.getElementsByClassName("hiddenLocationDescriptionButton")[0];
let camera_for_geomarker = document.getElementById("cameraForGeomarker");
let location_name = document.getElementById("locationName");
let text_about_location = document.getElementById("textAboutLocation");
let video_marker = document.getElementById("videoMarker");
let camera_for_video_marker = document.getElementById("cameraForVideoMarker");
let location_video_block = document.getElementById("locationVideoBlock")
let geo_AR_hidden = false;

location_name.textContent = heading;
text_about_location.textContent = content;

function change_video_URL(URL, video_block) {
    let src = document.createAttribute('src');
    src.value = URL;
    video_block.setAttributeNode(src);
}

change_video_URL(URL_video, location_video_block);

function change_geomarker_coordinates(coordinates, geomarker) {
    let gps_attribute = document.createAttribute('gps-entity-place');
    gps_attribute.value = `latitude: ${coordinates[0]}; longitude: ${coordinates[1]};`
    geomarker.setAttributeNode(gps_attribute);
}

change_geomarker_coordinates(quest_coordinates, model_pointing_quest_locations)

geotag_display_status_button.addEventListener("click", function () {
    if (!geo_AR_hidden) {
        if (geotag_display_status_button.classList.contains("geotagHidden")) {
            model_pointing_quest_locations.object3D.visible = true;
            geotag_display_status_button.classList.remove("geotagHidden");

        } else if (!geotag_display_status_button.classList.contains("geotagHidden")) {
            model_pointing_quest_locations.object3D.visible = false;
            geotag_display_status_button.classList.add("geotagHidden");
        }
    }

});

location_description_open_button.addEventListener("click", function () {
    if (!container_describing_location.classList.contains("containerDescribingLocationActive")) {
        container_describing_location.classList.add("containerDescribingLocationActive")
    }
});

hidden_location_description_button.addEventListener("click", function () {
    if (container_describing_location.classList.contains("containerDescribingLocationActive")) {
        container_describing_location.classList.remove("containerDescribingLocationActive")
    }
});

function substitution_of_coordinates_for_tests(geomarker_coordinate, camera) {
    let basic_settings = "gpsMinDistance: 5; gpsTimeInterval: 1000;";
    let gps_attribute = document.createAttribute('gps-camera');
    gps_attribute.value = basic_settings + ` simulateLatitude: ${geomarker_coordinate[0] - 0.001}; simulateLongitude: ${geomarker_coordinate[1] - 0.001};`;
    camera.setAttributeNode(gps_attribute);
}

substitution_of_coordinates_for_tests(quest_coordinates, camera_for_geomarker);

video_marker.object3D.visible = false;
camera_for_video_marker.setAttribute('camera', 'active', false);

AFRAME.registerComponent('video-marker', {
    init: function () {
        this.el.sceneEl.addEventListener('markerFound', () => {
            camera_for_geomarker.setAttribute('camera', 'active', false);
            camera_for_video_marker.setAttribute('camera', 'active', true);
            model_pointing_quest_locations.object3D.visible = false;
            video_marker.object3D.visible = true;
            geo_AR_hidden = true;
            if (!geotag_display_status_button.classList.contains("geotagHidden")) {
                geotag_display_status_button.classList.add("geotagHidden");
            }
        });

        this.el.sceneEl.addEventListener('markerLost', () => {
            camera_for_video_marker.setAttribute('camera', 'active', false);
            camera_for_geomarker.setAttribute('camera', 'active', true);
            video_marker.object3D.visible = false;
            model_pointing_quest_locations.object3D.visible = true;
            geo_AR_hidden = false;
            if (geotag_display_status_button.classList.contains("geotagHidden")) {
                geotag_display_status_button.classList.remove("geotagHidden");
            }
        })

    }
});
