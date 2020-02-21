$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
});

var swiper = new Swiper(".swiper-container", {
	spaceBetween: 70,
	effect: "fade",
	width: 543,
	speed: 900,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	breakpoints: {
		'@0.00': {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		'@0.75': {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		'@1.00': {
			slidesPerView: 3,
			spaceBetween: 40,
		},
		'@1.50': {
			slidesPerView: 4,
			spaceBetween: 50,
		},
	}
});
