define(function(require, exports, module){

    var $        = require('jquery'),
        Member   = require('fskytree/view/member'),
        Node     = require('fskytree/view/node'),
        Geometry = require('fskytree/component/geometry');

    /**
     * @class Actions
     * @classdesc Actions "class" is responsible for displaying actions layer.
     */
    var Actions = function(tree, options)
    {
        /**
         * ...
         * @type {Actions} Actions plugin instance
         */
        var _self;

        /**
         * @type {Raphael.Set} Action elements set
         */
        this.elSet;

        /**
         * @type {Object} Object containing plugin setting values
         */
        this.settings = {
            debug: false,
            distance: 30,
            imagePath: 'img/'
        };

        /**
         * @type {Array} Array of action objects
         */
        this.actions = [
            {icon: 'add.png',    event: 'tree/member/add'},
            {icon: 'edit.png',   event: 'tree/member/edit'},
            {icon: 'delete.png', event: 'tree/member/delete'}
        ];

        /**
         * Constructor.
         *
         * @constructs Loader
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Render actions on node member hover event
            $(tree).on('tree/member/hover', function(e, member){
                _self.render(tree.renderer.canvas, member);
            });

            /**
             * Draw transparent background
             * when canvas is ready.
             */
            $(tree).on('tree/render', function(e, renderer){
                _self.drawBackground(tree.renderer.canvas);
            });
        }

        /**
         * Draw actions.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @return {Actions} Actions plugin instance
         */
        this.render = function(canvas, member)
        {
            /**
             * Before rendering new action elements remove
             * previous ones left from other member view.
             */
             _self.hide();

            //From this point, store all rendered elements in a set
            canvas.setStart();

            //Draw overlay
            this.drawOverlay(canvas, member);

            //Draw all available action buttons
            this.drawActions(canvas, member);

            /**
             * This set will later be used to remove all action elements
             * from canvas at once, using set.remove() method.
             */
            _self.elSet = canvas.setFinish();

            return this;
        };

        /**
         * Remove action elements from tree canvas.
         *
         * @returns {Actions} Actions plugin instance
         */
        this.hide = function()
        {
            if (_self.elSet) {
                _self.elSet.remove();
            }

            return this;
        };

        /**
         * Draw actions background overlay.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @param {Member} Member view instance
         * @return {Raphael.Element} Raphael rect. element
         */
        this.drawOverlay = function(canvas, member)
        {
            var mPoint  = member.getMPoint();
            var overlay = canvas.circle();

            var sex = member.sex;

            if (member.node.getType() == Node.TYPE_MEMBER) {
                sex = Member.SEX_FEMALE;
            }

            overlay.attr({
                'stroke': (_self.settings.debug)? 2 : 'none',
                'fill':   '#FFF',
                'fill-opacity': 0,
                'cx': (sex == Member.SEX_MALE)? mPoint.x - 25 : mPoint.x + 25,
                'cy': mPoint.y - 25,
                'r': 90
            });

            overlay.insertBefore(member.imageEl);

            return overlay;
        }

        /**
         * Draw all action elements(buttons).
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @param {Member} Member view instance
         */
        this.drawActions = function(canvas, member)
        {
            var mPoint = member.getMPoint();
            var sex    = member.sex;

            if (member.node.getType() == Node.TYPE_MEMBER) {
                sex = Member.SEX_FEMALE;
            }

            /**
             * Draw all available action buttons.
             */
            for (var i=0;i<_self.actions.length;i++) {

                //Calculate button position
                var point = Geometry.circlePoint(
                    (sex == Member.SEX_MALE)? 180 - i * 45 : i * 45,
                    member.settings.imageRadius + _self.settings.distance,
                    new Geometry.Point(mPoint.x, mPoint.y)
                );

                /**
                 * Draw action background circle.
                 */
                var background = canvas.circle();

                background.attr({
                    'cursor': 'pointer',
                    'cx': point.x,
                    'cy': point.y,
                    'r':  22,
                    'fill': '#6F8BCA',
                    'stroke': 'none'
                });

                /**
                 * Draw action icon.
                 */
                var icon = canvas.image(_self.settings.imagePath + _self.actions[i].icon);

                icon.attr({
                    'cursor': 'pointer',
                    'x': point.x - 10,
                    'y': point.y - 10,
                    'width':  21,
                    'height': 21,
                    'opacity': 0.5
                });

                /**
                 * Bind events
                 */
                var set = canvas.set([background, icon]);

                //Set hover state
                set.hover({'opacity': 1}, icon);

                //Bind click event
                set.click($.proxy(function(index){
                    $(tree).trigger(_self.actions[index].event, [member]);
                }, set, i));
            }
        }

        /**
         * Draw transaprent background rect. which later
         * can be used to correctly handle actions overlay mouseout event.
         *
         * @param {Raphael.Paper} Raphael paper instance
         * @return {Raphael.Element} Raphael rect. element
         */
        this.drawBackground = function(canvas)
        {
            var background = canvas.rect();

            background.attr({
                'stroke': 'none',
                'fill': '#FFF',
                'fill-opacity': 0,
                'width':  tree.container.width(),
                'height': tree.container.height()
            });

            //Prevent background from overlaping tree elements
            background.toBack();

            //Bind events
            background.mouseover(function(){
                _self.hide();
            });

            return background;
        };

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    };

    /**
     * Class constants.
     */
    Actions.PLUGIN_NAME = 'actions';

    return Actions;

});
