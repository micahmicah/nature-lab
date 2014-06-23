// write JavaScript here

$(window).scroll(function(){
	if($(window).scrollTop()>10){
		$('.main-nav').addClass('drawer');
	} else if($(window).scrollTop()<20){
		$('.main-nav').removeClass('drawer');
	}
});

console.log($('p').text());

$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });
});