(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// write JavaScript here

// $(window).scroll(function(){
// 	if($(window).scrollTop()>10){
// 		$('.main-nav').addClass('drawer');
// 	} else if($(window).scrollTop()<20){
// 		$('.main-nav').removeClass('drawer');
// 	}
// });

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
      columnWidth: 200,
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

        return self;
    };

    return self;
}

var site = NatureLab().initialize();

},{}]},{},[1])