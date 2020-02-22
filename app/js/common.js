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

