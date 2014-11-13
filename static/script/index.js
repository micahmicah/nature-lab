// write JavaScript here



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
