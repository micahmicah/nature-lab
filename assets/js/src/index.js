// write JavaScript here

// $(window).scroll(function(){
// 	if($(window).scrollTop()>10){
// 		$('.main-nav').addClass('drawer');
// 	} else if($(window).scrollTop()<20){
// 		$('.main-nav').removeClass('drawer');
// 	}
// });

var SetupHidingNavOnScroll = require('./setupHidingNavOnScroll')();
var SetupPackery = require('./setupPackery')();
var SetupFlexslider = require('./setupFlexslider')();
var Lightbox = require('./lightbox')();

function NatureLab() {
    var self = {};

    // Set up all pages
    self.initialize = function () {
        SetupHidingNavOnScroll.initialize();
        SetupFlexslider.initialize();
        SetupPackery.initialize();
        Lightbox.initialize();

        return self;
    };

    return self;
}

var site = NatureLab().initialize();
