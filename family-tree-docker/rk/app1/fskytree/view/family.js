define(function(require, exports, module){

    var $      = require('jquery'),
        Member = require('fskytree/view/member');

    /**
     * @class Family
     * @classdesc This "class" function contains methods for rendering family node.
     */
    var Family = function(node, data, options)
    {
        /**
         * ...
         * @type {Family}
         */
        var _self;

        /**
         * @type {Object} Object containing current object setting values
         */
        this.settings = {
            dWidth:  170, //Default width
            eWidth:  350  //Extended width, when node has parents and children set
        };

        /**
         * @type {Node} Member node instance
         */
        this.member;

        /**
         * @type {Node} Partner node instance
         */
        this.partner;

        /**
         * @type {Node} Node instance
         */
        this.node = node;

        /**
         * Constructor.
         *
         * @constructs Family
         */
        function construct(data, options)
        {
            //Extend family settings with specified options
            $.extend(_self.settings, options);

            /**
             * Set partner node data if it wasn't specified in tree data file.
             * Partner node will have mamber opposite sex and an "inactive" status.
             */
            if (!data.partner) {
                data.partner = {
                    sex: (data.member.sex == Member.SEX_MALE)? Member.SEX_FEMALE : Member.SEX_MALE,
                    status: Member.STATUS_INACTIVE
                };
            }

            /**
             * Check if family members have different genders,
             * no gay couples allowed!
             */
            if (data.partner.sex == data.member.sex) {
                throw 'Trying to create family width same gender members.';
            }

            //Set member and partner nodes
            _self.member  = new Member(node, data.member);
            _self.partner = new Member(node, data.partner);
        }

        /**
         * Draw current view on canvas.
         *
         * @return {Family} Family view instance
         */
        this.render = function(canvas)
        {
            _self.partner.render(canvas);
            _self.member.render(canvas);

            if (node.children.length > 1) {
                _self.drawGroupLine(canvas);
            }

            if (node.hasChildren()) {
                _self.drawChildrenLine(canvas);
            }

            return this;
        };

        /**
         * Get member width, which can later be used to calculate
         * owner node position on canvas.
         *
         * @returns {Number} Node width in pixels
         */
        this.getWidth = function()
        {
            if (node.hasChildren() && node.hasParent()) {
                return _self.settings.eWidth;
            }

            return _self.settings.dWidth;
        };

        /**
         * Get node view middle point position.
         * This value will later be used to position node view elements.
         *
         * @returns {Geometry.Point} Object containing x, y properties
         */
        this.getMPoint = function()
        {
            return _self.member.getMPoint();
        };

        /**
         * Draw family children group line.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawGroupLine = function(canvas)
        {
            var cPoint1 = node.children[0].getCPoint();
            var cPoint2 = node.children.slice(-1)[0].getCPoint();

            var line = canvas.path();

            line.attr({
                'stroke': '#2B3F74',
                'stroke-width': 2,
                'path':
                    'M' + (cPoint1.x - 1)  + ' ' + cPoint1.y +
                    'L' + (cPoint2.x  + 1) + ' ' + cPoint2.y
            });

            return line;
        }

        /**
         * Draw family children line.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawChildrenLine = function(canvas)
        {
            var line = canvas.path();

            //Get family members image set bounding box
            var box  = canvas
                .set([_self.member.imageEl, _self.partner.imageEl])
                .getBBox();

            //Calculate arc point offsets
            var offset = {
                x: box.x,
                y: box.y + box.height,
                z: box.x + box.width
            };

            line.attr({
                'stroke': '#2B3F74',
                'stroke-width': 2,
                'path':
                    'M'
                        + offset.x + ' '
                        + offset.y +
                    'C'
                        + (offset.x + 40) + ' '
                        + (offset.y + 30) + ','
                        + (offset.z - 40) + ' ' + (offset.y + 30) + ','
                        + (offset.x + box.width) + ' ' + offset.y +
                    'M'
                        + node.x + ' '
                        + (offset.y + 22) +
                    'L'
                        + node.x  + ' '
                        + (node.y + node.getHeight())
            });

            //Prevent arc from overlaping member "relatives" circle element.
            line.toBack();

            return line;
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(data, options);
    };

    return Family;

});
