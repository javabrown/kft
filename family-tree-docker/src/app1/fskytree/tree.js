define(function(require, exports, module){

    var $          = require('jquery');
        Loader     = require('fskytree/component/loader'),
        Builder    = require('fskytree/component/builder'),
        Calculator = require('fskytree/component/calculator'),
        Scrolling  = require('fskytree/component/scrolling'),
        Renderer   = require('fskytree/component/renderer');

    /**
     * @class FskyTree
     * @classdesc Core fsky tree class.
     */
    var FskyTree = function(options){

        /**
         * @type {FskyTree}
         */
        var _self;

        /**
         * @type {Object} Object containing main tree setting values.
         */
        this.settings = {
            id:             'fskytree-wrapper',
            containerClass: 'fskytree-container',
            handler:        'tree.json',
            debug: false
        };

        /**
         * @type {Object} Object containing connected plugins
         */
        this.plugin = {};

        /**
         * @type {Node} Tree root node instance
         */
        this.root;

        /**
         * @type {Node} Currently selected node
         */
        this.current;

        /**
         * @type {Calculator} Tree calculator component instance
         */
        this.calculator;

        /**
         * @type {Loader} Tree loader component instance
         */
        this.loader;

        /**
         * @type {Renderer} Tree renderer component instance
         */
        this.renderer;

        /**
         * @type {Scrolling} Tree scrolling component instance
         */
        this.scrolling;

        /**
         * @type {jQuery} Tree wrapper dom element
         */
        this.wrapper;

        /**
         * @type {jQuery} Tree container dom element
         */
        this.container;

        /**
         * Constructor.
         *
         * @constructs Tree
         */
        function construct(options)
        {
            //Extend core settings with specified options
            $.extend(_self.settings, options);

            //Set tree viewport dom elements
            _self.wrapper   = $('#' + _self.settings.id);
            _self.container = _self.wrapper.find('.' + _self.settings.containerClass);

            //Init. core components
            _self.loader     = new Loader(_self);
            _self.builder    = new Builder(_self);
            _self.calculator = new Calculator(_self);
            _self.scrolling  = new Scrolling(_self);
            _self.renderer   = new Renderer(_self);
        }

        /**
         * Load tree data file.
         *
         * @param  {Function} plugin  Plugin "class" function
         * @param  {Object} options Plugin options
         * @returns {Tree} Tree instance
         */
        this.load = function(url, data)
        {
            _self.loader.load(url, data);

            return this;
        };

        /**
         * Draw tree on canvas.
         *
         * @returns {Tree} Tree instance
         */
        this.render = function()
        {
            _self.renderer.render();

            return this;
        };

        /**
         * Attaches a plugin to the tree instance.
         *
         * @param  {Function} plugin  Plugin "class" function
         * @param  {Object} options Plugin options
         * @returns {Tree} Tree instance
         */
        this.plugin = function(plugin, options)
        {
            _self.plugin[plugin.PLUGIN_NAME] = new plugin(_self, options);

            return this;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);

    };

    return FskyTree;

});
