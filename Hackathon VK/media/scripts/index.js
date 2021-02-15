let date = new Date();
let map;
let voice_assistant_button;
let voice_assistant_commands = {};
let name_today_json = (date.getDate() - 1) + "." + (date.getMonth() + 1) + "." + date.getFullYear();
let url_to_today_json = "/media/data/jsons/" + name_today_json + ".json";
let regions_table = document.getElementsByClassName('COVIDDataTable')[0];
let charts_for_russia = document.getElementsByClassName('chartsForRussia')[0];

if (annyang) {
    annyang.setLanguage('ru');
    document.getElementsByClassName("COVIDinf")[0].insertAdjacentHTML('afterend', '<div class="voiceAssistantButton"></div>');
    voice_assistant_button = document.getElementsByClassName("voiceAssistantButton")[0];
    voice_assistant_button.addEventListener("click", () => {
        if (voice_assistant_button.hasAttribute("active")) {
            annyang.abort()
            voice_assistant_button.removeAttribute("active");
        } else {
            annyang.start()
            voice_assistant_button.setAttribute("active", null)
        }
    });
}

fetch(url_to_today_json).then(function (response) {
    if (response.ok) {
        response.json().then(function (today_json) {
            let all_infected_in_russia = 0;
            let all_recovered_in_russia = 0;
            let all_dead_in_russia = 0;
            let max_infected = 0;
            let max_dead = 0;
            let max_recovered = 0;
            let max_mortality = 0;
            let coords_region_with_max_mortality;
            let coords_region_with_max_recovered;
            let coords_region_with_max_infected;
            let coords_region_with_max_dead;

            for (let i = 0; i < today_json.features.length; i++) {
                let circle_color;
                let region_data = today_json.features[i]
                let region_name = region_data.properties.region
                let all_infected_in_region = region_data.properties.infected.all
                all_infected_in_russia += all_infected_in_region
                let all_recovered_in_region = region_data.properties.recovered.all
                all_recovered_in_russia += all_recovered_in_region
                let all_dead_in_region = region_data.properties.dead.all
                all_dead_in_russia += all_dead_in_region
                let region_table_row = `<div class="tableRow regularRow"><div>${region_name}</div><div>${all_recovered_in_region}</div><div>${all_dead_in_region}</div><div>${all_infected_in_region}</div></div>`
                regions_table.insertAdjacentHTML('beforeend', region_table_row);
                let region_coordinates = new google.maps.LatLng(region_data.geometry.coordinates[0], region_data.geometry.coordinates[1]);
                let mortality = (all_dead_in_region / all_infected_in_region) * 100

                if (max_infected < all_infected_in_region) {
                    max_infected = all_infected_in_region;
                    coords_region_with_max_infected = region_coordinates;
                }

                if (max_dead < all_dead_in_region) {
                    max_dead = all_dead_in_region;
                    coords_region_with_max_dead = region_coordinates;
                }

                if (max_recovered < all_recovered_in_region) {
                    max_recovered = all_recovered_in_region;
                    coords_region_with_max_recovered = region_coordinates;
                }

                if (max_mortality < mortality) {
                    max_mortality = mortality;
                    coords_region_with_max_mortality = region_coordinates;
                }

                if (mortality > 4) {
                    circle_color = "#DD4C4C";
                } else if (mortality < 3) {
                    circle_color = "#FFEE00"
                } else {
                    circle_color = "#EAAF58"
                }

                const region_circle = new google.maps.Circle({
                    strokeColor: circle_color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: circle_color,
                    fillOpacity: 0.35,
                    map,
                    center: region_coordinates,
                    radius: Math.sqrt(all_infected_in_region) * 500,
                });

                let infected_today_in_region = region_data.properties.infected.per_day;
                let recovered_today_in_region = region_data.properties.recovered.per_day;
                let dead_today_in_region = region_data.properties.dead.per_day;
                let contentString = `<h1 class="regionName">${region_name}</h1><div class="textInfAboutRegion"><p>1) Все выявленные: ${all_recovered_in_region}</p><p>2) Все смерти: ${all_dead_in_region}</p><p>3) Все выздоровевшие: ${all_infected_in_region}</p><p>4) Летальность: ${Math.round(mortality*10)/10}%</p><p>5) Заражений в день: ${infected_today_in_region}</p><p>6) Смертей в день: ${dead_today_in_region}</p><p>7) Выздоровлений в день: ${recovered_today_in_region}</p></div><a href="https://www.google.com/search?q=коронавирус+${region_name.replace(/ /g, '+')}&tbm=nws" target="_blank" class="regionNewsCOVID">Новости региона</a>`

                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });

                infowindow.setPosition(region_coordinates)

                region_circle.addListener("click", () => {
                    infowindow.open(map, region_circle);
                });

                if (annyang) {
                    let corrected_region_name = region_name.replace("обл.", "область").replace("АО", "автономный округ");
                    voice_assistant_commands[corrected_region_name] = () => {
                        map.panTo(region_coordinates);
                        map.setZoom(8);
                    }
                }

            }

            if (annyang) {
                voice_assistant_commands["Регион с наибольшим количеством инфицированных"] = () => {
                    map.panTo(coords_region_with_max_infected);
                    map.setZoom(8);
                }

                voice_assistant_commands["Регион с наибольшим количеством погибших"] = () => {
                    map.panTo(coords_region_with_max_dead);
                    map.setZoom(8);
                }

                voice_assistant_commands["Регион с наибольшим количеством выздоровевших"] = () => {
                    map.panTo(coords_region_with_max_recovered);
                    map.setZoom(8);
                }

                voice_assistant_commands["Самый опасный регион"] = () => {
                    map.panTo(coords_region_with_max_mortality);
                    map.setZoom(8);
                }

                annyang.addCommands(voice_assistant_commands);
            }

            let data_for_chart = {
                datasets: [{
                    data: [all_infected_in_russia, all_recovered_in_russia, all_dead_in_russia],
                    backgroundColor: [
                                'rgb(234, 175, 88)',
                                'rgb(116, 210, 116)',
                                'rgb(221, 76, 76)'
                            ],
                    hoverBackgroundColor: [
                                'rgb(238, 169, 66)',
                                'rgb(98, 208, 98)',
                                'rgb(213, 67, 67)'
                            ],
                    borderWidth: 1,
                    borderColor: 'rgba(138, 191, 181, 0.25)',
                        }],
                labels: [
                            'зараженных',
                            'выздоровевших',
                            'погибших'
                        ],
            };

            var chart_coronavirus_for_russia = new Chart(charts_for_russia, {
                type: 'doughnut',
                data: data_for_chart,
                options: {
                    legend: {
                        labels: {
                            fontColor: 'rgba(138, 191, 181)',
                            fontFamily: "Mont Heavy",
                        },
                        position: 'right'
                    },
                }
            });
        });

    } else {
        console.log('Сетевой запрос для json не получил ответа' + response.status + ': ' + response.statusText);
    }
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        minZoom: 3,
        center: new google.maps.LatLng(66.788889, 93.775278),
        mapId: "79922c147f78d817",
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
}
