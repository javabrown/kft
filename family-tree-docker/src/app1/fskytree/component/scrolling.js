define(function(require, exports, module){

    var $ = require('jquery');
            require('vendor/scrollto');
            require('vendor/kinetic');

    /**
     * @class Scrolling
     * @classdesc This "class" function provides tree scrolling functionality.
     */
    var Scrolling = function(tree, options)
    {
        /**
         * @type {Scrolling}
         */
        var _self;

        /**
         * @type {Object} Object containing component setting values
         */
        this.settings = {
            speed: 500
        };

        /**
         * ...
         * @constructs Scrolling
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Initialize scrolling
            $(tree).on('tree/calculate/dimension', _self.initScroll);
            $(tree).on('tree/render',  _self.scrollToCurrent);
        }

        /**
         * Initialize kinetic scrolling plugin.
         *
         * @returns {Scrolling} Scrolling component instance
         */
        this.initScroll = function()
        {
            //Resize container to enable scrolling
            tree.container.height(tree.root.height * 2);
            tree.container.width(tree.root.width * 2);

            //Initialize kinetic
            tree.wrapper.kinetic();

            return this;
        };

        /**
         * Scroll tree to root node.
         *
         * @returns {Scrolling} Scrolling component instance
         */
        this.scrollToRoot = function()
        {
            _self.scrollTo(tree.root);

            return this;
        };

        /**
         * Scroll tree to currently selected node if any set,
         * otherwise scroll to root node.
         *
         * @returns {Scrolling} Scrolling component instance
         */
        this.scrollToCurrent = function()
        {
            if (!tree.current) {
                _self.scrollToRoot();
            } else {
                _self.scrollTo(tree.current);
            }

            return this;
        };

        /**
         * Scroll tree to specified node.
         *
         * @param {Node} Target node isntance
         * @param {Number|null} Scroll speed
         * @param {Function} Callback to be triggered after scroll ends
         * @returns {Scrolling} Scrolling component instance
         */
        this.scrollTo = function(node, speed, callback)
        {
            var mPoint = node.view.getMPoint();

            var top  = mPoint.y - (tree.wrapper.height() / 2);
            var left = mPoint.x - (tree.wrapper.width()  / 2);

            tree.wrapper.scrollTo({top: top, left: left}, speed, {
                onAfter: callback
            });

            return this;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    return Scrolling;

});
