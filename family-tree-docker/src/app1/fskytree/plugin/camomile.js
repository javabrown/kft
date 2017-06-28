define(function(require, exports, module){

    var $        = require('jquery'),
        Member   = require('fskytree/view/member'),
        Node     = require('fskytree/view/node'),
        Geometry = require('fskytree/component/geometry');

    /**
     * @class Camomile
     * @classdesc Camomile "class" is responsible for adding new tree members.
     */
    var Camomile = function(tree, options)
    {
        /**
         * ...
         * @type {Camomile} Camomile plugin instance
         */
        var _self;

        /**
         * @type {Object} Object containing plugin setting values
         */
        this.settings = {
            imageRadius: 70
        };

        /**
         * @type {Member} Target member view instance
         */
        this.member;

        /**
         * @type {Raphael.Paper} Camomile overlay canvas
         */
        this.canvas;

        /**
         * @type {Array} Array of available actions
         */
        this.actions;

        /**
         * @type {Geometry.Point} Camomile view middle point
         */
        this.mPoint;

        /**
         * Constructor.
         *
         * @constructs Loader
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            /**
             * Subscribe to tree "add member" event.
             * @todo If current member has a partner(wife/husband), switch to his tree before adding his relatives.
             */
            $(tree).on('tree/member/add', function(e, member){
                _self.setMember(member); //Set target member
                _self.initActions(); //Set available member actions
                _self.initCanvas(); //Create canvas
                _self.show(); //Show overlay
            });

            //Remove camomile when overlay is hidden
            $(tree.plugin.overlay).on('overlay/hide', function(){
                _self.canvas.remove();
            });
        }

        /**
         * Create camomile canvas.
         * This canvas will be used to draw camomile view itself.
         *
         * @return {Camomile} Camomile plugin instance
         */
        this.initCanvas = function()
        {
            _self.canvas = Raphael(tree.plugin.overlay.container[0], '100%', '100%');

            return this;
        };

        /**
         * Set all available camomile actions for current member.
         * Each member can have different actions combination, depending on
         * member sex, whether it has parents and so on...
         *
         * @return {Camomile} Camomile plugin instance
         */
        this.initActions = function()
        {
            //Define all available actions
            var wife    = {label: 'добавить\nжену', event: 'tree/member/add/wife'};
            var husband = {label: 'добавить\nмужа', event: 'tree/member/add/husband'};

            var mother  = {label: 'добавить\nмать', event: 'tree/member/add/mother'};
            var father  = {label: 'добавить\nотца', event: 'tree/member/add/father'};

            var brother = {label: 'добавить\nбрата',  event: 'tree/member/add/brother'};
            var sister  = {label: 'добавить\nсестру', event: 'tree/member/add/sister'};

            var son     = {label: 'добавить\nсына',   event: 'tree/member/add/son'};
            var dughter = {label: 'добавить\nдочь',   event: 'tree/member/add/daughter'};


            //Add son and daughter actions
            _self.actions = [dughter,son];


            //Check if member has parents
            if (_self.member.node.hasParent()) {

                //Add brother and sister actions
                _self.actions.push(brother, sister);

                //Add mother or father actions depending on parent partner sex
                if (_self.member.node.parent.view.partner.status == Member.STATUS_INACTIVE) {
                    _self.actions.push((_self.member.node.parent.view.member.sex == Member.SEX_MALE)? mother : father);
                }

            } else {
                //Add both parents actions
                _self.actions.push(mother, father);
            }


            //@todo This is way to fucking long statement, make it shorter!
            if ((_self.member.node.view.partner && _self.member.node.view.partner.status == Member.STATUS_INACTIVE) || _self.member.node.getType() == Node.TYPE_MEMBER) {
                _self.actions.push((_self.member.sex == Member.SEX_MALE)? wife : husband);
            }


            return this;
        };

        /**
         * Set current member.
         *
         * @return {Camomile} Camomile plugin instance
         */
        this.setMember = function(member)
        {
            _self.member = member;

            return this;
        };

        /**
         * Get camomile view middle point.
         * This value will later be used to position camomile view elements.
         *
         * @returns {Geometry.Point} Object containing x, y properties
         */
        this.getMPoint = function()
        {
            //Cache middle point
            if (!_self.mPoint) {

                var offset = tree.wrapper.offset();

                _self.mPoint = new Geometry.Point(
                    offset.left + (tree.wrapper.width() / 2),
                    offset.top  + (tree.wrapper.height() / 2)
                );
            }

            return _self.mPoint;
        };

        /**
         * Show camomile layer.
         *
         * @return {Camomile} Camomile plugin instance
         */
        this.show = function()
        {
            /**
             * Scroll to target member first, then
             * show overlay & render camomile elements.
             */
            tree.scrolling.scrollTo(_self.member.node, function(){
                tree.plugin.overlay.show();
                _self.render(_self.canvas);
            });

            return this;
        };

        /**
         * Hide camomile layer.
         *
         * @return {Camomile} Camomile plugin instance
         */
        this.hide = function()
        {
            //Hide overlay
            tree.plugin.overlay.hide();

            return this;
        };

        /**
         * Draw camomile on canvas.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @return {Camomile} Camomile plugin instance
         */
        this.render = function(canvas)
        {
            //Draw member image
            $(_self)
                .clearQueue()
                .queue(_self.drawImage)
                .queue(_self.drawArc)
                .queue(_self.drawCamomile);

            return this;
        };

        /**
         * Draw member image.
         *
         * @param {Function} Call this function to fire next callback in queue
         * @returns {Raphael.Element} Raphael circle element
         */
        this.drawImage = function(next)
        {
            /**
             * Draw image.
             */
            var mPoint = _self.getMPoint();
            var image  = _self.canvas.circle();

            image.attr({
                'r': _self.member.settings.imageRadius,
                'stroke': 'none',
                'fill': 'url("' + _self.member.getImage() + '")',
                'cx': mPoint.x,
                'cy': mPoint.y
            });

            image.animate({'r': _self.settings.imageRadius}, 300, null, next);

            return image;
        }

        /**
         * Draw member image arc.
         *
         * @param {Function} Call this function to fire next callback in queue
         * @returns {Raphael.Element} Raphael path element
         */
        this.drawArc = function(next)
        {
            /**
             * Draw arc.
             */
            var mPoint = _self.getMPoint();
            var angle  = 360 / _self.actions.length;

            var arc = _self.canvas.arc(mPoint.x, mPoint.y, _self.settings.imageRadius + 15, angle);

            arc.attr({
                'stroke-width': 3,
                'stroke': '#6F8BCA',
                'opacity': 0
            });

            arc.rotate(angle / 2);
            arc.animate({'opacity': 1}, 200, null, next);

            return arc;
        }

        /**
         * Draw camomile actions(leafs).
         *
         * @param {Function} Call this function to fire next callback in queue
         */
        this.drawCamomile = function(next)
        {
            var p1, p2;

            var leafSet = _self.canvas.set();
            var mPoint  = _self.getMPoint();
            var angle   = 360 / _self.actions.length;

            //Draw all available actions
            for (var i=0;i<_self.actions.length;i++) {

                p1 = Geometry.circlePoint((angle * i) + (angle / 2), 89,  new Geometry.Point(mPoint.x, mPoint.y));
                p2 = Geometry.circlePoint((angle * i) + (angle / 2), 170, new Geometry.Point(mPoint.x, mPoint.y));

                /**
                 * Draw action(leaf) connection line.
                 */
                var line = _self.canvas.path();

                line.attr({
                    'path': 'M' + p1.x + ' ' + p1.y + 'L' + p2.x + ' ' + p2.y,
                    'stroke-dasharray': '.',
                    'stroke-width': 2,
                    'stroke': '#6F8BCA',
                    'opacity': 0
                });

                /**
                 * Draw camomile action(leaf).
                 */
                var leaf = _self.canvas.circle();

                leaf.attr({
                    'cursor': 'pointer',
                    'cx': p2.x,
                    'cy': p2.y,
                    'r':  45,
                    'fill': '#6F8BCA',
                    'stroke': 'none',
                    'opacity': 0
                });

                /**
                 * Draw camomile action(leaf) label.
                 */
                var label = _self.canvas.text();

                label.attr({
                    'cursor': 'pointer',
                    'text': _self.actions[i].label,
                    'x': p2.x,
                    'y': p2.y,
                    'fill': '#FFF',
                    'font-size': 13,
                    'opacity': 0
                });

                //Add leaf elements to set
                leafSet.push(leaf);
                leafSet.push(label);
                leafSet.push(line);

                /**
                 * Bind events.
                 */
                var set = _self.canvas.set([leaf, label]);

                //Set hover state
                set.hover({'fill': '#2B3F74'}, leaf);

                //Bind click event
                set.click($.proxy(function(index){
                    $(tree).trigger(_self.actions[index].event, [_self.member]);
                }, set, i));
            }

            //Fade in camomile actions
            leafSet.animate({'opacity': 1}, 200, null, next);
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    /**
     * Class constants.
     */
    Camomile.PLUGIN_NAME = 'camomile';

    return Camomile;

});
