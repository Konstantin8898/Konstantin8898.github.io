// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15
    });
    myMap.setType('yandex#hybrid');
    myMap.balloon.open([55.680722, 37.484559], {
        contentHeader: 'Ад',
        contentBody: 'Умру попаду сюда'
    });
    var myPlacemark = new ymaps.Placemark([55.7, 37.6], {
            balloonContentHeader: 'Однажды',
            balloonContentBody: 'В студеную зимнюю пору',
            balloonContentFooter: 'Мы пошли в гору',
            hintContent: 'Зимние происшествия'
        },
        {preset: 'islands#redDotIcon'});

    myMap.geoObjects.add(myPlacemark);

    var myPolyline = new ymaps.Polyline([
            [55.86, 37.84],
            [55.70, 37.55],
            [55.8, 37.4]
        ], {},
        {
            strokeWidth: 6,
            strokeColor: '#ff5fe3'
        });

    myMap.geoObjects.add(myPolyline);
    myPolyline.editor.startEditing();

    // myMap.hint.open([55.76, 37.38], 'Кто <em>поднимается</em> в гору?');
}

