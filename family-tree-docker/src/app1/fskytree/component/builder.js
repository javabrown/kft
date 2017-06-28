define(function(require, exports, module){

    var $    = require('jquery'),
        Node = require('fskytree/view/node');

    /**
     * @class Builder
     * @classdesc Tree builder "class" is responsible for parsing JSON tree data.
     */
    var Builder = function(tree, options)
    {
        /**
         * @type {Builder}
         */
        var _self;

        /**
         * @type {Object} Object containing component setting values
         */
        this.settings = {

        };

        /**
         * Constructor.
         *
         * @constructs Builder
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Build tree root node after tree data is loaded
            $(tree).on('tree/load', _self.build);
        }

        /**
         * Build root node from JSON tree data.
         *
         * @param {jQuery.Event} Event instance
         * @param {Object} data JSON tree data
         * @return {Builder} Builder instance
         */
        this.build = function(e, data)
        {
            tree.root = _self.walk(data);

            //Notify that root tree node structure has been built
            $(tree).trigger('tree/built', [tree.root]);

            return this;
        };

        /**
         * Recursively walk JSON data.
         *
         * @param {Object} data JSON node data
         * @return {Node} Tree node instance
         */
        this.walk = function(data)
        {
            var node = new Node(tree, data);

            if (data.children) {
                for (var i=0;i<data.children.length;i++) {
                    node.addChild(_self.walk(data.children[i]));
                }
            }

            //Set currently selected node
            if (data.member.current) {
                tree.current = node;
            }

            return node;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    return Builder;

});
