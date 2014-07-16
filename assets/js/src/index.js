// write JavaScript here

// $(window).scroll(function(){
// 	if($(window).scrollTop()>10){
// 		$('.main-nav').addClass('drawer');
// 	} else if($(window).scrollTop()<20){
// 		$('.main-nav').removeClass('drawer');
// 	}
// });

var Lightbox = require('./lightbox')();

function setupFlexslider () {
    if (!$('.flexslider').length) return;

    $('.flexslider').flexslider({
      animation: "slide"
    });
}

function setupHidingNavOnScroll () {
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.main-nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.main-nav').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.main-nav').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
}

function setupPackery () {
    var container = document.querySelector('.packery-container');

    if (!container) return;

    var pckry = new Packery( container, {
      // options
      // columnWidth: 200,
      itemSelector: '.item'
    });

    pckry.getItemElements().forEach(function (item) {
        var draggie = new Draggabilly(item);
        pckry.bindDraggabillyEvents(draggie);
    });
}

function NatureLab() {
    var self = {};

    // Set up all pages
    self.initialize = function () {
        setupHidingNavOnScroll();
        setupFlexslider();
        setupPackery();
        Lightbox.initialize();

        return self;
    };

    return self;
}

var site = NatureLab().initialize();
