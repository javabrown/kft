define(function(require, exports, module){

    var Raphael  = require('raphael'),
        Geometry = require('fskytree/component/geometry');

    /**
     * Bind mouseleave event.
     *
     * @param  {Function} handler Event handler
     */
    Raphael.el.mouseleave = function(handler)
    {
        this.mouseout(function(e){
            if (!this.isPointInside(e.pageX, e.pageY)) {
                handler.call(this, arguments);
            }
        });
    };

    /**
     * Unbind mouseleave event.
     *
     * @param  {Function} handler Target event handler
     */
    Raphael.el.unmouseleave = function(handler)
    {
        return this.unmouseout(handler);
    };

    /**
     * Draw arc shape element.
     *
     * @param  {Number} x Arc center point x position
     * @param  {Number} y Arc center point y position
     * @param  {Number} r Arc radius
     * @param  {Number} a Arc cutout angle
     * @returns {Raphael.Element} Raphael path element
     */
    Raphael.fn.arc = function(x, y, r, a)
    {
        var p1 = Geometry.circlePoint(0, r, new Geometry.Point(x, y));
        var p2 = Geometry.circlePoint(a, r, new Geometry.Point(x, y));

        return this.path('M ' + p1.x + ',' + p1.y + ' A ' + r + ',' + r + ' 0 1 1 ' + p2.x + ',' + p2.y);
    };

    /**
     * Set element attributes on hover event.
     * Note! This method overrides core raphael "hover" method,
     * if you need original method behaviour use mouseover, mouseout instead.
     *
     * @param {Object} attr Target attributes
     * @param {Object} [el] Target element, if not set current element will be used
     * @returns {Raphael.Element} Target element
     */
    Raphael.el.hover = function(attr, el)
    {
        var tmp;

        //Set target element
        el = el || this;

        //Apply new element attributes
        this.mouseover(function(){
            tmp = el.attr();
            el.attr(attr);
        });

        //Restore old element attributes
        this.mouseout(function(){
            el.attr(tmp);
            tmp = undefined; //Free variable
        });

        return this;
    };

    return Raphael;

});
