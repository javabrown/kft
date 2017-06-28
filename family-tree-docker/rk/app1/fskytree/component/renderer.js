define(function(require, exports, module){

    var $       = require('jquery');
    var Raphael = require('raphael');

    require('vendor/raphael.ext');

    /**
     * @class Renderer
     * @classdesc Tree renderer.
     */
    var Renderer = function(tree, options)
    {
        /**
         * ...
         * @type {FskyTree}
         */
        var _self;

        /**
         * @type {Object} Object containing component setting values
         */
        this.settings = {

        };

        /**
         * @type {Raphael.Paper} Tree canvas
         */
        this.canvas;

        /**
         * Constructor.
         *
         * @constructs Loader
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Initialize canvas when tree position is fully calculated
            $(tree).on('tree/calculate/dimension', _self.initCanvas);
        }

        /**
         * Initialize raphael canvas.
         *
         * @returns {Renderer} Renderer instance
         */
        this.initCanvas = function()
        {
            //Remove any previous canvas instances
            if (_self.canvas) {
                _self.canvas.remove();
            }

            //Set tree container dimensions
            _self.resizeContainer();

            //Create canvas
            _self.canvas = Raphael(tree.container[0]);

            //Notify that canvas is ready to be painted on
            $(tree).trigger('tree/canvas/ready', [_self]);

            return this;
        };

        /**
         * Render tree root node.
         *
         * @returns {Renderer} Renderer instance
         */
        this.render = function()
        {
            _self.walk(tree.root);

            //Notify that tree had finished rendering
            $(tree).trigger('tree/render');

            return this;
        };

        /**
         * Recursively render root node and all of its siblings.
         *
         * @param {Node} Target node instance
         */
        this.walk = function(node)
        {
            for (var i=0;i<node.children.length;i++) {
                _self.walk(node.children[i]);
            }

            node.render(_self.canvas);
        };

        /**
         * Resize tree container to fit tree.
         *
         * @returns {Renderer} Renderer instance
         */
        this.resizeContainer = function()
        {
            var width  = tree.root.width  * 2.5;
            var height = tree.root.height * 2.5;

            var wWidth  = tree.wrapper.width();
            var wHeight = tree.wrapper.height();

            tree.container.css({
                width:  (width < wWidth)? wWidth + tree.root.width + 90 : width,
                height: (height < wHeight)? wHeight + tree.root.height + 90 : height
            });

            return this;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    return Renderer;

});
