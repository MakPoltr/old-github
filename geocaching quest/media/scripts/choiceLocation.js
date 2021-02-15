let map;
let URL_GeoJSON_quotes = "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/f45dc65844b11503c9bd8eb26538696469f99dc2/geocaching quest/media/data/questGeoJSON.json";
let array_URL_model_quest_numbers = [
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/one.glb",
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/two.glb",
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/three.glb",
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/four.glb",
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/five.glb",
            "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/cddb9dd4ff830c9c16add0c1fd72f691cca119e2/geocaching%20quest/media/model/numeral/six.glb"

        ]
let path_map_marker_icon = "https://rawcdn.githack.com/MakarPoltr/MakarPoltr.github.io/1dd8da017f4801b696ae606ddcbb2e97f4898906/geocaching%20quest/media/images/star_icon_for_map_marker.svg";

fetch(URL_GeoJSON_quotes).then(function (response) {
    if (response.ok) {
        response.json().then(function (GeoJSON_quests) {
            let previous_quest_button = document.getElementsByClassName("previousQuestButton")[0];
            let quest_selection_button = document.getElementsByClassName("questSelectionButton")[0];
            let next_quest_button = document.getElementsByClassName("nextQuestButton")[0];
            let quest_number_model = document.getElementById("questNumberModel");
            let images_in_quest_frame = document.getElementById("imagesInQuestFrame");
            let quest_map_open_button = document.getElementsByClassName("questMapOpenButton")[0];
            let hide_map_button = document.getElementsByClassName("hideMapButton")[0];
            let map_container = document.getElementsByClassName("mapContainer")[0];
            let number_of_quests = GeoJSON_quests.features.length;
            let displayed_quest_number = 1;
            let array_image_asset_id = [];
            let sum_latitudes_all_quests = 0;
            let sum_longitude_all_quests = 0;

            quest_map_open_button.addEventListener("click", function () {
                if (!map_container.classList.contains("mapContainerActive")) {
                    map_container.classList.add("mapContainerActive")
                }
            });

            hide_map_button.addEventListener("click", function () {
                if (map_container.classList.contains("mapContainerActive")) {
                    map_container.classList.remove("mapContainerActive")
                }
            });

            function switching_quest(required_quest_number) {
                quest_number_model.setAttribute("gltf-model", array_URL_model_quest_numbers[required_quest_number - 1]);
                images_in_quest_frame.setAttribute("src", `#${array_image_asset_id[required_quest_number - 1]}`);
            }

            for (let quest_id = 0; quest_id < number_of_quests; quest_id++) {
                let quest_data = GeoJSON_quests.features[quest_id];
                let image_asset_id = quest_data.properties.image_asset_id;
                array_image_asset_id.push(image_asset_id);

                sum_latitudes_all_quests += quest_data.geometry.coordinates[0]
                sum_longitude_all_quests += quest_data.geometry.coordinates[1]
                let quest_coordinates = new google.maps.LatLng(quest_data.geometry.coordinates[0], quest_data.geometry.coordinates[1]);

                let quest_marker = new google.maps.Marker({
                    position: quest_coordinates,
                    map,
                    icon: path_map_marker_icon
                });

                quest_marker.addListener("click", () => {
                    let quest_number = quest_id + 1;
                    switching_quest(quest_number);
                    if (map_container.classList.contains("mapContainerActive")) {
                        map_container.classList.remove("mapContainerActive");
                    }
                    displayed_quest_number = quest_number;
                });

            }

            let mean_coordinate = new google.maps.LatLng(sum_latitudes_all_quests / number_of_quests, sum_longitude_all_quests / number_of_quests);
            map.panTo(mean_coordinate);
            
            next_quest_button.addEventListener("click", function () {
                if (displayed_quest_number < number_of_quests) {
                    displayed_quest_number += 1;
                } else {
                    console.log(displayed_quest_number)
                    displayed_quest_number = 1
                }
                switching_quest(displayed_quest_number);
            });

            previous_quest_button.addEventListener("click", function () {
                if (displayed_quest_number > 1) {
                    displayed_quest_number -= 1;
                } else {
                    console.log(displayed_quest_number)
                    displayed_quest_number = number_of_quests
                }
                switching_quest(displayed_quest_number);
            });

            quest_selection_button.addEventListener("click", function () {
                let quest_data = GeoJSON_quests.features[displayed_quest_number - 1];
                localStorage.setItem('quest_data', JSON.stringify(quest_data));
            });

        });

    } else {
        console.log('Сетевой запрос для json не получил ответа' + response.status + ': ' + response.statusText);
    }

});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        minZoom: 3,
        center: new google.maps.LatLng(66.788889, 93.775278),
        mapId: "7798f8350d2ff296",
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
}
