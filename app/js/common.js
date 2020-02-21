$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
});

var swiper = new Swiper(".swiper-container", {
  spaceBetween: 70,
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
