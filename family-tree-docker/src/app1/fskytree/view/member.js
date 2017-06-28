define(function(require, exports, module){

    var $        = require('jquery'),
        Member   = require('fskytree/view/member');
        Node     = require('fskytree/view/node');
        Geometry = require('fskytree/component/geometry');

    /**
     * @class Member
     * @classdesc This "class" function contains methods for rendering member node.
     */
    var Member = function(node, data, options)
    {
        /**
         * ...
         * @type {Member}
         */
        var _self;

        /**
         * @type {Object} Object containing current object setting values
         */
        this.settings = {
            imagePath: 'img/',
            yearChar:  'г',
            width:  160,
            imageRadius: 45
        };

        /**
         * ...
         * @type {String} Member id
         */
        this.id;

        /**
         * ...
         * @type {String} Member image/photo
         */
        this.image;

        /**
         * @type {String} Member firstname
         */
        this.firstname;

        /**
         * @type {String} Member lastname
         */
        this.lastname;

        /**
         * @type {Number} Member birthyear
         */
        this.birthyear;

        /**
         * @type {Number} Member deathyear
         */
        this.deathyear;

        /**
         * @type {Number} Member relatives count
         */
        this.relatives = 0;

        /**
         * @type {Number} Member status
         */
        this.status = Member.STATUS_ACTIVE;

        /**
         * @type {Number} Member sex
         */
        this.sex = Member.SEX_MALE;

        /**
         * @type {Boolean} Is member alive?
         */
        this.alive = true;

        /**
         * @type {Boolean} Is this member currently selected?
         */
        this.current = false;

        /**
         * @type {Geometry.Point} Member view middle point
         */
        this.mPoint;

        /**
         * @type {Raphael.Element} Raphael element instance
         */
        this.imageEl;

        /**
         * @type {Node} Node instance
         */
        this.node = node;

        /**
         * Constructor.
         *
         * @constructs Member
         */
        function construct(data, options)
        {
            //Extend member settings with specified options
            $.extend(_self.settings, options);

            //Populate public properites
            $.extend(_self, data);
        }

        /**
         * Draw current view on canvas.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @return {Member} Member view instance
         */
        this.render = function(canvas)
        {
            /**
             * Draw and set image element.
             * It will later be used to calculate and draw family view children line.
             */
            _self.imageEl = _self.drawImage(canvas);

            //Draw member label
            _self.drawLabel(canvas);

            //Draw overlay indicating that member is dead
            if (!_self.alive) {
                _self.drawDeathSector(canvas);
            }

            //Draw relatives count label
            if (_self.relatives > 0) {
                _self.drawRelatives(canvas);
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
            return _self.settings.width;
        };

        /**
         * Get node view middle point position.
         * This value will later be used to position node view elements.
         *
         * @returns {Geometry.Point} Object containing x, y properties
         */
        this.getMPoint = function()
        {
            //Cache mPoint value for better performance
            if (!_self.mPoint) {

                var x = node.x;
                var y = node.y + _self.settings.imageRadius + 30;

                if (node.getType() == Node.TYPE_FAMILY) {
                    x = x + 40 * ((_self.sex == Member.SEX_MALE)? -1 : 1);
                }

                _self.mPoint = new Geometry.Point(x, y);
            }

            return _self.mPoint;
        };

        /**
         * Get member biography string, including:
         * firstname, lastname and life years.
         *
         * @returns {String} Biography string
         */
        this.getBio = function()
        {
            return [
                _self.firstname,
                _self.lastname,
                _self.getLifeYears()
            ].join('\n');
        };

        /**
         * Get member full life years.
         * If deayth year is undefined then only bithyear will be returned.
         *
         * @returns {String} Life years string
         */
        this.getLifeYears = function()
        {
            var lifeyears = null;

            if (_self.birthyear != undefined) {
                lifeyears = _self.birthyear + _self.settings.yearChar + '.'
            }

            if (_self.deathyear != undefined) {
                lifeyears + ' - ' + _self.deathyear + _self.settings.yearChar + '.';
            }

            return lifeyears;
        };

        /**
         * Get member image/photo.
         *
         * @returns {String} Image path
         */
        this.getImage = function()
        {
            if (_self.status == Member.STATUS_INACTIVE) {
                return _self.settings.imagePath + 'invite.png';
            }

            return _self.image;
        };

        /**
         * Draw member image shape.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael circle element
         */
        this.drawImage = function(canvas)
        {
            var image  = canvas.circle();
            var mPoint = _self.getMPoint();

            /**
             * Draw image element.
             */
            image.attr({
                'cursor': 'pointer',
                'stroke-width': 3,
                'stroke': (!_self.alive)? '#404040' : 'none',
                'fill': 'url("' + _self.getImage() + '")',
                'r':  _self.settings.imageRadius,
                'cx': mPoint.x,
                'cy': mPoint.y
            });

            if (_self.current) {
                image.attr({
                    'stroke': '#6F8BCA',
                    'r': _self.settings.imageRadius - 1
                });
            }

            /**
             * Bind events.
             */
            if (_self.status == Member.STATUS_INACTIVE) {

                //Set hover attributes
                image.attr({'fill-opacity': 0.8});
                image.hover({'fill-opacity': 1});
            }

            /**
             * Fetch tree reference
             * and pass upcoming image events to tree.
             */
            var tree = node.getTree();

            image.click(function(){
                $(tree).trigger('tree/member/click', [_self]);
            });

            //Bind hover event only on active members
            if (_self.status == Member.STATUS_ACTIVE) {
                image.mouseover(function(){
                    $(tree).trigger('tree/member/hover', [_self]);
                });
            }

            return image;
        };

        /**
         * Draw death sector.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawDeathSector = function(canvas)
        {
            var sector = canvas.path();

            var radius = _self.settings.imageRadius;
            var mPoint = _self.getMPoint();

            sector.attr({
                'path': 'M '
                     + (mPoint.x + (radius - 2)) + ','
                     + (mPoint.y + (radius / 3) - 7)
                     + ' A ' + (radius - 2) +',' + (radius - 2) + ' 0 0,1 '
                     + (mPoint.x - (radius / 2)) + ','
                     + (mPoint.y + (radius - 7)) + ' z',
                'stroke': 'none',
                'fill': '#000',
                'opacity': 0.75
            });

            return sector;
        }

        /**
         * Draw member label.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael text element
         */
        this.drawLabel = function(canvas)
        {
            var label  = canvas.text();
            var mPoint = _self.getMPoint();

            //Crete default label under the node
            label.attr({
                //'font-family': 'DejaVu Sans Light',
                'font-size': 11,
                'fill': '#465b86',
                'text': _self.getBio()
            });

            //Verticaly align label by top
            label.attr({
                'x': mPoint.x,
                'y': mPoint.y + _self.settings.imageRadius + (label.getBBox().height / 2) + 10
            });

            //Change label position if node has children
            if (node.hasChildren()) {

                /**
                 * Put label on top of the node if member doesn't have parents,
                 * otherwise put it aside depending on member sex.
                 */
                if (node.hasParent()) {
                    label.attr({
                        'x': mPoint.x + (_self.settings.imageRadius + (label.getBBox().width / 2) + 10) * ((_self.sex == Member.SEX_MALE)? -1 : 1),
                        'y': mPoint.y
                    });
                } else {
                    label.attr({
                        'y': mPoint.y - _self.settings.imageRadius + (label.getBBox().height / 2) - 30 - 10
                    });
                }
            }

            //Set black color for label if member is dead
            if (!_self.alive) {
                label.attr('fill', '#000');
            }

            return label;
        }

        /**
         * Draw member relatives label.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @returns {Raphael.Element} Raphael text element
         */
        this.drawRelatives = function(canvas)
        {
            /**
             * Draw relative background circle.
             */
            var wrapper = canvas.circle();
            var mPoint  = _self.getMPoint();

            wrapper.attr({
                'stroke': 'none',
                'fill':   '#6F8BCA',
                'cursor': 'pointer',
                'cx': mPoint.x + (_self.settings.imageRadius / 1.2) * ((_self.sex == Member.SEX_MALE)? -1 : 1),
                'cy': mPoint.y + (_self.settings.imageRadius / 1.2),
                'r': 22
            });

            /**
             * Draw relatives count number.
             */
            var label = canvas.text();

            label.attr({
                'fill':   '#FFF',
                'cursor': 'pointer',
                'font-size': 18,
                'font-weight': 'bold',
                'font-family': 'Verdana',
                'x': wrapper.attr('cx'),
                'y': wrapper.attr('cy'),
                'text': '+' + _self.relatives
            });

            /**
             * Bind events.
             */
            var set = canvas.set([wrapper, label])

            set.hover({
                'fill': '#2B3F74',
                'r': 24
            }, wrapper);

            /**
             * Fetch tree reference
             * and pass upcoming image events to tree.
             */
            var tree = node.getTree();

            set.click(function(){
                $(tree).trigger('tree/member/relatives', [_self]);
            });


            return wrapper;
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(data, options);
    };

    /**
     * Class constants.
     */
    Member.SEX_MALE   = 1;
    Member.SEX_FEMALE = 2;

    Member.STATUS_ACTIVE   = 1;
    Member.STATUS_INACTIVE = 2;

    return Member;

});
