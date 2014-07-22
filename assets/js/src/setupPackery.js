var imagesLoaded = require('imagesloaded');

module.exports = function SetupPackery () {
    var self = {},
        selector = '.packery-container';

    self.selector = function (x) {
        if (!arguments.length) return selector;
        selector = x;
        return self;
    };

    self.initialize = function () {
        var container = document.querySelector(selector);

        if (!container) return;

        imagesLoaded(container, function () {
            var pckry = new Packery( container, {
              // options
              // columnWidth: 200,
              itemSelector: '.item'
            });


            pckry.getItemElements().forEach(function (item) {
                var draggie = new Draggabilly(item);
                pckry.bindDraggabillyEvents(draggie);
            });
        });

        return self;
    };

    return self;
};