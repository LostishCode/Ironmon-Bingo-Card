    $.fn.tdfit = function(options) {
        var settings = $.extend({
            minSize   : 10,
            maxSize   : false
        }, options);

        this.each(function() {
            var $td = $(this);

            var maxSize = parseFloat(settings.maxSize || $td.css('font-size'), 10);
            var width   = $td.width();
            var clone   = $td.data('tdfit-clone'); $td.css('text-align', 'center');

            if (!clone) {
                clone = $('<div></div>', {
                    css : {
                        fontSize     : $td.css('font-size'),
                        fontFamily   : $td.css('font-family'),
                        fontStyle    : $td.css('font-style'),
                        fontWeight   : $td.css('font-weight'),
                        fontVariant  : $td.css('font-variant'),
                        letterSpacing: $td.css('letter-spacing'),
                        whiteSpace   : 'nowrap',
                        position     : 'absolute',
                        left         : '-9999px',
                        visibility   : 'hidden'
                    }
                }).insertAfter($td);

                $td.data('tdfit-clone', clone);
            }

            clone.text($td.text());

            var ratio = width / (clone.width() || 1),
                currentFontSize = parseInt( $td.css('font-size'), 10 ),
                fontSize = Math.floor(currentFontSize * ratio);

            if (fontSize > maxSize) { fontSize = maxSize; }
            if (fontSize < settings.minSize) { fontSize = settings.minSize; }

            $td.css('font-size', fontSize);
            clone.css('font-size', fontSize);
        });

        return this;
    };