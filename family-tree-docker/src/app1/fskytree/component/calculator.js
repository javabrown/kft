define(function(require, exports, module){

    var $        = require('jquery'),
        Member   = require('fskytree/view/member');
        Node     = require('fskytree/view/node');

    /**
     * @class Calculator
     * @classdesc Tree dimensions and position calculator.
     */
    var Calculator = function(tree, options)
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
         * Constructor.
         *
         * @constructs Calculator
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Calculate nodes position and dimensions
            $(tree).on('tree/built', _self.calculate);
        }

        /**
         * Calculate and populate node and its siblings
         * dimension and position values.
         *
         * @param {jQuery.Event} node Event instance
         * @param {Node} node Node instance
         */
        this.calculate = function(e, node)
        {
            _self.calcDimension(node);

            //Notify tree that root node dimensions successfuly calculated.
            $(tree).trigger('tree/calculate/dimension');

            //Do your magic...
            _self.calcRootPosition(node);
            _self.calcPosition(node);

            //Notify tree that root node position is calulcated and ready to be rendered
            $(tree).trigger('tree/ready', [node]);
        };

        /**
         * Calculate and populate node and it siblings width and height properties.
         * These values will later be used to calcaulate node position.
         *
         * @return {Object} Object containing width and hight properties
         */
        this.calcDimension = function(node)
        {
            var width   =  0;
            var cwidth  =  0;
            var heights = [0];

            if (node.hasChildren()) {

                for (var i=0;i<node.children.length;i++) {

                    var dimentions = _self.calcDimension(node.children[i]);

                    width  += dimentions.width; //Sum child nodes width on all levels down
                    cwidth += node.children[i].width; //Sum child nodes width only on direct children nodes(1 level down)

                    heights.push(dimentions.height + node.getHeight());
                }

            } else {
                heights.push(node.getHeight());
            }

            /**
             * Use current node width as result value
             * if its children total width is less then current node.
             */
            if (width < node.getWidth()) {
                width = node.getWidth();
            }

            /**
             * Add additional pixels to prevent brother/sister level nodes
             * from overlaping with current family node.
             * This may happen because family node connection point is not centered.
             */
            if (node.getType() == Node.TYPE_FAMILY) {
                width += 40;
            }

            //Set current node dimensions
            node.cwidth = cwidth;
            node.width  = width;
            node.height = Math.max.apply(Math, heights);

            /**
             * Return dimensions. This is needed to correctly calculate
             * children nodes total width and height values.
             */
            return {
                width:  node.width,
                height: node.height
            };
        };

        /**
         * Calculate and populate root node x, y properties.
         * Resulting position values depend on container width and height.
         */
        this.calcRootPosition = function(node)
        {
            node.x = tree.container.width() / 2;
            node.y = (tree.container.height() - node.height + 45) / 2;
        };

        /**
         * Calculate and populate root node siblings
         * x, y position values.
         *
         * @param {Node} node Node instance
         */
        this.calcPosition = function(node)
        {
            var x0 = node.x - (node.width / 2); //Left margin x position of the first row node.

            if (node.cwidth < node.width) {
                x0 = ((node.width - node.cwidth) / 2) + (node.x - (node.width / 2));
            }

            for (var i=0;i<node.children.length;i++) {

                var child = node.children[i];

                child.x = x0 + (child.width / 2);
                child.y = node.y + node.getHeight();

                /**
                 * Move family node x position left or right depending
                 * on its member gender. This is necessary because family
                 * node connection point is not centered by design.
                 */
                if (child.getType() == Node.TYPE_FAMILY) {
                    child.x = child.x + 40 * ((child.view.member.sex == Member.SEX_MALE)? 1 : -1);
                }

                x0 += child.width;
            }

            //Walk deeper
            for (var i=0;i<node.children.length;i++) {
                _self.calcPosition(node.children[i]);
            }
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    return Calculator;

});
