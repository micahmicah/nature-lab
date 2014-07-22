module.exports = function SetupFlexslider () {
    var self = {},
        selector = '.flexslider';

    self.selector = function (x) {
        if (!arguments.length) return selector;
        selector = x;
        return self;
    };

    self.initialize = function () {
        if (!$(selector).length) return;

        $(selector).flexslider({
          animation: "slide"
        });

        return self;
    };

    return self;
};