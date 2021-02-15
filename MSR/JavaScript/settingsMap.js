function initMap() {
    var myLatLng = {
        lat: 52.29035
        , lng: 104.28253
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng
        , zoom: 16
        , styles: [
            {
                elementType: 'geometry'
                , stylers: [{
                    color: '#242f3e'
                                    }]
                                }
                                , {
                elementType: 'labels.text.stroke'
                , stylers: [{
                    color: '#242f3e'
                                    }]
                                }
                                , {
                elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#746855'
                                    }]
                                }
                                , {
                featureType: 'administrative.locality'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#d59563'
                                    }]
            }
                                , {
                featureType: 'poi'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#d59563'
                                    }]
            }
                                , {
                featureType: 'poi.park'
                , elementType: 'geometry'
                , stylers: [{
                    color: '#263c3f'
                                    }]
            }
                                , {
                featureType: 'poi.park'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#6b9a76'
                                    }]
            }
                                , {
                featureType: 'road'
                , elementType: 'geometry'
                , stylers: [{
                    color: '#38414e'
                                    }]
            }
                                , {
                featureType: 'road'
                , elementType: 'geometry.stroke'
                , stylers: [{
                    color: '#212a37'
                                    }]
            }
                                , {
                featureType: 'road'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#9ca5b3'
                                    }]
            }
                                , {
                featureType: 'road.highway'
                , elementType: 'geometry'
                , stylers: [{
                    color: '#746855'
                                    }]
            }
                                , {
                featureType: 'road.highway'
                , elementType: 'geometry.stroke'
                , stylers: [{
                    color: '#1f2835'
                                    }]
            }
                                , {
                featureType: 'road.highway'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#f3d19c'
                                    }]
            }
                                , {
                featureType: 'transit'
                , elementType: 'geometry'
                , stylers: [{
                    color: '#2f3948'
                                    }]
            }
                                , {
                featureType: 'transit.station'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#d59563'
                                    }]
            }
                                , {
                featureType: 'water'
                , elementType: 'geometry'
                , stylers: [{
                    color: '#17263c'
                                    }]
            }
                                , {
                featureType: 'water'
                , elementType: 'labels.text.fill'
                , stylers: [{
                    color: '#515c6d'
                                    }]
            }
                                , {
                featureType: 'water'
                , elementType: 'labels.text.stroke'
                , stylers: [{
                    color: '#17263c'
                                    }]
            }
          ]
    , });
    var marker1 = new google.maps.Marker({
        map: map
        , position: {
            lat: 52.287783
            , lng: 104.280729
        }
        , icon: 'image/flag.svg'
        , animation: google.maps.Animation.DROP
    });
    var marker2 = new google.maps.Marker({
        map: map
        , position: {
            lat: 52.292917
            , lng: 104.284331
        }
        , icon: 'image/flag.svg'
        , animation: google.maps.Animation.DROP
    });
    infowindow1 = new google.maps.InfoWindow({
        content: '<p class="textMarker">Сквер им. Кирова:</p><audio controls><source src="music/Scv/Scv.ogg" type="audio/ogg"> <source src="music/Scv/Scv.mp3" type="audio/mpeg"></audio>'
    });
    infowindow2 = new google.maps.InfoWindow({
        content: '<p class="textMarker">Нижняя набережная Ангары:</p><audio controls><source src="music/Nab/Nab.ogg" type="audio/ogg"> <source src="music/Nab/Nab.mp3" type="audio/mpeg"></audio>'
    });
    marker1.addListener('click', function () {
        infowindow1.open(map, marker1);
    });
    marker2.addListener('click', function () {
        infowindow2.open(map, marker2);
    });
}