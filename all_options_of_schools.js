function interval() {
    setTimeout(function() {
        markerI.closePopup();
    }, 2500);
}

function interval1() {
    setTimeout(function() {
        markerI.remove();
    }, 5000);
}

function openmarker() {
    map.setView([55.56398440318658, 38.19972654387523], 14);
    markerI.addTo(map).openPopup();
    interval();
    interval1();
}
var text = document.getElementById('text');;


//описание будущего объекта карты

var corner1 = L.latLng(55.82682763521277, 37.32477163515004),
    corner2 = L.latLng(55.07223164099382, 39.07568646253174),
    bounds = L.latLngBounds(corner1, corner2);

var mapOptions = {
    attributionControl: false,

}
//создание и контроль зума карты
var map = L.map('map', {
    zoomControl: false,
    minZoom: 7,
    maxZoom: 18,
    maxBounds: bounds
}).setView([55.5650841462759, 38.22562614947066], 13, mapOptions);
var map1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



//добавление функций (полн.экр, зуумконтроль и т.д)

//полный экран
L.control.fullscreen({
    position: 'topleft',
    title: 'Приблизить',
    titleCancel: 'Отдалить'
}).addTo(map);
//подпись
var attrOptions = {
    prefix: 'Карта Георгия Панкова',
    position: 'bottomleft'
};
var attr = L.control.attribution(attrOptions);
attr.addTo(map);
//котроль прибилижения
scaleOptions = {
    metric: false,
    updateWhenIdle: true
};
L.control.scale(scaleOptions).addTo(map)

//поиск объектов


if (documentBody.classList.contains('_PC')) {
    var geocoder = L.Control.geocoder({
            defaultMarkGeocode: false,
            placeholder: "Поиск школ...",
            collapsed: false,
            query: "Раменское, школа № ",
            errorMessage: 'попробуйте еще раз...'
        })
        .on('markgeocode', function(e) {
            var bbox = e.geocode.bbox;
            var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest()
            ]);
            map.fitBounds(poly.getBounds());
        })
        .addTo(map);
} else {
    var geocoder = L.Control.geocoder({
            defaultMarkGeocode: false,
            placeholder: "Поиск школ...",
            collapsed: true,
            query: "Раменское, школа № ",
            errorMessage: 'попробуйте еще раз...'
        })
        .on('markgeocode', function(e) {
            var bbox = e.geocode.bbox;
            var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest()
            ]);
            map.fitBounds(poly.getBounds());
        })
        .addTo(map);
}
//зум
if (documentBody.classList.contains('_PC')) {
    L.control.zoom({
        position: 'topleft',
        zoomInTitle: 'Приблизить',
        zoomOutTitle: 'Отдалить'
    }).addTo(map);
}

//многослойность карты
var map2_png = 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
var map3_png = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
var map2 = L.tileLayer(map2_png);
var map3 = L.tileLayer(map3_png);

//настройка зоны пешей доступности
var circleOptions = {
    color: 'green',
    fillColor: 'blue',
    fillOpacity: 0.1
}

var circles_all = L.layerGroup();



//настройка объекта школы

var school_icon_Options = {
    iconUrl: 'my-icon.png',
    iconSize: [50, 50]
}
var school_icon_trueOptions = {
    iconUrl: 'my-icon-true.png',
    iconSize: [50, 50]
}
var school_icon_falseOptions = {
    iconUrl: 'my-icon-false.png',
    iconSize: [50, 50]
}
var school_icon = L.icon(school_icon_Options);
var school_icon_true = L.icon(school_icon_trueOptions);
var school_icon_false = L.icon(school_icon_falseOptions);


var marker_school_trueOptions = {
    title: "Объект: школа",
    icon: school_icon_true
}
var marker_school_falseOptions = {
    title: "Объект: школа",
    icon: school_icon_false
}
var marker_school_Options = {
    title: "Объект: школа",
    icon: school_icon
}

var markers_schools = L.markerClusterGroup();
var markers_schools_false = L.markerClusterGroup();
var markers_schools_true = L.markerClusterGroup();
var markers_schools_without = L.markerClusterGroup();


//создание метки я
var IiconOptions = {
    iconUrl: 'geometka-256x256.png',
    iconSize: [40, 40]
}
var Iicon = L.icon(IiconOptions);
var markerIOptions = {
    title: "Я ",
    clickable: true,
    draggable: false,
    riseOnHover: true,
    icon: Iicon
}
var markerI = L.marker([55.5650841462759, 38.22562614947066], markerIOptions);

markerI.addTo(map);
markerI.bindPopup("Раменское ");
setTimeout(function() {
    markerI.closePopup();
}, 5000);
//подключение слоев к чекбоксу
var mixed = {
    "Метка Раменское ": markerI,
    "Зоны пешей доступности ": circles_all

};
var mixed2 = {
    "Основной слой карты ": map1,
    "Вид со спутника ": map2,
    "Ночная карта ": map3
}
var mixed3 = {
    "Все школы ": markers_schools,
    "Переполненные школы ": markers_schools_false,
    "Непереполненные школы ": markers_schools_true,
    "Без школ ": markers_schools_without
}
if (documentBody.classList.contains('_PC')) {
    var layers1 = L.control.layers(mixed2, mixed, {
        position: 'bottomright',
        collapsed: false
    })
    var layers3 = L.control.layers(mixed3, null, {
        collapsed: false,
        position: 'bottomright',
        hideSingleBase: true
    })
} else {
    var layers1 = L.control.layers(mixed2, mixed, {
        position: 'bottomright',
        collapsed: true
    })
    var layers3 = L.control.layers(mixed3, null, {
        collapsed: true,
        position: 'bottomright',
        hideSingleBase: true
    })
}
layers3.addTo(map);
layers1.addTo(map);
