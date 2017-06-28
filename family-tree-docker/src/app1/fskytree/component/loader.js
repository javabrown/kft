define(function(require, exports, module){

    var $ = require('jquery');

    /**
     * @class Loader
     * @classdesc Tree loader. This "class" is responsible for loading tree data files.
     */
    var Loader = function(tree, options)
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
            loadingClass: 'loading'
        };

        /**
         * Constructor.
         *
         * @constructs Loader
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);
        }

        /**
         * Load tree data file.
         *
         * @return {Loader} Loader isntance
         */
        this.load = function(url, data)
        {
            _self.showLoader();

            $.getJSON(url, data)
                .done(_self.doneHandler)
                .fail(_self.failHandler)
                .always(_self.hideLoader);

            return this;
        };


        /**
         * Executed on load success.
         */
        this.doneHandler = function(data)
        {
            $(tree).trigger('tree/load', [data]);
        };

        /**
         * Executed on load error.
         */
        this.failHandler = function()
        {
            $(tree).trigger('tree/error', ['Error loading tree data file.']);
        };

        /**
         * Show animated loader image.
         *
         * @return {Loader} Loader isntance
         */
        this.showLoader = function()
        {
            //Add loading class to tree wrapper
            tree.wrapper.addClass(_self.settings.loadingClass);

            return this;
        };

        /**
         * Hide animated loader image.
         *
         * @return {Loader} Loader isntance
         */
        this.hideLoader = function()
        {
            //Remove loading class from tree wrapper
            tree.wrapper.removeClass(_self.settings.loadingClass);

            return this;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    return Loader;

});
