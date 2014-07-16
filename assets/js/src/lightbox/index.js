var fs = require('fs');
var html = fs.readFileSync(__dirname + '/template.html', 'utf8');
var hyperspace = require('hyperspace');

module.exports = function lightbox () {
    var self = {},
        body_sel = d3.select('body'),
        current_lightbox;

    var hs = hyperspace(html, function (row) {
        return {
            '.lightbox-image': {
                src: row.src
            }
        };
    });

    self.initialize = function () {
        d3.selectAll('a[data-lightbox]')
            .on('click', function () {
                d3.event.preventDefault();
                var clicked = d3.select(this);
                var image_src = clicked.attr('href');
                self.render({ src: image_src });
            });

        d3.select(window)
            .on('resize', function () {
                set_lightbox_wrapper_dimensions(current_lightbox);
            });
    };

    self.render = function (data) {
        hs.on('element', function (element) {
            current_lightbox = element;
            set_lightbox_wrapper_dimensions(element);

            d3.select(element)
                .on('click', function () {
                    close(element);
                });
        });
        hs.appendTo('body')
            .write(data);

        body_sel.classed('lightbox-open', true);
    };

    function close (element) {
        d3.select(element).remove();
        body_sel.classed('lightbox-open', false);
        current_element = undefined;
    }

    function set_lightbox_wrapper_dimensions (element) {
        if (!element) return;
        var wrapper = d3.select(element).select('.lightbox-wrapper');
        wrapper.style('width', window.innerWidth + 'px');
        wrapper.style('height', window.innerHeight + 'px');
    }

    return self;
};