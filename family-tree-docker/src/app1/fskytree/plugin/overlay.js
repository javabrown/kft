define(function(require, exports, module){

    var $ = require('jquery');

    /**
     * @class Overlay
     * @classdesc Overlay "class" is responsible for displaying overlay layer.
     */
    var Overlay = function(tree, options)
    {
        /**
         * @type {Overlay} Overlay plugin instance
         */
        var _self;

        /**
         * @type {jQuery} jQuery wrapped overlay dom element
         */
        this.container;

        /**
         * @type {Object} Object containing plugin setting values
         */
        this.settings = {
            id: 'fskytree-overlay',
            closeText: 'Закрыть'
        };

        /**
         * Constructor.
         *
         * @constructs Overlay
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Attach overlay to document body
            _self.initOverlay();
        }

        /**
         * Initialize overlay dom element.
         *
         * @returns {Overlay} Overlay plugin instance
         */
        this.initOverlay = function()
        {
            //Create overlay dom element
            _self.container = _self.createOverlay();

            //Attach overlay to document body
            _self.container.appendTo($(document.body));

            //Hide popup if user pressed ESC.
            $(document.body).keyup(function(e){
                if (e.which == 27) {
                    _self.hide();
                }
            });

            return this;
        };

        /**
         * Show overlay layer.
         *
         * @returns {Overlay} Overlay plugin instance
         */
        this.show = function()
        {
            //Show overlay container
            _self.container.show();

            return this;
        };

        /**
         * Hide overlay layer.
         *
         * @returns {Overlay} Overlay plugin instance
         */
        this.hide = function()
        {
            //Hide overlay container
            _self.container.hide();

            //Notify other components that overlay is hidden
            $(_self).trigger('overlay/hide');

            return this;
        };

        /**
         * Create overlay DOM element.
         *
         * @returns {jQuery} jQuery wrapped DOM element
         */
        this.createOverlay = function()
        {
            var close   = $('<a href="#" class="close"> ' + _self.settings.closeText + '</a>');
            var overlay = $('<div id="' + _self.settings.id + '"></div>');

            close.click(_self.hide); //Bind close event handler
            close.appendTo(overlay); //Append button to verlay

            return overlay;
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    /**
     * Class constants.
     */
    Overlay.PLUGIN_NAME = 'overlay';

    return Overlay;

});
