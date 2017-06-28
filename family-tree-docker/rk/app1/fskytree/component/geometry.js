define(function(require, exports, module){

    var $ = require('jquery');

	/**
	 * @class Geometry
	 * @version 1.0
	 */
	var Geometry = new function()
	{
		var _self;

		/**
		 * Public API
		 */
		this.Point = Point;

		/**
		 * Calculate sinus value for specified angle.
		 *
		 * @param {number} Angle value
		 * @returns {Number}
		 */
		this.sin = function(angle)
		{
			return Math.sin(_self.degrad(angle));
		};

		/**
		 * Calculate cosinus value for specified angle.
		 *
		 * @param {number} Angle value
		 * @returns {Number}
		 */
		this.cos = function(angle)
		{
			return Math.cos(_self.degrad(angle));
		};

		/**
		 * Calculate cirlce point position using radius and angle.
		 *
		 * @param {number} Angle value(usually from 0 to 360)
		 * @param {number} Radius value
		 * @param {Point} [offset] Center point
		 * @returns {Point}
		 */
		this.circlePoint = function(angle, radius, offset)
		{
			if (typeof(offset) != 'object' || !offset instanceof Point) {
				offset = new Point();
			}

			return new Point(
				(_self.cos(angle)) * radius + offset.x,
				(_self.sin(angle)) * radius + offset.y
			);
		};

		/**
		 * Convert degrees to radians.
		 *
		 * @param {number} Angle value
		 * @returns {Number}
		 */
		this.degrad = function(angle)
		{
			return -angle / 180 * Math.PI;
		};

		/**
		 * @class Point
		 * @classdesc Class that represents 2D geometry point.
		 */
		function Point(x, y)
		{
			this.x = x || 0;
			this.y = y || 0;
		};

		//Make self reference
		_self = this;
	};

	return Geometry;

});
