$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
});

var swiper = new Swiper(".swiper-container", {
	spaceBetween: 120,
	effect: "slide",
	width: 543,
	speed: 900,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}
});

let btnClose = document.getElementById('filter-close')

$(btnClose).click(function () {
	$('#filter-open').addClass('filter-open-active');
});

$('#filter-close2').click(function () {
	$('#filter-open').addClass('filter-open-active');
});

$('#filter-open-remove').click(function () {
	$('#filter-open').removeClass('filter-open-active');
})


for (let i = 1; i <= 6; i++) {
	$('.rictangle').append('<span class="rictangle__line"></span>');
}

let brand_card_slider = $('.brand-card-banner-slider');
brand_card_slider.owlCarousel({
	loop: false,
	margin: 40,
	responsiveClass: true,
	dots: true,
	nav: false,
	smartSpeed: 800,
	responsive: {
		0: {
			items: 1
		},
		600: {
			items: 1
		},
		1200: {
			items: 3
		}
	}
});

$('#brand-card-slider-arrow-next').click(function (e) {
	e.preventDefault();
	brand_card_slider.trigger('next.owl.carousel');
});

let last_dot = $('.owl-dot:last-child');
$('#brand-card-slider-arrow-next').click(function () {
	if ($(last_dot).hasClass('active')) {
		$(this).hide();
	}
});


ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [43.294951, 76.987059],
		zoom: 23
	}, {
		searchControlProvider: 'yandex#search'
	}),

		// // Создаём макет содержимого.
		// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		// 	'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		// ),

		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'Местонахождение OrangeTrading',
			balloonContent: 'Приветствуем Вас'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
				iconImageHref: 'img/contacts/yandex-marker.png',
			// Размеры метки.
			iconImageSize: [30, 42],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-16, -42]
		});

	myMap.geoObjects.add(myPlacemark);
});