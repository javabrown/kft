define(function(require, exports, module){

    var $        = require('jquery'),
        Family   = require('fskytree/view/family'),
        Member   = require('fskytree/view/member');
        Node     = require('fskytree/view/node');
        Geometry = require('fskytree/component/geometry');

    /**
     * @class Node
     * @classdesc Family/Member encapsulation "class".
     */
    var Node = function(tree, data, options)
    {
        /**
         * ...
         * @type {Node}
         */
        var _self;

        /**
         * @type {Object} Object containing component setting values
         */
        this.settings = {
            debug: false,
            height: 180
        };

        /**
         * @type {Number} Node x position on canvas
         */
        this.x = 0;

        /**
         * @type {Number} Node y position on canvas
         */
        this.y = 0;

        /**
         * @type {Number} Node width
         */
        this.width;

        /**
         * @type {Number} Node height
         */
        this.height;

        /**
         * @type {Number} Children nodes total width
         */
        this.cwidth;

        /**
         * @type {Member|Family} Member or Family view
         */
        this.view;

        /**
         * @type {Node} Parent node
         */
        this.parent;

        /**
         * @type {Array} Child nodes
         */
        this.children = [];

        /**
         * @type {Geometry.Point} Node connection point
         */
        this.cPoint;

        /**
         * Constructor.
         *
         * @constructs Node
         */
        function construct(data, options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            /**
             * Create family view if node data has "children" or "partner" property is set,
             * otherwise create single member node.
             */
            if (data.children || data.partner) {
                _self.view = new Family(_self, data);
            } else {
                _self.view = new Member(_self, data.member);
            }
        }

        /**
         * Get node width which can be used to calculate
         * node position on canvas.
         *
         * @returns {Number} Node width in pixels
         */
        this.getWidth = function()
        {
            return _self.view.getWidth();
        };

        /**
         * Get node height which can be used to calculate
         * node position on canvas.
         *
         * @returns {Number} Node height in pixels
         */
        this.getHeight = function()
        {
            return _self.settings.height;
        };

        /**
         * Get node connection point position.
         * This value will later be used to draw children group line.
         *
         * @returns {Geometry.Point} Object containing x, y properties
         */
        this.getCPoint = function(node)
        {
            //Get view middle point
            var mPoint = _self.view.getMPoint();

            return new Geometry.Point(
                mPoint.x,
                _self.y
            );
        };

        /**
         * Get tree instance.
         *
         * @returns {Tree} Tree instance
         */
        this.getTree = function()
        {
            return tree;
        };

        /**
         * Set current node parent.
         *
         * @param {Node} parent Parent node instance
         * @returns {Node} Current node instance
         */
        this.setParent = function(parent)
        {
            _self.parent = parent;

            return this;
        };

        /**
         * Add child node to current node children.
         *
         * @param {Node} child Child node instance
         * @returns {Node} Current node instance
         */
        this.addChild = function(child)
        {
            child.setParent(_self);

            _self.children.push(child);

            return this;
        };

        /**
         * Check whether current node has any children.
         *
         * @returns {Boolean} Whether current node has any children
         */
        this.hasChildren = function()
        {
            return _self.children.length > 0;
        };

        /**
         * Check whether current node has parent.
         *
         * @returns {Boolean} Whether current node has parent
         */
        this.hasParent = function()
        {
            return _self.parent != undefined;
        };

        /**
         * Get node type by view instance.
         *
         * @returns {Number} Node type
         */
        this.getType = function()
        {
            return (_self.view instanceof Family)? Node.TYPE_FAMILY : Node.TYPE_MEMBER;
        };

        /**
         * Render current node view.
         *
         * @param {Raphael.Paper} Canvas instance
         * @return {Node} Node instance
         */
        this.render = function(canvas)
        {
            //Draw parents line
            if (_self.hasParent()) {
                _self.drawParentsLine(canvas);
            }

            //Draw debug bounding box
            if (_self.settings.debug) {
                _self.drawBBox(canvas);
            }

            //Render node view elements
            _self.view.render(canvas);

            return this;
        };

        /**
         * Draw node bounding box.
         * This is used for debug purposes only.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawBBox = function(canvas)
        {
            var box    = canvas.rect();
            var width  = _self.getWidth();
            var height = _self.getHeight();

            box.attr({
                'stroke-dasharray': '- ',
                'x': _self.x + 0.5 - (width / 2),
                'y': _self.y + 0.5,
                'width':  width,
                'height': height,
                'stroke': (_self.getType() == Node.TYPE_MEMBER)? '#000' : '#CECECE'
            });

            var label = canvas.text();

            label.attr({
                'text-anchor': 'start',
                'font-size': 9,
                'fill': '#000',
                'text': 'x:' + _self.x + '\ny:' + _self.y + '\nw:' + width,
                'x': _self.x - (width / 2) + 5,
                'y': _self.y + 20
            });

            return box;
        };

        /**
         * Draw parents connector line.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawParentsLine = function(canvas)
        {
            var line = canvas.path();

            var mPoint = _self.view.getMPoint();
            var cPoint = _self.getCPoint();

            line.attr({
                'path': 'M' + mPoint.x + ' ' + mPoint.y + ', ' + cPoint.x + ' ' + cPoint.y,
                'stroke': '#2B3F74',
                'stroke-width': 2
            });

            return line;
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(data, options);
    };

    /**
     * Class constants.
     */
    Node.TYPE_MEMBER = 1;
    Node.TYPE_FAMILY = 2;

    return Node;

});
