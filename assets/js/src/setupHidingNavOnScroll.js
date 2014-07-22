module.exports = function SetupHidingNavOnScroll () {
    var self = {},
        selector = '.main-nav',
        state_showing = 'nav-down',
        state_hiding  = 'nav-up';

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight;

    self.selector = function (x) {
        if (!arguments.length) return selector;
        selector = x;
        return self;
    };

    self.classStateShowing = function (x) {
        if (!arguments.length) return state_showing;
        state_showing = x;
        return self;
    };

    self.classStateHiding = function (x) {
        if (!arguments.length) return state_hiding;
        state_hiding = x;
        return self;
    };

    self.initialize = function () {
        if (!$(selector).length) return;

        console.log('init scroll');

        // Hide Header on on scroll down
        navbarHeight = $(selector).outerHeight();

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
                $(selector).removeClass(state_showing).addClass(state_hiding);
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    $(selector).removeClass(state_hiding).addClass(state_showing);
                }
            }
            
            lastScrollTop = st;
        }

        return self;
    };

    return self;
};