define(function(require, exports, module){

    var $ = require('jquery');

    /**
     * @class History
     * @classdesc This "class" is responsible for managing tree history.
     */
    var History = function(tree, options)
    {
        /**
         * @type {History} History plugin instance
         */
        var _self;

        /**
         * @type {jQuery} History container element
         */
        this.container;

        /**
         * @type {jQuery} History list element
         */
        this.list;

        /**
         * @type {jQuery} Currently selected history list item element
         */
        this.activeItem;

        /**
         * @type {Object} Object containing plugin setting values
         */
        this.settings = {
            id:          'fskytree-history',
            listClass:   'history-list',
            itemClass:   'list-item',
            activeClass: 'active',
            handlerUrl:  null
        };

        /**
         * Constructor.
         *
         * @constructs History
         */
        function construct(options)
        {
            //Extend loader settings with specified options
            $.extend(_self.settings, options);

            //Initialize plugin dom elements
            _self.initContainer();

            //Load new member tree when user clicks on "relatives" button
            $(tree).on('tree/member/relatives', function(e, member){
                _self.pushState(member);
            });

            //Bind history list item events
            _self.list.on('click', '.' + _self.settings.itemClass, _self.loadState);
        }

        /**
         * Set plugin dom element variables.
         *
         * @returns {History} History plugin instance
         */
        this.initContainer = function()
        {
            _self.container  = $('#' + _self.settings.id);
            _self.list       = _self.container.find('.' + _self.settings.listClass);
            _self.activeItem = _self.list.find('.' + _self.settings.activeClass);

            return this;
        };

        /**
         * ...
         */
        this.pushState = function(member)
        {
            //Remove any previous list items
            _self.removePreviousItems();

            //Add target member as new list item
            _self.addListItem(member);

            //Set current member id as location hash value
            _self.setHash(member.id);

            //Load new tree by member id
            tree.load(_self.settings.handlerUrl, {id: member.id});

            return this;
        };

        /**
         * ...
         */
        this.loadState = function(e)
        {
            //Set clicked list item as currently active
            _self.setActiveItem($(this));

            //Load new tree
            tree.load(_self.settings.handlerUrl, {id: $(this).data('id')});

            return this;
        };

        /**
         * Set window location hash value.
         *
         * @param {String} Hash value
         * @returns {History} History plugin instance
         */
        this.setHash = function(hash)
        {
            location.hash = hash;

            return this;
        }

        /**
         * Set active history list item.
         *
         * @param {jQuery} jQuery wrapped list item dom element
         */
        this.setActiveItem = function(item)
        {
            /**
             * Remove active class from previous active item element, set new active item element
             * and add "active" class to new active element.
             */
            _self.activeItem.removeClass(_self.settings.activeClass);
            _self.activeItem = item;
            _self.activeItem.addClass(_self.settings.activeClass);
        }

        /**
         * Create list item element for history entry.
         *
         * @param {Member} Target member view instance
         * @returns {jQuery} jQuery wrapped list item DOM element
         */
        this.createListItem = function(member)
        {
            return $('<li class="' + _self.settings.itemClass + '" data-id="' + member.id + '"><a href="#' + member.id + '">' + member.lastname + '</a></li>');
        }

        /**
         * ...
         */
        this.addListItem = function(member)
        {
            //Create new history list item from tempalte
            var listItem = _self.createListItem(member);

            //Append to list
            listItem.appendTo(_self.list);

            //Set new list item as currently active
            _self.setActiveItem(listItem);
        }

        /**
         * Remove all elements after currently active element
         * in history list, see _self.list.
         *
         * @returns {History} History plugin instance
         */
        this.removePreviousItems = function()
        {
            _self.activeItem.nextAll().remove();

            return this;
        }

        //Make self reference
        _self = this;

        //Initialize object
        construct(options);
    }

    /**
     * Class constants.
     */
    History.PLUGIN_NAME = 'history';

    return History;

});
