var currency = 'грн',
    ctrl, alt;

function getPrices (json, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            currency = data.currency;
            $('.js-result-currency').text(currency);
            if (typeof callback == 'function') {
                callback(data);
            }
        }
    };
    xmlhttp.open("GET", json, true);
    xmlhttp.send();
}

function launchFullScreen (element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

function cancelFullscreen () {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
}

/** Название события клика, если touch устройство - `'touchstart'`, иначе - `'click'`. */
var CLICKVAR = 'click';

var ASSETS_FOLDER = 'constructor/assets/kulik/designer/';

/** создание конструктора `ArmChair`, посредством анонимной функции
 * @method ArmChair &larr; &lt;anonymous>
 * @param {Object} $ - jQuery
 * @param {Object} window
 */
(function ($, window) {

    /** ### *Приватные константы и методы ArmChair*
     * @name WDOCS_FROM
     */
        // флаг нового рендера 3d модели
    var NEW_RENDER = true;

    var START = true;

    // класс опции
    var OPTION_CLASS = 'constructor__option';

    // селектор опции
    var OPTION_SELECTOR = '.' + OPTION_CLASS;

    // класс опции
    var ITEM_CLASS = 'option-item';

    // селектор опции
    var ITEM_SELECTOR = '.' + ITEM_CLASS;

    // класс-флаг скрытого состояния (display: none)
    var IS_HIDDEN = 'is-hidden';

    // класс-флаг отрытого состояния
    var IS_OPENED = 'is-opened';

    // класс-флаг отрытого состояния
    var IS_ALLOWED = 'is-allowed';

    // класс-флаг выбранного состояния
    var IS_SELECTED = 'is-selected';

    // класс-флаг активного состояния
    var IS_ACTIVE = 'is-active';
    var ACTIVE_LIST = 'active-list';

    // храним основной цвет
    var COLOR_MAIN = '';

    // храним цвет вставки
    var COLOR_ADD = '';

    var IS_IGNOR_ALL = 'is-ignor-all';
    var IS_IGNOR = 'is-ignor';

    // список свойств для рендера 3d модели
    var RENDER_OPTIONS_LIST = [
        'model',
        'headrest',
        'material',
        'color',
        'color_add',
        'seam',
        'cross',
        'additional_stop',
        'additional_legs',
        'crystals'/*,
        'logo_back',
        'logo_headrest'*/
    ]

    // ссылка ветку instance конструктора ArmChair;
    var INSTANCE;

    // WDOCS_TO

    /** Подстановка элементу `img` значения аттрибута `src` из пользовательского атрибута `data-src="[URL]"`. Метод применяется к списку jQuery элементов (изображений), которые передаються в качестве аргумента.
     * @param {Object} collection - список jQuery элементов `img`.
     */
    function _simpleLoad (collection) {
        if (typeof collection == 'object') {
            if (collection.length) {
                collection.each(function (i, el) {
                    var $el = $(this);
                    if ($el.data('src') != this.src) {
                        this.src = $el.data('src');
                    }
                });
            }
        }
    }

    /** Поиск корневого `option'a` от текущего элемента.
     * @param {Object} elem - текущий элемент
     * @returns {Object} корневой `option`
     */
    function _rootOption (el) {
        var $root;
        var $el = (el.jquery) ? el : $(el);
        if (!$el.hasClass(OPTION_CLASS)) {
            $root = $el.closest(OPTION_SELECTOR);
        }
        if (!$root.length) {
            return console.error('root option not found');
        }
        return $root;
    }

    /** Получение корневого `option'a`.
     * @param {string|Object} value - строка-селектор или DOM элемент
     * @returns {Object} корневой `option`
     */
    function _getRootOption (value) {
        var $option;
        if (typeof value == 'string') {
            $option = $(value);
        } else {
            $option = _rootOption(value);
        }
        return $option;
    }

    /** Получение элемента `option-item`.
     * @param {Object} jqEl - jQuery элемент
     * @returns {Object} jQuery элемент `option-item`
     */
    function _getOptionItem (jqEl) {
        var $item;
        if (jqEl.hasClass(ITEM_CLASS)) {
            $item = jqEl;
        } else {
            $item = jqEl.closest(ITEM_SELECTOR);
            if (!$item.length) {
                return console.error('.option-item not found');
            }
        }
        return $item;
    }

    /** Получение имени метода из `id` передаваемого элемента
     * @param {string|Object} value - строка-селектор или DOM элемент
     * @returns {Object} корневой `option`
     */
    function _getMethodName (root) {
        var key = root.prop('id');
        if (!key.length) {
            return console.error('no key in id');
        }
        key = key.split('--').pop();
        return key;
    }


    /** объявление конструктора `ArmChair` */
    function ArmChair () {
        this.instance = {};
        INSTANCE = this.instance;
        INSTANCE.render = {};
        INSTANCE.order = {};
    };


    function bottomCheck (elem) {
        if (elem.closest('.constructor__options--bottom').length) {
            $('.constructor__result').addClass('fixTop');
        } else {
            $('.constructor__result').removeClass('fixTop');
        }
    }


    /** */
    function setPrettyPrice (price) {
        price = '' + price;
        var newPrice = '';
        var n = 0;
        var gap = '';
        for (var i = price.length - 1; i >= 0; i--) {
            n++;
            if (n % 3 === 0) {
                gap = ' ';
            }
            newPrice = gap + price[i] + newPrice;
            gap = '';
        }
        return newPrice;
    };

    function mobileItem (elem) {
        return $('#menu').find('[data-id="' + elem.attr('id').split('--')[1] + '"]');
    }

    /**
     * Вызов коллбек функции
     * @param {string} key - ключ (имя) коллбека
     * @param {*} data - передаваемые параметры для коллбека
     */
    ArmChair.prototype.runCallback = function (key, data) {
        if (typeof this[key] == 'function') {
            if (key == 'Render') {
                this.setOptionList();
            }
            var args = $.isArray(data) ? data : [data];
            switch (key) {
                case 'Render':
                    args.push(!NEW_RENDER);
                    NEW_RENDER = true;
                    break;
            }
            var formInstance = $.extend(false, {}, INSTANCE);
            delete formInstance.render;
            $('#constructorForm').data('instance', formInstance);
            $('#form-instance').val(JSON.stringify(formInstance));
            this[key].apply(this, args);
        }
    }

    /** */
    ArmChair.prototype.resetOneOption = function ($el) {
        var AC = this;
        if ($el.prop('id') == 'constructor__option--model') {
            $('.' + IS_IGNOR_ALL).removeClass(IS_IGNOR_ALL);
            $('.' + IS_IGNOR).removeClass(IS_IGNOR);
            $('.show-order').removeClass('show-order');
            $('.uploader-is-loaded').removeClass('uploader-is-loaded');
        }
        var id = $el.prop('id').split('--').pop();
        switch (id) {
            case 'model':
                break;
            case 'color':
                $('.option-color-disable').removeClass('option-color-disable');
                $('.js-additional-color').prop('checked', false);
                $('#constructor__option--color--add').addClass(IS_HIDDEN);
                $el.find('.list-todo__controller--checked').addClass(IS_HIDDEN);
                delete INSTANCE.color_add;
            default:
                var $selected = $el.find('.' + IS_SELECTED);
                var $value = $el.find('.js-option-selected-val');
                var $active = $el.find('.' + IS_ACTIVE);
                var $el = $el.removeClass(IS_ALLOWED);
                mobileItem($el).removeClass(IS_ALLOWED);
                var $checked = $el.find('.list-todo__controller--checked');
                if ($checked.length) {
                    $checked.children('input').prop('checked', false);
                }
                if ($selected.length) {
                    $selected.removeClass(IS_SELECTED);
                }
                if ($active.length) {
                    if (!$active.hasClass('js-not-reset')) {
                        $active.removeClass(IS_ACTIVE);
                    }
                }
                if ($value.length) {
                    $value.html('');
                }
        }
    }

    /**
     * Очитска параметров для рендера
     */
    ArmChair.prototype.resetOptions = function () {
        for (var i = 0; i < RENDER_OPTIONS_LIST.length; i++) {
            var opt = RENDER_OPTIONS_LIST[i];
            if (opt == 'model') {
                continue;
            }
            delete INSTANCE.render[opt];
            delete INSTANCE[opt];
        }
        ;
        START = false;
        var self = this;
        self.$options.each(function (i, el) {
            self.resetOneOption($(el));
        });

    }

    function _ignoreAll ($opt, prop) {
        $opt.addClass(IS_IGNOR_ALL);
    }

    function _disableKeys ($opt, val) {
        for (var i = 0; i < val.disableKeys.length; i++) {
            var dk = val.disableKeys[i];
            $opt.find('.js-option-select').each(function (i, el) {
                if ($(el).data('select').key === dk) {
                    $(el).addClass(IS_IGNOR);
                }
            });
        }
    }

    ArmChair.prototype.setIgnors = function () {
        if (typeof this.ignors == 'object') {
            var IGNORS = this.ignors;
            var prop = INSTANCE.model;
            if (IGNORS.hasOwnProperty(prop)) {
                IGNORS = IGNORS[prop];
                for (var key in IGNORS) {
                    var $opt = $('#constructor__option--' + key);
                    var val = IGNORS[key];
                    if (val.checked === false) {
                        $opt.find('.list-todo__controller--checked').addClass(IS_IGNOR);
                    }
                    if (val.checked === true) {
                        $opt.find('.list-todo__controller--checked input')
                            .prop('checked', true).trigger('change');
                    }
                    if (val.disableAll) {
                        _ignoreAll($opt, prop);
                    } else if (val.disableKeys) {
                        _disableKeys($opt, val);
                    }
                    if (val.hasOwnProperty('set')) {
                        var set = val.set;
                        if (set.hasOwnProperty('key')) {
                            $opt.find('.js-option-select').each(function (i, el) {
                                if ($(el).data('select').key === set.key) {
                                    $(el).trigger('click');
                                }
                            });
                            _ignoreAll($opt, prop);
                        }
                        if (set.hasOwnProperty('subtitle')) {
                            $opt.find('.js-option-selected-val').html(set.subtitle);
                            mobileItem($opt).find('i').html(set.subtitle);
                        }
                    }
                    if (val.turnon) {
                        var turn = val.turnon;
                        if (turn.hasOwnProperty('key')) {
                            $opt.find('.js-option-select').each(function (i, el) {
                                if ($(el).data('select').key === turn.key) {
                                    $(el).trigger('click');
                                }
                            });
                        }
                    }
                }
            }
        }
        START = true;
    }

    ArmChair.prototype.setDefaultsOptions = function (bool) {
        if (bool) {
            INSTANCE.render.seam = false;
            INSTANCE.render.additional_stop = false;
            INSTANCE.render.additional_legs = false;
        } else {
            INSTANCE.render = {
                seam: false,
                additional_stop: false,
                additional_legs: false
            };
        }
    }

    /**
     * Составление параметров для рендера из ветки `instance`
     * @param {string} property - свойство (ключ опции), которое вызвало коллбек
     */
    ArmChair.prototype.setRenderOptions = function (property) {
        if (NEW_RENDER && property == 'model') {
            this.resetOptions();
            this.setIgnors();
            $('.constructor__options--bottom .is-allowed').removeClass('is-allowed');
            this.setDefaultsOptions(true);
        } else {
            this.setDefaultsOptions();
            for (var i = 0; i < RENDER_OPTIONS_LIST.length; i++) {
                var key = RENDER_OPTIONS_LIST[i];
                if (INSTANCE.hasOwnProperty(key)) {
                    INSTANCE.render[key] = INSTANCE[key];
                }
            }
        }
        if (NEW_RENDER) {
            this.runCallback('Render', [INSTANCE.render, property, START]);
        }
    }


    /** Установка активного, выбраного, итема опции
     * @param {Object} item - jQuery элемент (option-item)
     * @param {Object} root - jQuery элемент (constructor__option)
     * @param {string} value - значение выбраного итема
     */
    ArmChair.prototype.setActiveItem = function ($item, $root, value, changeItem) {

        // вывод текста выбранной опции
        var $value = $root.find('.js-option-selected-val');
        $value.html(value);
        mobileItem($root).find('i').html(value);

        if (changeItem) {
            // мульти
            var multiple = $item.hasClass('js-option-select--multiple');
            // добавление класса
            if (multiple) {
                $item.toggleClass(IS_SELECTED);
                var $parent = $item.parent();
                var arr = [];
                $parent.children('.' + IS_SELECTED).each(function (i, el) {
                    arr.push($(el).data('select').value);
                });
                mobileItem($root).find('i').html(arr.join('</br>'))
            } else {
                $item.addClass(IS_SELECTED)
                    .siblings(ITEM_SELECTOR)
                    .removeClass(IS_SELECTED);
            }
        }
    }


    /** Активация кнопки для перехода к следующей опции
     * @param {Object} option - jQuery элемент (constructor__option)
     */
    ArmChair.prototype.setActiveNextButton = function ($option) {
        var $button = $option.find('button.js-option-next');
        if ($button.length) {
            $button.addClass(IS_ACTIVE);
        }
    }


    var optionTable = '<div class="option__list--table">%s</div>';
    var optionRow = '<div class="option__list--row">%s</div>';
    var optionCell = '<div class="option__list--cell">%s</div>';
    var optionOrder = [
        'model',
        'headrest',
        'material',
        'color',
        'seam',
        'cross',
        'additional_legs',
        'additional_stop',
        'crystals'/*,
        'logo',*/
    ];

    function _replacer (markup, string, ptrn) {
        ptrn = ptrn || /%s/g;
        return markup.replace(ptrn, string);
    }


    /** */
    ArmChair.prototype.getPrice = function (model, key, value) {
        var price = '-';
        if (!!value) {
            var prices = this.params.prices[model];
            if (prices && prices[key]) {
                if (typeof prices[key] == 'object') {
                    var val = prices[key][value];
                    if (!!val) {
                        price = val;
                    }
                } else {
                    price = prices[key];
                }
            }
        }
        return price;
    };


    /** Набор списка опций
     */
    ArmChair.prototype.setOptionList = function () {
        var rows = [];
        var object = {};
        var self = this;
        var model = INSTANCE.render.model;
        var instancePrice = 0;
        var additionalFlag = true;
        var logoFlag = true;
        for (var key in INSTANCE) {
            var value = INSTANCE.render[key];
            if (key === 'render' || key === 'price' || key === 'color_add') {
                continue;
            }
            var keyer = key;
            if (key == 'additional_legs' || key == 'additional_stop') {
                keyer = 'additional';
            } else if (key == 'logo_back' || key == 'logo_headrest') {
                keyer = 'logo';
            }
            var $optionEl = $('#constructor__option--' + keyer);
            if (!!this.ignors[model][key] && this.ignors[model][key].disableAll) {
                if (!INSTANCE.seam && key !== "crystals") {
                    $optionEl.addClass(IS_IGNOR_ALL);
                }
            }
            if ($optionEl.hasClass(IS_IGNOR_ALL)) {
                if (this.ignors[model][key] && this.ignors[model][key].notInclude) {
                    continue;
                }
            }
            var cell = optionCell;
            var $optionVal = $optionEl.find('.js-option-selected-val');
            var html = $optionVal.html();
            var txt;
            if (!!html && html.length) {
                txt = html;
            } else {
                txt = $optionVal.data('empty');
            }
            txt = _replacer(cell, txt);
            object[key] = [];
            var delAction = ' js-option-list-action--del';
            var editAction = ' js-option-list-action--edit';
            var disAction = ' _disalow';
            var ignore = this.ignors[model];
            if ((key == 'logo_back' || key === 'logo_headrest') && logoFlag) {
                var key_price = self.getPrice(model, 'logo', true)
            } else {
                var key_price = self.getPrice(model, key, value);
            }
            if (key_price !== '-') {
                instancePrice += parseFloat(key_price);
                key_price = '<span class="option-price">' + setPrettyPrice(key_price) + '</span> ' + currency + '.';
            }
            if (value === undefined || value === false) {
                delAction = disAction;
            }
            switch (key) {
                case 'model':
                    delAction = disAction;
                    object[key] = [
                        _replacer(cell, TRS.model)
                    ];
                    INSTANCE.order.model = {
                        name: "Модель",
                        value: html
                    };
                    break;
                case 'headrest':
                    delAction = disAction;
                    if (ignore.headrest && ignore.headrest.set) {
                        if (ignore.headrest.set.key === false) {
                            editAction = disAction;
                        }
                    }
                    object[key] = [
                        _replacer(cell, TRS.headrest)
                    ]
                    INSTANCE.order.headrest = {
                        name: "Подголовник",
                        value: html
                    }
                    break;
                case 'material':
                    object[key] = [
                        _replacer(cell, TRS.material)
                    ]
                    INSTANCE.order.material = {
                        name: "Материал",
                        value: html
                    }
                    break;
                case 'color':
                    var color_add = INSTANCE.render.color_add;
                    if (!!color_add) {
                        var add_key_price = self.getPrice(model, 'color_add', color_add);
                        instancePrice += parseFloat(add_key_price);
                        key_price += '<br/><span class="option-price--add"><span class="option-price">' + setPrettyPrice(add_key_price) + '</span> ' + currency + '.</span>';
                    }
                    object[key] = [
                        _replacer(cell, TRS.color)
                    ]
                    INSTANCE.order.color = {
                        name: "Цвет",
                        value: (html.indexOf("<br>") > -1) ? html.replace('<br>', '; ') : html
                    }
                    break;
                case 'seam':
                    object[key] = [
                        _replacer(cell, TRS.seam)
                    ]
                    INSTANCE.order.seam = {
                        name: "Дизайнерский шов",
                        value: html
                    }
                    break;
                case 'cross':
                    delAction = disAction;
                    object[key] = [
                        _replacer(cell, TRS.cross)
                    ]
                    INSTANCE.order.cross = {
                        name: "Крестовина",
                        value: html
                    }
                    break;
                case 'crystals':
                    object[key] = [
                        _replacer(cell, TRS.crystal)
                    ]
                    if (INSTANCE.render.crystal) {
                        INSTANCE.order.crystals = {
                            name: "Кристалы Сваровски",
                            value: html
                        }
                    }

                    break;
                case 'logo_back':
                case 'logo_headrest':
                    if (logoFlag) {
                        key = 'logo';
                        object.logo = [
                            _replacer(cell, TRS.logo)
                        ];
                        logoFlag = false;
                    }
                    break;
                case 'additional_stop':
                case 'additional_legs':
                    if (additionalFlag) {
                        var additional_stop = INSTANCE.render.additional_stop;
                        var additional_legs = INSTANCE.render.additional_legs;
                        var stop_key_price;
                        var legs_key_price;
                        object[key] = [
                            _replacer(cell, TRS.additional)
                        ];
                        if (additional_stop) {
                            stop_key_price = self.getPrice(model, 'additional_stop', additional_stop);
                        }
                        if (additional_legs) {
                            legs_key_price = self.getPrice(model, 'additional_legs', additional_legs);
                        }
                        if (additional_stop && additional_legs) {
                            key_price = '<span><span class="option-price">' + setPrettyPrice(stop_key_price) + '</span> ' + currency + '.</span><br/><span><span class="option-price">' + setPrettyPrice(legs_key_price) + '</span> ' + currency + '.</span>';
                            INSTANCE.order.additional = {
                                name: "Дополнительные опции",
                                value: TRS.additional_stop + ' + ' + TRS.additional_legs
                            }
                        } else if (additional_stop) {
                            key_price = '<span><span class="option-price">' + setPrettyPrice(stop_key_price) + '</span> ' + currency + '.</span>';
                            INSTANCE.order.additional = {
                                name: "Дополнительные опции",
                                value: TRS.additional_stop
                            }
                        } else if (additional_legs) {
                            key_price = '<span><span class="option-price">' + setPrettyPrice(legs_key_price) + '</span> ' + currency + '.</span>';
                            INSTANCE.order.additional = {
                                name: "Дополнительные опции",
                                value: TRS.additional_legs
                            }
                        } else {
                            delete INSTANCE.order.additional;
                        }
                        additionalFlag = false;
                    }

                    break;
            }

            if (object[key].length) {
                object[key].push(txt);
                object[key].push(_replacer(cell, key_price));
                object[key].push(_replacer(cell, '' +
                    '<div class="option-list-action' + editAction + '" data-option="' + keyer + '">' +
                    '<div class="svg-holder"><svg><use xlink:href="#icon_edit" /></svg></div>' +
                    '</div>'
                ));
            } else {
                delete object[key];
            }
        }
        INSTANCE.price = instancePrice;
        INSTANCE.render.price = instancePrice;
        INSTANCE.order.price = {
            name: "Цена",
            value: instancePrice + ' ' + currency
        };
        instancePrice = setPrettyPrice(instancePrice);
        $('.js-result-price').html(instancePrice);
        if (editAction == disAction) {
            delAction = disAction;
        }
        for (var i = 0; i < optionOrder.length; i++) {
            var key = optionOrder[i];
            if (object.hasOwnProperty(key)) {
                rows.push(_replacer(optionRow, object[key].join('\n')))
            }
        }
        var markup = _replacer(optionTable, rows.join('\n'));
        this.$options_list_selected.find('.option__list-content').html(markup);
    }


    /** Активация следующей опции
     * @param {Object} option - jQuery элемент (constructor__option)
     */
    ArmChair.prototype.setActiveNextOption = function ($option, open, togg) {
        if (typeof $option != "undefined" && $option.hasClass('js-jump-from')) {
            var $nextOption = $('.js-jump-to');
        } else if (typeof $option != "undefined") {
            var $nextOption = $option.next(OPTION_SELECTOR);
        }

        if (typeof $nextOption !== "undefined" && $nextOption.length) {
            if ($nextOption.hasClass(IS_IGNOR_ALL)) {
                this.setActiveNextOption($nextOption, open, true);
                if ($option.prop('id') == 'constructor__option--color' && open != true) {
                    if ($option.find('.list-todo__controller--checked').hasClass(IS_IGNOR)) {
                        $option.removeClass(IS_OPENED);
                    }
                } else {
                    $option.removeClass(IS_OPENED);
                }
            } else {
                $nextOption.addClass(IS_ALLOWED);
                mobileItem($nextOption).addClass(IS_ALLOWED);
                if (NEW_RENDER) {
                    _simpleLoad($nextOption.find('.js-simple-load'));
                }
                if (open && NEW_RENDER) {
                    $option.removeClass(IS_OPENED);
                    $('.constructor__result').removeClass('fixTop');
                    if (!$nextOption.hasClass(IS_IGNOR_ALL)) {
                        $nextOption.addClass(IS_OPENED);
                        bottomCheck($nextOption);
                    }
                }
            }
        } else {
            if (togg) {
                $('.mfiOrder').trigger('click');
            }
        }
    }

    ArmChair.prototype.setActivePrevOption = function ($option, open) {
        var $prevOption;
        if ($option.hasClass('js-jump-to')) {
            $prevOption = $('.js-jump-from');
        } else {
            $prevOption = $option.prev(OPTION_SELECTOR);
        }

        if ($prevOption.length) {
            if ($prevOption.hasClass(IS_IGNOR_ALL)) {
                this.setActivePrevOption($prevOption, open);
                $option.removeClass(IS_OPENED);
            } else {
                $prevOption.addClass(IS_ALLOWED);
                mobileItem($prevOption).addClass(IS_ALLOWED);
                if (open) {
                    $option.removeClass(IS_OPENED);
                    $('.constructor__result').removeClass('fixTop');
                    if (!$prevOption.hasClass(IS_IGNOR_ALL)) {
                        $prevOption.addClass(IS_OPENED);
                        bottomCheck($prevOption);
                    }
                }
            }
        }
    }


    /** Открытие / закрытие опции
     * @param {string|Object} value - строка-селектор или DOM элемент
     */
    ArmChair.prototype.toggleOption = function (value) {
        var $option = _getRootOption(value);
        var allowFlag = $option.hasClass(IS_ALLOWED);
        if (allowFlag) {
            var addFlag = !$option.hasClass(IS_OPENED);
            $(OPTION_SELECTOR).removeClass(IS_OPENED);
            $('.constructor__result').removeClass('fixTop');
            if (addFlag) {
                $option.addClass(IS_OPENED);
                bottomCheck($option);
                _simpleLoad($option.find('.js-simple-load'));
            }
        }
    }


    /**  */
    ArmChair.prototype.clearColor = function (add) {
        var $color = $('#constructor__option--color');
        this.resetOneOption($color);
    }


    /** Выбор опции
     * @param {Object} el - DOM элемент
     */
    ArmChair.prototype.selectOption = function (el, data, bool) {

        if (typeof data == 'undefined') {
            var $el = (el.jquery) ? el : $(el);
            var $item = _getOptionItem($el);
            var $option = _getRootOption($item);
            var Name = _getMethodName($option);
            var Selected = $item.data('select');
        } else {
            var Name = data.name;
            var Selected = data;
            var $option = _getRootOption(data.$item);
        }


        var Key = Selected.key;
        var Value = Selected.value;
        var Flag = true;
        var toInst = true;

        switch (Name) {
            case 'headrest':
                if (bool == 'click') {
                    $('#constructor__option--headrest .js-option-next').trigger(CLICKVAR);
                }
                break;
            case 'logo':
            case 'additional':
                Name = Key;
                Key = !$item.hasClass(IS_SELECTED);
                break;
            case 'material':
                var colorBG = $('#constructor__option--color > .option__list');
                colorBG.removeAttr('class').addClass('option__list');
                colorBG.addClass('option__list--material-' + Key.toLowerCase());
                this.clearColor();
                $('#constructor__option--material .js-option-next').trigger(CLICKVAR);
                break;
            case 'model':
                var seamBG = $('#constructor__option--seam > .option__list');
                seamBG.removeAttr('class').addClass('option__list');
                $('.option__list--table').html('');
                var seamGroup = this.params.seams[Key];
                if (!!seamGroup) {
                    seamBG.addClass('option__list--model-' + seamGroup.toLowerCase());
                }
                if (NEW_RENDER) {
                    $option.removeClass(IS_OPENED);
                    $('.constructor__result').removeClass('fixTop');
                    INSTANCE.render.model = Key;
                }
                if (Key == 'diamond') {
                    $('#constructor__option--cross').removeClass('default-cross');
                } else {
                    $('#constructor__option--cross').addClass('default-cross');
                }
                break;
            case 'color':
                $option.find('.list-todo__controller').removeClass(IS_HIDDEN);
                if (Selected.add) {
                    Name += '_add';
                    COLOR_ADD = TRS.color_add + Value;
                } else {
                    $('.option-color-disable').removeClass('option-color-disable');
                    if (!!el) {
                        var index = $(el).index();
                        var $disAdd = $(this.$color_add.find('.option-item')[index]);
                        $disAdd.addClass('option-color-disable');
                        if ($disAdd.hasClass(IS_SELECTED)) {
                            $disAdd.removeClass(IS_SELECTED);
                            COLOR_ADD = '';
                            delete INSTANCE.color_add;
                            delete INSTANCE.render.color_add;
                        }
                    }
                    if (this.$color_add.hasClass(IS_HIDDEN)) {
                        COLOR_ADD = '';
                        delete INSTANCE.color_add;
                        delete INSTANCE.render.color_add;
                    }
                    COLOR_MAIN = TRS.color_main + Value;
                }
                Value = COLOR_MAIN + COLOR_ADD;
                break;
        }

        for (var i = 0; i < this.closeOn.length; i++) {
            if (Name == this.closeOn[i]) {
                $option.removeClass(IS_OPENED);
                $('.constructor__result').removeClass('fixTop');
            }
        }
        ;

        if (Flag) {
            INSTANCE[Name] = Key;
            this.setActiveItem($item, $option, Value, typeof data == 'undefined');
            this.setRenderOptions(Name);
            this.setActiveNextButton($option);
            if (!$option.hasClass('constructor__option--additional')) {
                this.setActiveNextOption($option);
            }
        }

        $('.' + IS_IGNOR_ALL).removeClass(IS_ALLOWED);
    }

    function _componentToHex (c) {
        var hex = c.toString(16);
        var res = (hex.length == 1) ? "0" + hex : hex;
        return res;
    }

    function _rgbToHex (r, g, b) {
        return _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
    }

    function _getContrast50 (hexcolor) {
        return (parseInt(hexcolor, 16) > 0xffffff / 2) ? 'black' : 'white';
    }

    /** Описание
     */
    ArmChair.prototype.setMatColor = function () {
        var $colorMain = $('#constructor__option--color--main');
        var $colorMainList = $colorMain.children('.grid-list');
        var $colorAdd = $('#constructor__option--color--add');
        var materials = this.params.materials;
        $colorMainList.children('li').each(function (i, el) {
            var $li = $(el);
            var val = $li.data('select').key;
            for (var group in materials) {
                for (var key in materials[group]) {
                    var color = materials[group][key];
                    if (val === color) {
                        $li.addClass('option-item--is-' + group + '-material')
                        break;
                    }
                }
            }
        });
        var colorClone = $colorMain.html();
        $colorAdd.html(colorClone);
        $colorAdd.find('.js-option-select').each(function (i, el) {
            var $el = $(el);
            $el.data('select').add = true;
        });
    }

    /** Описание
     */
    ArmChair.prototype.setColor = function () {
        var $elements = $('.js-set-color');
        $elements.each(function (index, el) {
            var color = el.style.color;
            el.style.backgroundColor = color;
        });
    }

    /** Описание
     */
    ArmChair.prototype.toggleOnOff = function ($this, opt, $opt) {
        var AC = this;
        var key = $this.prop('checked');
        var value;
        switch (opt) {
            case 'crystals':
                value = (key) ? TRS.added : TRS.removed;
                break;
            default:
                value = (key) ? TRS.on : TRS.off;
        }
        this.selectOption(null, {
            name: opt,
            key: key,
            value: value,
            $item: $this
        });
        if (opt == 'seam') {
            var $CRST = $('#constructor__option--crystals');
            if (key) {
                $CRST.removeClass(IS_IGNOR_ALL)
                if ($CRST.next().hasClass(IS_ALLOWED)) {
                    $CRST.addClass(IS_ALLOWED)
                    mobileItem($CRST).addClass(IS_ALLOWED)
                }
            } else {
                AC.selectOption(null, {
                    name: 'crystals',
                    key: false,
                    value: TRS.msg,
                    $item: AC.$options.find('.js-toggle-crystals')
                });
                $CRST.find('input').prop('checked', false);
                $CRST
                    .removeClass(IS_ALLOWED)
                    .addClass(IS_IGNOR_ALL);
                mobileItem($CRST).removeClass(IS_ALLOWED)
            }
        }// else {
        AC.setActiveNextOption($opt, true);
        // }
    }

    /** Описание
     */
    ArmChair.prototype.toggleAddColor = function ($input) {
        var checked = $input.prop('checked');
        var func = 'addClass';
        var color = '$color_main';
        if (checked) {
            func = 'removeClass';
            color = '$color_add';
        }
        this.$color_add[func](IS_HIDDEN);
        var $selected = this[color].find(ITEM_SELECTOR + '.' + IS_SELECTED);
        if ($selected.length) {
            this.selectOption($selected);
        }
    }


    /** Сбор элементов конструктора */
    ArmChair.prototype.elements = function () {
        // элемент конструктора
        this.$constructor = $('#constructor');
        // опции конструктора
        this.$options = $('.constructor__option');
        // списки опций конструктора
        this.$options_list = $('.option__list-content');
        // список главных цветов
        this.$color_main = $('#constructor__option--color--main');
        // список цветов вставок
        this.$color_add = $('#constructor__option--color--add');
        // кнопка открытия опции
        this.$show_options_list = $('.js-show-options-list');
        // список выбраных опций
        this.$options_list_selected = $('#constructor__option--list');
    }


    /** Установка обработчиков на элементы конструктора */
    ArmChair.prototype.handlers = function () {
        // ссылка на контекста
        var AC = this;

        // открытие / закрытие опции
        this.$options.on(CLICKVAR, '.js-option-toggle', function (event) {
            AC.toggleOption(this);
        });

        // закрытие опции
        this.$options.on(CLICKVAR, '.js-option-close', function (event) {
            var $option = _getRootOption(this);
            $option.removeClass(IS_OPENED);
            $('.constructor__result').removeClass('fixTop');
        });

        // переход к следующей опции
        this.$options.on(CLICKVAR, '.js-option-next', function (event) {
            var $option = _getRootOption(this);
            if ($option.hasClass('js-all-steps')) {
                AC.$options_list.addClass(IS_OPENED);
                bottomCheck(AC.$options_list);
            } else {
                AC.setActiveNextOption($option, true, true);
            }
        });

        // переход к следующей опции
        this.$options.on(CLICKVAR, '.js-option-prev', function (event) {
            var $option = _getRootOption(this);
            if ($option.hasClass('js-all-steps')) {
                AC.$options_list.addClass(IS_OPENED);
                bottomCheck(AC.$options_list);
            } else {
                AC.setActivePrevOption($option, true);
            }
        });

        // вкл. / выкл. дополнительного цвета
        this.$options.on('change', '.js-additional-color', function (event) {
            AC.toggleAddColor($(this));
        });

        // вкл. / выкл. Дизайнерский шов
        this.$options.on('change', '.js-toggle-seam', function (event) {
            var $option = _getRootOption(this);
            AC.toggleOnOff($(this), 'seam', $option);
        });

        // вкл. / выкл. Дизайнерский шов
        this.$options.on('change', '.js-toggle-crystals', function (event) {
            AC.toggleOnOff($(this), 'crystals');
        });

        // выбор параметра опции
        this.$options_list.on(CLICKVAR, '.js-option-select', function (event) {
            if ($(this).hasClass('option-color-disable')) {
                return false;
            }
            var bool = '';
            if (event.hasOwnProperty('originalEvent')) {
                if (event.originalEvent.isTrusted) {
                    bool = "click"
                }
            }
            AC.selectOption(this, undefined, bool);
        });

        // открытие списка опций
        this.$show_options_list.on(CLICKVAR, function (event) {
            event.preventDefault();
            $('.is-opened').removeClass('is-opened');
            AC.$options_list_selected.addClass(IS_OPENED);
            bottomCheck(AC.$options_list_selected);
        });

        // редактирование опции
        this.$options_list_selected.on(CLICKVAR, '.js-option-list-action--edit', function (event) {
            event.preventDefault();
            var $opt = $('#constructor__option--' + $(this).data('option'));
            $opt.children('.js-option-toggle').trigger('click');
        });

        // удаление опции
        this.$options_list_selected.on(CLICKVAR, '.js-option-list-action--del', function (event) {
            event.preventDefault();
            var opt = $(this).data('option');
            var $opt = $('#constructor__option--' + opt);
            var flagAllow = $opt.hasClass(IS_ALLOWED);
            switch (opt) {
                case 'headrest':
                case 'material':
                case 'color':
                case 'seam':
                case 'additional':
                case 'crystals':
                case 'logo':
                    AC.resetOneOption($opt);
                    break;
            }
            if (flagAllow) {
                $opt.addClass(IS_ALLOWED);
                mobileItem($opt).addClass(IS_ALLOWED);
            }
            $(this).closest('.option__list--row').remove();
            $opt.find('.js-option-select').removeClass(IS_SELECTED);
            $opt.find('.js-option-selected-val').html('');
            if (opt === 'additional') {
                delete INSTANCE.additional_legs;
                delete INSTANCE.additional_stop;
                delete INSTANCE.render.additional_legs;
                delete INSTANCE.render.additional_stop;
                AC.runCallback('Render', [INSTANCE.render, 'additional_legs', false]);
                AC.runCallback('Render', [INSTANCE.render, 'additional_stop', START]);
            } else {
                if (opt === 'logo') {
                    delete INSTANCE.logo_back;
                    delete INSTANCE.logo_headrest;
                    delete INSTANCE.render.logo_back;
                    delete INSTANCE.render.logo_headrest;
                } else {
                    delete INSTANCE[opt];
                    delete INSTANCE.render[opt];
                }
                AC.runCallback('Render', [INSTANCE.render, opt, START]);
            }
        });


        $('.js-fullscreen-toggle').on(CLICKVAR, function (event) {
            event.preventDefault();
            var $body = $('body');
            if ($body.hasClass('is-fullscreen')) {
                cancelFullscreen();
                $body.removeClass('is-fullscreen')
            } else {
                launchFullScreen(document.documentElement);
                $body.addClass('is-fullscreen')
            }
            kulich3d.resize();
        });
    }

    /** рендер базовой модели */
    ArmChair.prototype.preRender = function () {
        // контект конструктора
        var AC = this;
        /*AC.$options.each(function(i, el) {
         if (el.id.length) {
         var $selected = $(el).find(ITEM_SELECTOR+'.'+IS_SELECTED).first();
         if ($selected.length) {
         var model = $selected.data('select').key;
         AC.selectOption($selected);
         _simpleLoad($(el).find('.js-simple-load'));
         }
         }
         });*/
        var $selected = $('#' + IS_SELECTED);
        if ($selected.length) {
            var model = $selected.data('select').key;
            INSTANCE.model = model;
            AC.selectOption($selected);
        }
        AC.runCallback('Render', [INSTANCE.render, undefined, START]);
        PRE_RENDER = false;
    }

    /** Метод инициализации конструктора */
    ArmChair.prototype.startPreRender = function () {
        this.preRender();
    }

    /** Метод инициализации конструктора */
    ArmChair.prototype.initialize = function () {
        this.setMatColor();
        this.elements();
        this.handlers();
        this.setColor();
    }

    /** #### window.ArmChair
     добавляем к объекту `window` новый конструктор `ArmChair`.
     * @name WDOCS_FROM
     */
    window.ArmChair = new ArmChair();

})(jQuery, window);


jQuery(document).ready(function ($) {

    $(document).on('keydown keyup', function (e) {
        ctrl = e.ctrlKey;
        alt = e.altKey;
    });

    $('#constructor__option--color').on('click', '.js-option-next', function (event) {
        event.preventDefault();
        $('.show-on-order').addClass('show-order');
    });

    $(document).on('click', '.js-order', function (event) {
        $('.is-opened').removeClass('is-opened');
        $('#constructor').addClass('open-order');
    });

    $('.js-form-close').on('click', function (event) {
        $('#constructor').removeClass('open-order');
    });

    $('.orId').on('change', function (event) {
        var c1 = false;
        var c2 = false;
        if ($(this).valid()) {
            c1 = false;
            c2 = true;
        } else {
            c1 = true;
            c2 = false;
        }
        $('#form-check1').prop('checked', c1);
        $('#form-check2').prop('checked', c2);
    });


    var $showBlock;

    function showBlockHeight () {
        $showBlock = $showBlock || $('.constructor__show-block');
        if ($showBlock.length) {
            var top = $('.constructor__options--top').height();
            var bottom = $('.constructor__options--bottom').height();
            var height = $(window).innerHeight();
            if ($(window).width() > 750) {
                height = height - (top + bottom);
            }
            if (height < 400) height = 400;
            $showBlock.css('padding-top', height - 70);
            $('.option__list').css('padding-top', height - 70);
        }
    }

    showBlockHeight();
    $(window).resize(function (event) {
        showBlockHeight();
    });

});


/** ---
 * @name WDOCS_DESCR
 */

/** #### jQuery(document).ready()
 * @name WDOCS_FROM
 */
jQuery(document).ready(function ($) {

    wPreloader.config({
        delay: 500,
        mainClass: 'demo',
        markup: '<div class="windows8"> <div class="wBall" id="wBall_1"> <div class="wInnerBall"></div> </div> <div class="wBall" id="wBall_2"> <div class="wInnerBall"></div> </div> <div class="wBall" id="wBall_3"> <div class="wInnerBall"></div> </div> <div class="wBall" id="wBall_4"> <div class="wInnerBall"></div> </div> <div class="wBall" id="wBall_5"> <div class="wInnerBall"></div> </div> </div>'
    });


    wPreloader.show($('#constructor'));
    var firstPreloader = true;

    var renderTimer;

    /** коллбек рендера после сменны данных
     * @param {Object} options - объект параметров из ветки ArmChair.instance.render
     * @param {string|undefined} property - свойство (ключ опции), которое вызвало коллбек, при первом рендере (preRender) - `undefined`
     * @param {Boolean} start - флаг для старта рендера
     */
    ArmChair.Render = function (options, property, start) {
        if (start && property == 'model') {
            wPreloader.hide();
            wPreloader.show(this.$constructor);
            kulich3d.changeModel(options);
        } else if (start) {
            kulich3d[property](options, options[property]);
        }

        $.cookie('kulik3d', JSON.stringify(options));
    };


    ArmChair.closeOn = [
        'model',
        'headrest',
        'material'
    ];


    ArmChair.params = {
        seams: {
            diamond: 'design',
            grand: 'design',
            royal: 'design',
            business: 'design',
            elegance: 'design',
            imperial: 'fashion',
            jet: 'quatro',
            victory: 'quatro',
            pyramid: 'quatro',
            monarch: 'aristo',
            galaxy: 'zeta'
        },
        materials: {
            "genuine-leather": {
                black: '#151515',
                white: '#fcfcfc',
                green: '#0d2013',
                beige: '#a4866a',
                red: '#70141d',
                whiskey: '#2d150b',
                gold: '#c08920'
            },
            "azur": {
                black: '#252525',
                crim: '#b9a68f',
                caramel: '#755f4e',
                bronze: '#7a5038',
                chocolate: '#3c2518',
                silver: '#666565',
                gray: '#373131',
                pink: '#82235b',
                purple: '#41222d',
                orange: '#b44521',
                djunce: '#2e4055',
                turquoise: '#008a93',
                olive: '#8c8722',
                coral: '#892b41'
            },
            "antara": {
                black: '#141414',
                olive: '#6d783c',
                cobalt: "#18253c",
                turquoise: '#2d758c',
                violet: '#381948',
                red: '#731413',
                honeyed: '#a56830',
                duna: '#896d53',
                pink: '#843053',
                silver: '#9d9d9d',
                chestnut: '#23140b',
                carrot: "#8c3519"
            },
            "faux-leather": {
                black: '#141414',
                white: '#cfc8b9',
                green: '#213421',
                beige: '#a7865f',
                red: '#731414',
                gray: '#555555',
                gold: '#c3a65d',
                bordo: '#411212',
                bluelight: '#7192a5',
                orange: '#9b4d14',
                yellow: '#b19710',
                sand: '#b4a581',
                blue: '#202843',
                silver: '#FEFEFE',
                brown: '#50270e'
            },
            "perforated-leather": {
                black: '#141414',
                white: '#cfc8b9',
                red: '#731414',
                gray: '#555555',
                sand: '#b4a581',
                brown: '#50270e'
            }
        }
    };


    ArmChair.ignors = {

        diamond: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            seam: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.built + ' DESIGN'
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },
        monarch: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            seam: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.built + ' ARISTO'
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },

        jet: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },

        grand: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },

        royal: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },

        business: {
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            },
            additional: {
                disableKeys: ['additional_legs']
            }
        },

        imperial: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            }
        },

        victory: {
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            }
        },

        pyramid: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            }
        },

        elegance: {
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            }
        },

        galaxy: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                disableAll: true,
                set: {
                    subtitle: TRS.msg
                }
            }
        },

        classic: {
            seam: {
                checked: false,
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.no_provided
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.msg2
                }
            }
        },

        fly: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            seam: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.no_provided
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            },
            crystals: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.msg2
                }
            }
        },

        trio: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            seam: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.no_provided
                }
            },
            crystals: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.msg2
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            }
        },

        kids: {
            headrest: {
                set: {
                    key: false,
                    subtitle: TRS.built
                }
            },
            seam: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.no_provided
                }
            },
            crystals: {
                notInclude: true,
                disableAll: true,
                set: {
                    subtitle: TRS.msg2
                }
            },
            cross: {
                checked: true,
                disableAll: true,
                set: {
                    subtitle: TRS.chrome
                }
            }
        },
    };

    var pricesUrl = document.getElementById('constructor').getAttribute('data-prices');
    getPrices(pricesUrl, function (data) {
        ArmChair.params.prices = data.prices;

        if (Detector.webgl) {
            ArmChair.initialize();
            kulich3d.init();
        } else {
            $('.constructor__nowebgl').show();
            wPreloader.hide();
        }
    });


    $('.mfi').magnificPopup({
        type: 'inline',
        closeBtnInside: true,
        removalDelay: 300,
        mainClass: 'zoom-in'
    });

    $('.mfiOrder').magnificPopup({
        type: 'inline',
        modal: true,
        removalDelay: 300,
        mainClass: 'zoom-in',
        callbacks: {
            afterClose: function () {
                $('.is-opened').removeClass('is-opened');
                $('#constructor').addClass('open-order');
                $('#fio').focus();
            }
        }
    });

    $('.js-order-trigger').on('click', function () {
        $('.mfiOrder').trigger('click');
    });

    $(document).on('click', '.js-agree', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        var orderData = '<table border="1">';
        var price;
        for (var k in ArmChair.instance.order) {
            if (k == 'price') {
                price = ArmChair.instance.order[k];
            } else {
                orderData += '<tr><td style="padding:5px;">' + ArmChair.instance.order[k].name + '</td><td style="padding:5px;">' + ArmChair.instance.order[k].value + '</td></tr>';
            }
        }
        orderData += '<tr><td style="padding:5px;">' + price.name + '</td><td style="padding:5px;">' + price.value + '</td></tr>';
        orderData += '</table>'
        $('#constructor-data').val(orderData);
    });

    var mTimer;
    $("#menu").mmenu().on('click', '.is-allowed', function (e) {
        clearTimeout(mTimer);
        ArmChair.toggleOption($('#constructor__option--' + $(this).data('id')).children('.js-option-toggle'));
        mTimer = setTimeout(function () {
            mmApi.close();
        }, 200);
    }).on('click', '.show-order', function (e) {
        $('.is-opened').removeClass('is-opened');
        $('#constructor').addClass('open-order');
        clearTimeout(mTimer);
        mTimer = setTimeout(function () {
            mmApi.close();
        }, 200);
    });

    var mmApi = $("#menu").data("mmenu");

    $('.js-show-mmenu').on('click', function (event) {
        event.preventDefault();
        mmApi.open();
    });

    $('.click-label').on('click', function () {
        $(this).parent().find('label').trigger('click');
    });


});
// WDOCS_TO

var camera;

(function ($, window) {

    var scene, renderer, groundMirror;

    var _cf = {
        tween: false,
        model: {
            y_pos: 4
        },
        gui: {
            dev: false,
            parts: false,
            light: false,
            floor: false
        },
        urls: [
            ASSETS_FOLDER + "maps/negz.jpg", ASSETS_FOLDER + "maps/negx.jpg",
            ASSETS_FOLDER + "maps/negy.jpg", ASSETS_FOLDER + "maps/negy.jpg",
            ASSETS_FOLDER + "maps/posz.jpg", ASSETS_FOLDER + "maps/posx.jpg"
        ],
        aoMap: null
    };

    var exceptions = ['birka_top', 'birka_side', 'chrome', 'opora', 'sticker', 'sticker1', 'sticker2', 'sticker3', 'sticker4', 'sticker5'];

    var colorParam = {
        "genuine-leather": {
            '#151515': {
                roughness: 0.6,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            '#fcfcfc': {
                roughness: 0.89,
                metalness: 0.43,
                aoMapIntensity: 0.5
            },
            '#0d2013': {
                roughness: 0.6,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            '#a4866a': {
                roughness: 0.6,
                metalness: 0.1,
                aoMapIntensity: 0.5
            },
            '#70141d': {
                roughness: 0.42,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            '#2d150b': {
                roughness: 0.46,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            '#c08920': {
                roughness: 0.7,
                metalness: 0.3,
                aoMapIntensity: 0.5
            }
        },
        "azur": {
            "#b9a68f": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#755f4e": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#8c6c54": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#7a5038": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#3c2518": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#666565": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#373131": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#252525": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#82235b": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#41222d": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#2e4055": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#008a93": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#b44521": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#892b41": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#8c8722": {
                roughness: 0.85,
                metalness: 0.1,
                aoMapIntensity: 0.8
            }
        },
        "antara": {
            "#141414": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#6d783c": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#18253c": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#2d758c": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#381948": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#23140b": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#731413": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#8c3519": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#a56830": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#896d53": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#843053": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.8
            },
            "#9d9d9d": {
                roughness: 0.8,
                metalness: 0.15,
                aoMapIntensity: 0.8
            }
        },
        "faux-leather": {
            "#141414": {
                roughness: 0.77,
                metalness: 0.21,
                aoMapIntensity: 0.7
            },
            "#cfc8b9": {
                roughness: 0.87,
                metalness: 0.23,
                aoMapIntensity: 0.6
            },
            "#213421": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#a7865f": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#731414": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.7
            },
            "#555555": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.7
            },
            "#c3a65d": {
                roughness: 0.47,
                metalness: 0.27,
                aoMapIntensity: 0.6
            },
            "#411212": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#7192a5": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 1
            },
            "#9b4d14": {
                roughness: 0.68,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#b19710": {
                roughness: 0.68,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#b4a581": {
                roughness: 0.68,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#202843": {
                roughness: 0.68,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#50270e": {
                roughness: 0.57,
                metalness: 0.21,
                aoMapIntensity: 0.6
            },
            "#FEFEFE": {
                roughness: 0.38,
                metalness: 0.53,
                aoMapIntensity: 0.6
            }
        },
        "perforated-leather": {
            "#141414": {
                roughness: 0.77,
                metalness: 0.21,
                aoMapIntensity: 0.7
            },
            "#cfc8b9": {
                roughness: 0.87,
                metalness: 0.23,
                aoMapIntensity: 0.6
            },
            "#731414": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.7
            },
            "#555555": {
                roughness: 0.7,
                metalness: 0.1,
                aoMapIntensity: 0.7
            },
            "#b4a581": {
                roughness: 0.68,
                metalness: 0.1,
                aoMapIntensity: 0.6
            },
            "#50270e": {
                roughness: 0.57,
                metalness: 0.21,
                aoMapIntensity: 0.6
            }
        }

    };

    var RAF,
        KULICH = {},
        restoreModel = false,
        gui,
        INSTANCE,
        textureCube,
        container,
        mirrorStart = false;

    var modelLoad = new THREE.JSONLoader(),
        textureLoader = new THREE.TextureLoader(),
        textureCubeLoader = new THREE.CubeTextureLoader();


    function render () {
        if (mirrorStart) {
            groundMirror.render();
        }
        renderer.render(scene, camera);
    }

    function animate () {
        RAF = requestAnimationFrame(animate);
        render();
    }

    function onWindowResize (event) {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        render();
    }

    function onProgress (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
        }
    }

    function onError (xhr) {
        console.log('Error' + xhr);
    }

    function getObjectsKeys (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    function asyncLoop (iterations, func, callback) {
        var index = 0;
        var done = false;
        var loop = {
            next: function () {
                if (done) {
                    return;
                }

                if (index < iterations) {
                    index++;
                    func(loop);

                } else {
                    done = true;
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            },

            iteration: function () {
                return index - 1;
            },

            break: function () {
                done = true;
                if (typeof callback == 'function') {
                    callback();
                }
            }
        };
        loop.next();
        return loop;
    }

    function objectKeyAdd (original, context) {
        for (var key in context) {
            if (context.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(context[key]) === '[object Object]') {
                    original[key] = objectKeyAdd(original[key] || {}, context[key]);
                } else {
                    original[key] = context[key];
                }
            }
        }
        return original;
    }

    function postMesh (original, context, callback) {
        asyncLoop(Object.keys(context).length, function (loop) {
            if (context.hasOwnProperty(Object.keys(context)[loop.iteration()])) {
                if (Object.prototype.toString.call(context[Object.keys(context)[loop.iteration()]]) === '[object Object]') {
                    original[Object.keys(context)[loop.iteration()]] = postMesh(original[Object.keys(context)[loop.iteration()]] || {}, context[Object.keys(context)[loop.iteration()]], function () {
                        loop.next();
                    });
                } else {
                    var curKey = Object.keys(context)[loop.iteration()];
                    switch (curKey) {
                        case "repeat1111":
                            original[Object.keys(context)[loop.iteration()]] = eval(context[Object.keys(context)[loop.iteration()]]);
                            loop.next();
                            break;
                        default:
                            original[Object.keys(context)[loop.iteration()]] = context[Object.keys(context)[loop.iteration()]];
                            loop.next();
                    }
                }
            }
        }, function () {
            if (typeof callback == 'function') {
                callback();
            }
        });
        return original;
    }

    function meshKey (original, context, callback) {
        asyncLoop(Object.keys(context).length, function (loop) {
            if (context.hasOwnProperty(Object.keys(context)[loop.iteration()])) {
                if (Object.prototype.toString.call(context[Object.keys(context)[loop.iteration()]]) === '[object Object]') {
                    original[Object.keys(context)[loop.iteration()]] = meshKey(original[Object.keys(context)[loop.iteration()]] || {}, context[Object.keys(context)[loop.iteration()]], function () {
                        loop.next();
                    });
                } else {
                    var curKey = Object.keys(context)[loop.iteration()];
                    switch (curKey) {
                        case "map":
                        case "normalMap":
                        case "specularMap":
                        case "bumpMap":
                        case "alphaMap":
                        case "lightMap":
                        case "metalnessMap":
                        case "roughnessMap":
                            textureLoader.load(ASSETS_FOLDER + context[Object.keys(context)[loop.iteration()]], function (tl) {
                                original[Object.keys(context)[loop.iteration()]] = tl;
                                loop.next();
                            });
                            break;
                        case "envMap":
                            original[Object.keys(context)[loop.iteration()]] = textureCube;
                            loop.next();
                            break;
                        case "aoMap":
                            original[Object.keys(context)[loop.iteration()]] = _cf.aoMap;
                            loop.next();
                            break;
                        case "color":
                        case "emissive":
                        case "specular":
                            original[Object.keys(context)[loop.iteration()]] = new THREE.Color(context[Object.keys(context)[loop.iteration()]]);
                            loop.next();
                            break;
                        default:
                            original[Object.keys(context)[loop.iteration()]] = context[Object.keys(context)[loop.iteration()]];
                            loop.next();
                    }
                }
            }
        }, function () {
            if (typeof callback == 'function') {
                callback();
            }
        });
        return original;
    }

    function removeObject (removable_items) {
        removable_items.children.forEach(function (v, i) {
            v.material.dispose();
            v.geometry.dispose();
            scene.remove(removable_items);
        });
    }

    function loaderParts (modelObject, modelData, iterations, callbacks) {

        var keys = getObjectsKeys(modelData);

        modelLoad.load(ASSETS_FOLDER + modelData[keys[iterations]].url, function (object) {
            var mesh;
            object.faceVertexUvs[1] = object.faceVertexUvs[0];
            object.computeVertexNormals();
            object.mergeVertices();
            if (typeof modelData[keys[iterations]].meshType !== "undefined") {
                mesh = new THREE.Mesh(object, new THREE[modelData[keys[iterations]].meshType]());
            } else {
                mesh = new THREE.Mesh(object, new THREE.MeshPhongMaterial());
            }

            meshKey(mesh, modelData[keys[iterations]].mesh, function () {

                if (typeof modelData[keys[iterations]].postMeshMeterial !== "undefined") {
                    postMesh(mesh.material, modelData[keys[iterations]].postMeshMeterial, function () {
                        modelObject.add(mesh);
                        if (typeof callbacks == 'function') {
                            callbacks(mesh);
                        }
                    });

                } else {
                    modelObject.add(mesh);
                    if (typeof callbacks == 'function') {
                        callbacks(mesh);
                    }
                }

                if (modelData[keys[iterations]].model == "modelIn") {
                    if (mesh.name !== 'cristal') {
                        mesh.material.transparent = true;
                        mesh.material.opacity = 0.5;
                    }
                    INSTANCE.model[modelData[keys[iterations]].mesh.name] = mesh;
                }
                if (modelData[keys[iterations]].model == "modelScene") {
                    INSTANCE.scene[modelData[keys[iterations]].mesh.name] = mesh;
                }

            });
        }, onProgress, onError);
    }

    function createSceneModel (modelData, callback) {
        this.modelScene = new THREE.Object3D();
        modelScene.name = "scene";
        asyncLoop(getObjectsKeys(modelData.data).length, function (loop) {
            loaderParts(modelScene, modelData.data, loop.iteration(), function () {
                loop.next();
            });
        }, function () {
            scene.add(modelScene);
            if (typeof callback == 'function') {
                callback();
            }
        });
    }

    function createOsnovaModel (modelData, callback) {
        if (typeof modelOsnova !== "undefined") {
            removeObject(modelOsnova);
        }
        this.modelOsnova = new THREE.Object3D();
        modelOsnova.position.y = _cf.model.y_pos;
        modelOsnova.name = "osnova";
        asyncLoop(getObjectsKeys(modelData.data).length, function (loop) {
            loaderParts(modelOsnova, modelData.data, loop.iteration(), function (e) {
                loop.next();
            });
        }, function () {
            scene.add(modelOsnova);
            INSTANCE.osnova.current = modelData.name;
            if (typeof callback == 'function') {
                callback();
            }
        });
    }

    function createLoadedModel (modelData, callback) {
        modelLoadFile(ASSETS_FOLDER + 'model/osnova' + modelData.osnova + '.json', function () {
            asyncLoop(getObjectsKeys(modelData.osnova_data).length, function (loop) {
                loaderParts(modelOsnova, modelData.osnova_data, loop.iteration(), function (e) {
                    loop.next();
                });
            }, function () {
                if (typeof modelChair !== "undefined") {
                    removeObject(modelChair);
                }
                this.modelChair = new THREE.Object3D();
                modelChair.name = "model";
                modelChair.position.y = _cf.model.y_pos;
                asyncLoop(getObjectsKeys(modelData.model.data).length, function (loop) {
                    loaderParts(modelChair, modelData.model.data, loop.iteration(), function (e) {
                        loop.next();
                    });
                }, function () {
                    scene.add(modelChair);
                    if (typeof callback == 'function') {
                        callback("model");
                    }
                });

                if (typeof modelData.podgolovnik !== "undefined") {
                    if (typeof modelPodgolovnik !== "undefined") {
                        removeObject(modelPodgolovnik);
                    }
                    this.modelPodgolovnik = new THREE.Object3D();
                    modelPodgolovnik.name = "podgolovnik";
                    modelPodgolovnik.position.y = _cf.model.y_pos;
                    modelPodgolovnik.visible = (typeof modelData.podgolovnik.visible == "undefined") ? true : false;
                    asyncLoop(getObjectsKeys(modelData.podgolovnik.data).length, function (loop) {
                        loaderParts(modelPodgolovnik, modelData.podgolovnik.data, loop.iteration(), function (e) {
                            loop.next();
                        });
                    }, function () {
                        scene.add(modelPodgolovnik);
                    });
                } else {
                    if (typeof modelData.podgolovnik == "undefined" && typeof modelPodgolovnik !== "undefined") {
                        removeObject(modelPodgolovnik);
                    }
                }

                if (typeof modelData.osnova_type !== "undefined" && typeof modelOsnova !== "undefined") {
                    if (typeof scene.getObjectByName('poly') !== "undefined" && typeof scene.getObjectByName('chrome') !== "undefined") {
                        if (modelData.osnova_type == "poly") {
                            scene.getObjectByName('poly').visible = true;
                            scene.getObjectByName('chrome').visible = false;
                        } else if (modelData.osnova_type == "chrome") {
                            scene.getObjectByName('chrome').visible = true;
                            scene.getObjectByName('poly').visible = false;
                        }
                    }
                }

                if (typeof modelData.wheel_patch !== "undefined") {
                    if (typeof scene.getObjectByName('wheel_patch') !== "undefined") {
                        if (modelData.wheel_patch == "plastic") {
                            scene.getObjectByName('wheel_patch').material.roughness = 0.8;
                            scene.getObjectByName('wheel_patch').material.metalness = 0.5;
                            scene.getObjectByName('wheel_patch').material.color = new THREE.Color('#222');
                        }
                    }
                }
            });
        });
    }

    function modelLoadFile (json, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                if (typeof data.aomap !== "undefined") {
                    textureLoader.load(ASSETS_FOLDER + data.aomap, function (e) {
                        _cf.aoMap = e;
                        if (data.type === "model") {
                            _cf.data = data;
                            if (typeof data.model.seam !== "undefined") {
                                INSTANCE.seam = data.model.seam;
                            } else {
                                INSTANCE.seam = null;
                            }
                            if (typeof data.param !== "undefined") {
                                INSTANCE.param.offset.x = data.param.offset.x;
                                INSTANCE.param.offset.y = data.param.offset.y;
                            }
                            createLoadedModel(data, function () {
                                if (typeof callback == 'function') {
                                    callback();
                                }
                            });
                        }
                    });
                } else {
                    if (data.type === "osnova") {
                        createOsnovaModel(data, function () {
                            if (typeof callback == 'function') {
                                callback();
                            }
                        });
                    }
                }
            }
        };
        xmlhttp.open("GET", json, true);
        xmlhttp.send();
    }

    function sceneLoadFile (json, callback) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                createSceneModel(JSON.parse(xmlhttp.responseText), function () {
                    if (typeof callback == 'function') {
                        callback(false);
                    }
                });
            }
        };
        xmlhttp.open("GET", json, true);
        xmlhttp.send();
    }

    function quickUpdate () {
        var timer;
        clearTimeout(timer);
        timer = setTimeout(function () {
            animate();
            window.cancelAnimationFrame(RAF);
        }, 100);
    }

    function changeIco (modelName) {
        $('.js-headrest-true').attr({
            'src': ASSETS_FOLDER + 'images/headrest/' + modelName + '--true.png'
        });
        $('.js-headrest-false').attr({
            'src': ASSETS_FOLDER + 'images/headrest/' + modelName + '--false.png'
        });
    }

    function kulich3d () {
        this.instance = {};
        INSTANCE = this.instance;
        INSTANCE.scene = {};
        INSTANCE.param = {
            offset: {
                x: 0,
                y: 0
            }
        };
        INSTANCE.model = {};
        INSTANCE.json = {};
        INSTANCE.osnova = {};
        INSTANCE.material = {};
    }

    function disableOpacity () {
        for (var i in INSTANCE.model) {
            if (typeof INSTANCE.model[i].material !== "undefined") {
                if (i !== 'cristal') {
                    INSTANCE.model[i].material.transparent = false;
                    INSTANCE.model[i].material.opacity = null;
                }
            }
        }
        INSTANCE.opacity = false;
    }

    function isEx (elem) {
        return typeof elem !== "undefined";
    }

    kulich3d.prototype.elements = function () {
        container = document.getElementById('modelView');
        this.windowWidth = container.offsetWidth;
        this.windowHeight = container.offsetHeight;
        this.aspectRatio = this.windowWidth / this.windowHeight;
    };

    kulich3d.prototype.light = function () {
        ambientLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight);

        this.spot0 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
        this.spot0.position.set(1470, 1470, -590);
        scene.add(this.spot0);


        this.spot1 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
        this.spot1.position.set(1470, 1470, 590);
        scene.add(this.spot1);

        this.spot2 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
        this.spot2.position.set(-1450, 500, -2280);
        scene.add(this.spot2);

        this.spot3 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
        this.spot3.position.set(-1175, 500, 2130);
        scene.add(this.spot3);
    };

    kulich3d.prototype.controls = function () {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 640, 0);
        controls.minPolarAngle = 0.8;
        controls.maxPolarAngle = 1.7;
        controls.minDistance = 970;
        controls.maxDistance = 3800;
        controls.noPan = true;
    };

    kulich3d.prototype.camera = function () {
        camera = new THREE.PerspectiveCamera(45, this.aspectRatio, 1, 50000);
        camera.position.set(3400, 1592, -48);
        camera.lookAt(scene.position);
        scene.add(camera);
    };

    kulich3d.prototype.handlers = function () {
        var _this = this;
        window.addEventListener('resize', onWindowResize, false);
        controls.addEventListener('change', render);
        controls.update();
    };

    kulich3d.prototype.RAF = function (bool) {
        var timer;
        if (bool) {
            animate();
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                window.cancelAnimationFrame(RAF);
            }, 100);
        }
    };

    kulich3d.prototype.updateChair = function () {
        this.RAF(true);
        for (var i = 0; i < modelChair.children.length; i++) {
            modelChair.children[i].material.needsUpdate = true;
        }
        if (typeof modelPodgolovnik !== "undefined") {
            for (var i = 0; i < modelPodgolovnik.children.length; i++) {
                modelPodgolovnik.children[i].material.needsUpdate = true;
            }
        }
        this.RAF(false);
    };

    kulich3d.prototype.resetMap = function (data) {
        for (var i = 0; i < data.length; i++) {
            INSTANCE.model.model_main.material[data[i]] = null;
            INSTANCE.model.model_color.material[data[i]] = null;
            if (typeof INSTANCE.model.model_second !== "undefined") {
                INSTANCE.model.model_second.material[data[i]] = null;
            }
            if (typeof modelPodgolovnik !== "undefined") {
                INSTANCE.model.podgolovnik_main.material[data[i]] = null;
                if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                    INSTANCE.model.podgolovnik_second.material[data[i]] = null;
                }
            }
        }
    };

    kulich3d.prototype.resetParam = function () {
        if (typeof scene.getObjectByName('opora') !== "undefined") {
            scene.getObjectByName('opora').visible = false;
        }
        if (typeof scene.getObjectByName('wheel_patch') !== "undefined") {
            scene.getObjectByName('wheel_patch').material.roughness = 0;
            scene.getObjectByName('wheel_patch').material.metalness = 1;
            scene.getObjectByName('wheel_patch').material.color = new THREE.Color('#d2e5fa');
        }
        if (typeof scene.getObjectByName('stop') !== "undefined") {
            scene.getObjectByName('stop').visible = false;
            scene.getObjectByName('wheel_plastic').visible = true;
            scene.getObjectByName('wheel_rezina').visible = true;
            scene.getObjectByName('wheel_patch').visible = true;
        }

    };

    kulich3d.prototype.resize = function () {
        onWindowResize();
    };

    var test = true;
    kulich3d.prototype.changeModel = function (options) {
        var _this = this;
        this.resetParam();
        modelLoadFile(ASSETS_FOLDER + 'model/' + options.model + '.json', function (e) {
            if (options.model === 'business' || options.model === 'classic' || options.model === 'victory' || options.model === 'elegance') {
                changeIco(options.model);
            }
            INSTANCE.opacity = true;
            animate();
            $('#constructor__option--model').nextAll('.is-allowed').last().children('.js-option-toggle').trigger('click');
            _this.RAF(false);
            if (restoreModel) {
                _this.restoreModel(INSTANCE.cookie, true);
            } else {
                wPreloader.hide();
            }
        });
    };

    kulich3d.prototype.updateAO = function (ao) {
        for (var key in INSTANCE.model) {
            if (exceptions.indexOf(key) < 0) {

                INSTANCE.model[key].material.aoMap = ao;
            }
        }
    };

    kulich3d.prototype.materialParam = function (data, options, add) {
        for (var i = 0; i < data.length; i++) {
            for (var k in colorParam) {
                if (k == options.material) {
                    for (var c in colorParam[k]) {
                        if (add) {
                            if (c == options.color_add) {
                                postMesh(data[i], colorParam[k][c]);
                                break;
                            }
                        } else {
                            if (c == options.color) {
                                postMesh(data[i], colorParam[k][c]);
                                break;
                            }
                        }

                    }
                }
            }
        }
    };

    kulich3d.prototype.resetColor = function () {
        INSTANCE.model['model_main'].material.color = new THREE.Color('#555555');
        if (typeof INSTANCE.model.model_second !== "undefined") {
            INSTANCE.model['model_second'].material.color = new THREE.Color('#555555');
        }
        INSTANCE.model['model_color'].material.color = new THREE.Color('#555555');
        if ("podgolovnik_main" in INSTANCE.model) {
            INSTANCE.model['podgolovnik_main'].material.color = new THREE.Color('#555555');
        }
        if ("podgolovnik_second" in INSTANCE.model) {
            INSTANCE.model['podgolovnik_second'].material.color = new THREE.Color('#555555');
        }
        if ("podgolovnik_color" in INSTANCE.model) {
            INSTANCE.model.podgolovnik_color.material.color = new THREE.Color('#555555');
        }
    };

    kulich3d.prototype.headrest = function (options, bool) {
        var _this = this;
        if (typeof modelPodgolovnik !== "undefined") {
            if (bool) {
                textureLoader.load(ASSETS_FOLDER + _cf.data.aomap2, function (e) {
                    _cf.aoMap = e;
                    modelPodgolovnik.visible = bool;
                    _this.updateAO(e);
                    _this.updateChair();
                });
            } else {
                textureLoader.load(ASSETS_FOLDER + _cf.data.aomap, function (e) {
                    _cf.aoMap = e;
                    modelPodgolovnik.visible = bool;
                    _this.updateAO(e);
                    _this.updateChair();
                });
            }

        }

    };

    kulich3d.prototype.material = function (options, materialName) {
        var _this = this;

        switch (materialName) {
            case "genuine-leather":
                _this.resetMap(["map", "roughnessMap", "metalnessMap"]);
                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '.jpg', function (texture) {
                    texture.wrapS = 1000;
                    texture.wrapT = 1000;
                    texture.repeat.set(5, 5);
                    texture.anisotropy = 14;
                    if (typeof INSTANCE.model.model_second !== "undefined") {
                        INSTANCE.model.model_second.material.bumpScale = 1;
                        INSTANCE.model.model_second.material.roughness = 0.6;
                        INSTANCE.model.model_second.material.metalness = 0.1;
                        INSTANCE.model.model_second.material.bumpMap = texture;
                    }
                    INSTANCE.model.model_color.material.bumpScale = 1;
                    INSTANCE.model.model_color.material.roughness = 0.6;
                    INSTANCE.model.model_color.material.metalness = 0.1;
                    INSTANCE.model.model_color.material.bumpMap = texture;
                    if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                        INSTANCE.model.podgolovnik_second.material.bumpScale = 1;
                        INSTANCE.model.podgolovnik_second.material.roughness = 0.6;
                        INSTANCE.model.podgolovnik_second.material.metalness = 0.1;
                        INSTANCE.model.podgolovnik_second.material.bumpMap = texture;
                    }
                    if (options.seam && options.model !== "monarch") {
                        textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '-' + INSTANCE.seam + '.jpg', function (texture2) {
                            texture2.wrapS = 1000;
                            texture2.wrapT = 1000;
                            texture2.repeat.set(14, 14);
                            texture2.anisotropy = 14;
                            texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                            INSTANCE.model.model_main.material.bumpScale = 1.8;
                            INSTANCE.model.model_main.material.roughness = 0.6;
                            INSTANCE.model.model_main.material.metalness = 0.1;
                            INSTANCE.model.model_main.material.bumpMap = texture2;
                            if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                                INSTANCE.model.podgolovnik_main.material.roughness = 0.6;
                                INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                                INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                            }
                            _this.updateChair();
                        });
                    } else {
                        INSTANCE.model.model_main.material.bumpScale = 1;
                        INSTANCE.model.model_main.material.roughness = 0.6;
                        INSTANCE.model.model_main.material.metalness = 0.1;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1;
                            INSTANCE.model.podgolovnik_main.material.roughness = 0.6;
                            INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                        }
                        _this.updateChair();
                    }
                    $('#constructor').trigger('material:load');
                });
                break;
            case "azur":
                _this.resetMap(["map", "roughnessMap", "metalnessMap"]);
                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/roughness.jpg', function (rougness) {
                    rougness.wrapS = 1000;
                    rougness.wrapT = 1000;
                    rougness.repeat.set(15, 15);
                    rougness.anisotropy = 14;
                    INSTANCE.model.model_main.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.model_second !== "undefined") {
                        INSTANCE.model.model_second.material.roughnessMap = rougness;
                    }
                    INSTANCE.model.model_color.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                        INSTANCE.model.podgolovnik_main.material.roughnessMap = rougness;
                    }
                    if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                        INSTANCE.model.podgolovnik_second.material.roughnessMap = rougness;
                    }
                    textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/azur-map.jpg', function (map) {
                        map.wrapS = 1000;
                        map.wrapT = 1000;
                        map.repeat.set(15, 15);
                        map.anisotropy = 14;
                        INSTANCE.model.model_main.material.map = map;
                        if (typeof INSTANCE.model.model_second !== "undefined") {
                            INSTANCE.model.model_second.material.map = map;
                        }
                        INSTANCE.model.model_color.material.map = map;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.map = map;
                        }
                        if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                            INSTANCE.model.podgolovnik_second.material.map = map;
                        }
                        textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/metalness.jpg', function (metalness) {
                            metalness.wrapS = 1000;
                            metalness.wrapT = 1000;
                            metalness.repeat.set(15, 15);
                            metalness.anisotropy = 14;
                            INSTANCE.model.model_main.material.metalnessMap = metalness;
                            if (typeof INSTANCE.model.model_second !== "undefined") {
                                INSTANCE.model.model_second.material.metalnessMap = metalness;
                            }
                            INSTANCE.model.model_color.material.metalnessMap = metalness;
                            if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                INSTANCE.model.podgolovnik_main.material.metalnessMap = metalness;
                            }
                            if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                                INSTANCE.model.podgolovnik_second.material.metalnessMap = metalness;
                            }
                            textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '.jpg', function (texture) {
                                texture.wrapS = 1000;
                                texture.wrapT = 1000;
                                texture.repeat.set(15, 15);
                                texture.anisotropy = 14;
                                if (typeof INSTANCE.model.model_second !== "undefined") {
                                    INSTANCE.model.model_second.material.bumpScale = 0.8;
                                    INSTANCE.model.model_second.material.roughness = 0.84;
                                    INSTANCE.model.model_second.material.metalness = -0.3;
                                    INSTANCE.model.model_second.material.bumpMap = texture;
                                }
                                INSTANCE.model.model_color.material.bumpScale = 0.8;
                                INSTANCE.model.model_color.material.roughness = 0.84;
                                INSTANCE.model.model_color.material.metalness = -0.3;
                                INSTANCE.model.model_color.material.bumpMap = texture;
                                if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                                    INSTANCE.model.podgolovnik_second.material.bumpScale = 0.8;
                                    INSTANCE.model.podgolovnik_second.material.roughness = 0.84;
                                    INSTANCE.model.podgolovnik_second.material.metalness = -0.3;
                                    INSTANCE.model.podgolovnik_second.material.bumpMap = texture;
                                }
                                if (options.seam && options.model !== "monarch") {
                                    textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '-' + INSTANCE.seam + '.jpg', function (texture2) {
                                        texture2.wrapS = 1000;
                                        texture2.wrapT = 1000;
                                        texture2.repeat.set(14, 14);
                                        texture2.anisotropy = 14;
                                        texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                                        INSTANCE.model.model_main.material.roughness = 0.84;
                                        INSTANCE.model.model_main.material.metalness = -0.3;
                                        INSTANCE.model.model_main.material.map.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                        INSTANCE.model.model_main.material.map.repeat.set(14, 14);
                                        INSTANCE.model.model_main.material.bumpMap = texture2;
                                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                                            INSTANCE.model.podgolovnik_main.material.roughness = 0.84;
                                            INSTANCE.model.podgolovnik_main.material.metalness = -0.3;
                                            INSTANCE.model.podgolovnik_main.material.map.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                            INSTANCE.model.podgolovnik_main.material.map.repeat.set(14, 14);
                                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                                        }
                                        _this.updateChair();
                                    });
                                } else {
                                    INSTANCE.model.model_main.material.bumpScale = 0.8;
                                    INSTANCE.model.model_main.material.roughness = 0.84;
                                    INSTANCE.model.model_main.material.metalness = -0.3;
                                    INSTANCE.model.model_main.material.bumpMap = texture;
                                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                        INSTANCE.model.podgolovnik_main.material.bumpScale = 0.8;
                                        INSTANCE.model.podgolovnik_main.material.roughness = 0.84;
                                        INSTANCE.model.podgolovnik_main.material.metalness = -0.3;
                                        INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                                    }
                                    _this.updateChair();
                                }
                                $('#constructor').trigger('material:load');
                            });
                        });
                    });

                });
                break;
            case "antara":
                _this.resetMap(["map", "roughnessMap", "metalnessMap"]);
                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/roughness.jpg', function (rougness) {
                    rougness.wrapS = 1000;
                    rougness.wrapT = 1000;
                    rougness.repeat.set(14, 14);
                    rougness.anisotropy = 14;
                    INSTANCE.model.model_main.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.model_second !== "undefined") {
                        INSTANCE.model.model_second.material.roughnessMap = rougness;
                    }
                    INSTANCE.model.model_color.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                        INSTANCE.model.podgolovnik_main.material.roughnessMap = rougness;
                    }
                    if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                        INSTANCE.model.podgolovnik_second.material.roughnessMap = rougness;
                    }
                    textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/metalness.jpg', function (metalness) {
                        metalness.wrapS = 1000;
                        metalness.wrapT = 1000;
                        metalness.repeat.set(14, 14);
                        metalness.anisotropy = 14;
                        INSTANCE.model.model_main.material.metalnessMap = metalness;
                        if (typeof INSTANCE.model.model_second !== "undefined") {
                            INSTANCE.model.model_second.material.metalnessMap = metalness;
                        }
                        INSTANCE.model.model_color.material.metalnessMap = metalness;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.metalnessMap = metalness;
                        }
                        if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                            INSTANCE.model.podgolovnik_second.material.metalnessMap = metalness;
                        }
                        textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '.jpg', function (texture) {
                            texture.wrapS = 1000;
                            texture.wrapT = 1000;
                            texture.repeat.set(14, 14);
                            texture.anisotropy = 14;
                            if (typeof INSTANCE.model.model_second !== "undefined") {
                                INSTANCE.model.model_second.material.bumpScale = 1.4;
                                INSTANCE.model.model_second.material.roughness = 0.93;
                                INSTANCE.model.model_second.material.metalness = 0.24;
                                INSTANCE.model.model_second.material.bumpMap = texture;
                            }
                            INSTANCE.model.model_color.material.bumpScale = 1.4;
                            INSTANCE.model.model_color.material.roughness = 0.93;
                            INSTANCE.model.model_color.material.metalness = 0.24;
                            INSTANCE.model.model_color.material.bumpMap = texture;
                            if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                                INSTANCE.model.podgolovnik_second.material.bumpScale = 1.4;
                                INSTANCE.model.podgolovnik_second.material.roughness = 0.93;
                                INSTANCE.model.podgolovnik_second.material.metalness = 0.24;
                                INSTANCE.model.podgolovnik_second.material.bumpMap = texture;
                            }
                            if (options.seam && options.model !== "monarch") {
                                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '-' + INSTANCE.seam + '.jpg', function (texture2) {
                                    texture2.wrapS = 1000;
                                    texture2.wrapT = 1000;
                                    texture2.repeat.set(14, 14);
                                    texture2.anisotropy = 14;
                                    texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                    INSTANCE.model.model_main.material.bumpScale = 1.8;
                                    INSTANCE.model.model_main.material.roughness = 0.93;
                                    INSTANCE.model.model_main.material.metalness = 0.24;
                                    INSTANCE.model.model_main.material.bumpMap = texture2;
                                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                        INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                                        INSTANCE.model.podgolovnik_main.material.roughness = 0.93;
                                        INSTANCE.model.podgolovnik_main.material.metalness = 0.24;
                                        INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                                    }
                                    _this.updateChair();
                                });
                            } else {
                                INSTANCE.model.model_main.material.bumpScale = 1.4;
                                INSTANCE.model.model_main.material.roughness = 0.93;
                                INSTANCE.model.model_main.material.metalness = 0.24;
                                INSTANCE.model.model_main.material.bumpMap = texture;
                                if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                    INSTANCE.model.podgolovnik_main.material.bumpScale = 1.4;
                                    INSTANCE.model.podgolovnik_main.material.roughness = 0.93;
                                    INSTANCE.model.podgolovnik_main.material.metalness = 0.24;
                                    INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                                }
                                _this.updateChair();
                            }
                        });
                        $('#constructor').trigger('material:load');
                    });
                });
                break;
            case "faux-leather":
                _this.resetMap(["map", "roughnessMap", "metalnessMap"]);
                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/roughness.jpg', function (rougness) {
                    rougness.wrapS = 1000;
                    rougness.wrapT = 1000;
                    rougness.repeat.set(14, 14);
                    rougness.anisotropy = 14;
                    INSTANCE.model.model_main.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.model_second !== "undefined") {
                        INSTANCE.model.model_second.material.roughnessMap = rougness;
                    }
                    INSTANCE.model.model_color.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                        INSTANCE.model.podgolovnik_main.material.roughnessMap = rougness;
                    }
                    if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                        INSTANCE.model.podgolovnik_second.material.roughnessMap = rougness;
                    }
                    textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        if (typeof INSTANCE.model.model_second !== "undefined") {
                            INSTANCE.model.model_second.material.bumpScale = 1.1;
                            INSTANCE.model.model_second.material.roughness = 0.7;
                            INSTANCE.model.model_second.material.metalness = 0.1;
                            INSTANCE.model.model_second.material.bumpMap = texture;
                        }
                        INSTANCE.model.model_color.material.bumpScale = 1.1;
                        INSTANCE.model.model_color.material.roughness = 0.7;
                        INSTANCE.model.model_color.material.metalness = 0.1;
                        INSTANCE.model.model_color.material.bumpMap = texture;
                        if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                            INSTANCE.model.podgolovnik_second.material.bumpScale = 1.1;
                            INSTANCE.model.podgolovnik_second.material.roughness = 0.7;
                            INSTANCE.model.podgolovnik_second.material.metalness = 0.1;
                            INSTANCE.model.podgolovnik_second.material.bumpMap = texture;
                        }
                        if (options.seam && options.model !== "monarch") {
                            textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '-' + INSTANCE.seam + '.jpg', function (texture2) {
                                texture2.wrapS = 1000;
                                texture2.wrapT = 1000;
                                texture2.repeat.set(14, 14);
                                texture2.anisotropy = 14;
                                texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                INSTANCE.model.model_main.material.bumpScale = 1.1;
                                INSTANCE.model.model_main.material.roughness = 0.7;
                                INSTANCE.model.model_main.material.metalness = 0.1;
                                INSTANCE.model.model_main.material.bumpMap = texture2;
                                if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                    INSTANCE.model.podgolovnik_main.material.bumpScale = 1.1;
                                    INSTANCE.model.podgolovnik_main.material.roughness = 0.7;
                                    INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                                    INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                                }
                                _this.updateChair();
                            });
                        } else {
                            INSTANCE.model.model_main.material.bumpScale = 1.1;
                            INSTANCE.model.model_main.material.roughness = 0.7;
                            INSTANCE.model.model_main.material.metalness = 0.1;
                            INSTANCE.model.model_main.material.bumpMap = texture;
                            if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                INSTANCE.model.podgolovnik_main.material.bumpScale = 1.1;
                                INSTANCE.model.podgolovnik_main.material.roughness = 0.7;
                                INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                                INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            }
                            _this.updateChair();
                        }
                        $('#constructor').trigger('material:load');
                    });
                });
                break;
            case "perforated-leather":
                _this.resetMap(["map", "roughnessMap", "metalnessMap"]);
                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/roughness.jpg', function (rougness) {
                    rougness.wrapS = 1000;
                    rougness.wrapT = 1000;
                    rougness.repeat.set(14, 14);
                    rougness.anisotropy = 14;
                    INSTANCE.model.model_main.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.model_second !== "undefined") {
                        INSTANCE.model.model_second.material.roughnessMap = rougness;
                    }
                    INSTANCE.model.model_color.material.roughnessMap = rougness;
                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                        INSTANCE.model.podgolovnik_main.material.roughnessMap = rougness;
                    }
                    if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                        INSTANCE.model.podgolovnik_second.material.roughnessMap = rougness;
                    }
                    textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/perf.jpg', function (map) {
                        map.wrapS = 1000;
                        map.wrapT = 1000;
                        map.repeat.set(14, 14);
                        map.anisotropy = 14;
                        map.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.map = map;
                        if (typeof INSTANCE.model.model_second !== "undefined") {
                            INSTANCE.model.model_second.material.map = map;
                        }
                        INSTANCE.model.model_color.material.map = map;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.map = map;
                        }
                        if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                            INSTANCE.model.podgolovnik_second.material.map = map;
                        }
                        textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '.jpg', function (texture) {
                            texture.wrapS = 1000;
                            texture.wrapT = 1000;
                            texture.repeat.set(14, 14);
                            texture.anisotropy = 14;
                            if (typeof INSTANCE.model.model_second !== "undefined") {
                                INSTANCE.model.model_second.material.bumpScale = 1.2;
                                INSTANCE.model.model_second.material.roughness = 0.7;
                                INSTANCE.model.model_second.material.metalness = 0.1;
                                INSTANCE.model.model_second.material.bumpMap = texture;
                            }
                            INSTANCE.model.model_color.material.bumpScale = 1.2;
                            INSTANCE.model.model_color.material.roughness = 0.7;
                            INSTANCE.model.model_color.material.metalness = 0.1;
                            INSTANCE.model.model_color.material.bumpMap = texture;
                            if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
                                INSTANCE.model.podgolovnik_second.material.bumpScale = 1.2;
                                INSTANCE.model.podgolovnik_second.material.roughness = 0.7;
                                INSTANCE.model.podgolovnik_second.material.metalness = 0.1;
                                INSTANCE.model.podgolovnik_second.material.bumpMap = texture;
                            }
                            if (options.seam && options.model !== "monarch") {
                                textureLoader.load(ASSETS_FOLDER + 'texture/' + materialName + '/' + materialName + '-' + INSTANCE.seam + '.jpg', function (texture2) {
                                    texture2.wrapS = 1000;
                                    texture2.wrapT = 1000;
                                    texture2.repeat.set(14, 14);
                                    texture2.anisotropy = 14;
                                    texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                                    INSTANCE.model.model_main.material.bumpScale = 1.8;
                                    INSTANCE.model.model_main.material.roughness = 0.7;
                                    INSTANCE.model.model_main.material.metalness = 0.1;
                                    INSTANCE.model.model_main.material.bumpMap = texture2;
                                    if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                        INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                                        INSTANCE.model.podgolovnik_main.material.roughness = 0.7;
                                        INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                                        INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                                    }
                                    _this.updateChair();
                                });
                            } else {
                                INSTANCE.model.model_main.material.bumpScale = 1.2;
                                INSTANCE.model.model_main.material.roughness = 0.7;
                                INSTANCE.model.model_main.material.metalness = 0.1;
                                INSTANCE.model.model_main.material.bumpMap = texture;
                                if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                                    INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                                    INSTANCE.model.podgolovnik_main.material.roughness = 0.7;
                                    INSTANCE.model.podgolovnik_main.material.metalness = 0.1;
                                    INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                                }
                                _this.updateChair();
                            }
                            $('#constructor').trigger('material:load');
                        });
                    });
                });
                break;
        }
        if (INSTANCE.opacity) {
            disableOpacity();
        }
        this.resetColor();
    };

    kulich3d.prototype.color = function (options, hex) {
        INSTANCE.model.model_main.material.color = new THREE.Color(hex);
        if (typeof INSTANCE.model.model_second !== "undefined") {
            INSTANCE.model.model_second.material.color = new THREE.Color(hex);
        }
        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
            INSTANCE.model.podgolovnik_main.material.color = new THREE.Color(hex);
        }
        if (typeof INSTANCE.model.podgolovnik_second !== "undefined") {
            INSTANCE.model.podgolovnik_second.material.color = new THREE.Color(hex);
        }

        this.materialParam([INSTANCE.model.model_main.material, (typeof INSTANCE.model.model_second !== "undefined") ? INSTANCE.model.model_second.material : '', (typeof INSTANCE.model.podgolovnik_main !== "undefined") ? INSTANCE.model.podgolovnik_main.material : '', (typeof INSTANCE.model.podgolovnik_second !== "undefined") ? INSTANCE.model.podgolovnik_second.material : ''], options);

        if (typeof options.color_add === "undefined") {
            INSTANCE.model.model_color.material.color = new THREE.Color(hex);
            this.materialParam([INSTANCE.model.model_color.material], options);
            if (typeof INSTANCE.model.podgolovnik_color !== "undefined") {
                INSTANCE.model.podgolovnik_color.material.color = new THREE.Color(hex);
                this.materialParam([INSTANCE.model.podgolovnik_color.material], options);
            }
        }
        this.updateChair();
    };

    kulich3d.prototype.color_add = function (options, hex) {
        INSTANCE.model.model_color.material.color = new THREE.Color(hex);
        this.materialParam([INSTANCE.model.model_color.material], options, true);
        if (typeof INSTANCE.model.podgolovnik_color !== "undefined") {
            INSTANCE.model.podgolovnik_color.material.color = new THREE.Color(hex);
            this.materialParam([INSTANCE.model.podgolovnik_color.material], options, true);
        }
        this.updateChair();
    };

    kulich3d.prototype.seam = function (options, seamType) {
        var _this = this;
        switch (options.material) {
            case "genuine-leather":
                if (seamType) {
                    textureLoader.load(ASSETS_FOLDER + 'texture/genuine-leather/genuine-leather-' + INSTANCE.seam + '.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        texture.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                        }
                        _this.updateChair();
                    });
                } else {
                    textureLoader.load(ASSETS_FOLDER + 'texture/genuine-leather/genuine-leather.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.2;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                        }
                        _this.updateChair();
                    });
                }
                break;
            case "azur":
                if (seamType) {
                    textureLoader.load(ASSETS_FOLDER + 'texture/azur/azur-' + INSTANCE.seam + '.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        texture.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.map.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.map.repeat.set(14, 14);
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.map.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                            INSTANCE.model.podgolovnik_main.material.map.repeat.set(14, 14);
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                        }
                        _this.updateChair();
                    });
                } else {
                    _this.RAF(true);
                    textureLoader.load(ASSETS_FOLDER + 'texture/azur/azur.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(5, 5);
                        texture.anisotropy = 14;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.2;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                        }
                        _this.updateChair();
                    });
                }
                break;
            case "antara":
                if (seamType) {
                    textureLoader.load(ASSETS_FOLDER + 'texture/antara/antara-' + INSTANCE.seam + '.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        texture.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                        }
                        _this.updateChair();
                    });
                } else {
                    textureLoader.load(ASSETS_FOLDER + 'texture/antara/antara.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.2;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                        }
                        _this.updateChair();
                    });
                }
                break;
            case "faux-leather":
                if (seamType) {
                    textureLoader.load(ASSETS_FOLDER + 'texture/faux-leather/faux-leather-' + INSTANCE.seam + '.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        texture.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                        }
                        _this.updateChair();
                    });
                } else {
                    textureLoader.load(ASSETS_FOLDER + 'texture/faux-leather/faux-leather.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.2;
                        ;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                        }
                        _this.updateChair();
                    });
                }
                break;
            case "perforated-leather":
                if (seamType) {
                    textureLoader.load(ASSETS_FOLDER + 'texture/perforated-leather/perforated-leather-' + INSTANCE.seam + '.jpg', function (texture2) {
                        texture2.wrapS = 1000;
                        texture2.wrapT = 1000;
                        texture2.repeat.set(14, 14);
                        texture2.anisotropy = 14;
                        texture2.offset.set(INSTANCE.param.offset.x, INSTANCE.param.offset.y);
                        INSTANCE.model.model_main.material.bumpMap = texture2;
                        INSTANCE.model.model_main.material.bumpScale = 1.8;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture2;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.8;
                        }
                        _this.updateChair();
                    });
                } else {
                    textureLoader.load(ASSETS_FOLDER + 'texture/perforated-leather/perforated-leather.jpg', function (texture) {
                        texture.wrapS = 1000;
                        texture.wrapT = 1000;
                        texture.repeat.set(14, 14);
                        texture.anisotropy = 14;
                        INSTANCE.model.model_main.material.bumpMap = texture;
                        INSTANCE.model.model_main.material.bumpScale = 1.2;
                        if (typeof INSTANCE.model.podgolovnik_main !== "undefined") {
                            INSTANCE.model.podgolovnik_main.material.bumpMap = texture;
                            INSTANCE.model.podgolovnik_main.material.bumpScale = 1.2;
                        }
                        _this.updateChair();
                    });
                }
                break;
        }
    };

    kulich3d.prototype.crystals = function (options, bool) {
        this.RAF(true);
        INSTANCE.model.cristal.visible = bool;
        this.RAF(false);
    };

    kulich3d.prototype.cr = function () {
        var _this = this;
        modelLoad.load(ASSETS_FOLDER + '/model/' + _cf.data.model.name + '/cristal.json', function (t) {
            _this.RAF(true);
            INSTANCE.model['cristal'].geometry = t;
            _this.RAF(false);
        });
    };

    kulich3d.prototype.additional_legs = function (options, bool) {
        this.RAF(true);
        INSTANCE.model.opora.visible = bool;
        this.RAF(false);
    };

    kulich3d.prototype.additional_stop = function (options, bool) {
        this.RAF(true);
        INSTANCE.model.stop_metal.visible = bool;
        INSTANCE.model.stop_plastic.visible = bool;
        if (typeof INSTANCE.model.wheel_rack_plastic !== "undefined") {
            INSTANCE.model.wheel_rack_plastic.visible = !bool;
        }
        INSTANCE.model.wheel_patch.visible = !bool;
        INSTANCE.model.wheel_plastic.visible = !bool;
        INSTANCE.model.wheel_rezina.visible = !bool;
        this.RAF(false);
    };

    kulich3d.prototype.cross = function (options, type) {
        this.RAF(true);
        if (options.model !== "diamond") {
            if (type == "poly") {
                INSTANCE.model.poly.visible = true;
                INSTANCE.model.chrome.visible = false;
            } else {
                INSTANCE.model.poly.visible = false;
                INSTANCE.model.chrome.visible = true;
                INSTANCE.model.chrome.material.aoMap = null;
            }
        } else {
            var wood = scene.getObjectByName('wood');
            switch (type) {
                case 'wood-black':
                    wood.material.color = new THREE.Color('#222');
                    break;
                case 'wood-brown':
                    wood.material.color = new THREE.Color('#49362F');
                    break;
                case 'wood-white':
                    wood.material.color = new THREE.Color('#A3997D');
                    break;
            }
        }
        this.RAF(false);
    };

    kulich3d.prototype.logo_headrest = function (options, logo) {

    };

    kulich3d.prototype.logo_back = function (options, logo) {

    };

    kulich3d.prototype.restoreModel = function (data, modelLoaded) {
        if (!modelLoaded) {
            restoreModel = true;
            $('li[data-select*="' + data.model + '"]').trigger('click');
        } else {
            restoreModel = false;
            if (isEx(data.headrest) && data.headrest) {
                $("#constructor__option--headrest li[data-select*='true']").trigger('click');
            }
            if (isEx(data.material)) {
                $('#constructor__option--material li[data-select*="' + data.material + '"]').trigger('click');
            } else {
                wPreloader.hide();
            }
            if (isEx(data.cross)) {
                $('#constructor__option--cross li[data-select*="' + data.cross + '"]').trigger('click');
            }
            if (isEx(data.additional_legs) && data.additional_legs) {
                $("#constructor__option--additional li[data-select*='additional_legs']").trigger('click');
            }
            if (isEx(data.additional_stop) && data.additional_stop) {
                $("#constructor__option--additional li[data-select*='additional_stop']").trigger('click');
            }
            if (isEx(data.crystals) && data.crystals) {
                $('.js-toggle-crystals').parent('label').trigger('click');
            }
            $('#constructor').on('material:load', function () {
                if (isEx(data.seam) && data.seam) {
                    $('.js-toggle-seam').parent('label').trigger('click');
                    $('.is-opened').removeClass('is-opened');
                }
                if (isEx(data.color)) {
                    $('#constructor__option--color--main li[data-select*="' + data.color + '"]').trigger('click');
                    $('.show-on-order').addClass('show-order');
                }
                if (isEx(data.color_add)) {
                    $('.js-additional-color').parent('label').trigger('click');
                    $('#constructor__option--color--add li[data-select*="' + data.color_add + '"]').trigger('click');
                }
                $('#constructor').off('material:load');
                wPreloader.hide();
            });
            $('.is-opened').removeClass('is-opened');
        }
    };

    kulich3d.prototype.init = function () {
        var _this = this;

        _this.elements();

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            gammaInput: true,
            gammaOutput: true,
            gammaFactor: 1.1
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xcccccc, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(_this.windowWidth, _this.windowHeight);
        container.appendChild(renderer.domElement);


        scene = new THREE.Scene();
        _this.light();
        _this.camera();
        _this.controls();
        _this.handlers();

        var planeGeo = new THREE.CircleGeometry(4000, 32);
        groundMirror = new THREE.Mirror(renderer, camera, {
            clipBias: 0.003,
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0xbfbfbf
        });
        groundMirror.material.transparent = true;
        groundMirror.material.opacity = 0.05;
        groundMirror.material.blending = 4;
        window.mirrorMesh = new THREE.Mesh(planeGeo, groundMirror.material);
        mirrorMesh.add(groundMirror);
        mirrorMesh.rotateX(-Math.PI / 2);
        scene.add(mirrorMesh);
        mirrorStart = true;


        var planeGeo2 = new THREE.CircleGeometry(4000, 32);
        planeGeo2.faceVertexUvs[1] = planeGeo2.faceVertexUvs[0];
        planeGeo2.computeVertexNormals();
        planeGeo2.mergeVertices();
        window.mirrorMesh2 = new THREE.Mesh(planeGeo2, new THREE.MeshStandardMaterial({
            color: new THREE.Color('#999'),
            metalness: 0,
            roughness: 1
        }));
        mirrorMesh2.rotateX(-Math.PI / 2);
        mirrorMesh2.position.y = 0;
        scene.add(mirrorMesh2);

        textureLoader.load(ASSETS_FOLDER + 'images/reflect_gloss.jpg', function (ee) {
            var planeGeo3 = new THREE.CircleGeometry(4000, 32);
            window.mirrorMesh3 = new THREE.Mesh(planeGeo3, new THREE.MeshStandardMaterial({
                color: new THREE.Color('#888'),
                metalness: 0,
                roughness: 1,
                transparent: true,
                opacity: 1,
                alphaMap: ee
            }));
            mirrorMesh3.rotateX(-Math.PI / 2);
            mirrorMesh3.position.y = (Modernizr.ios) ? 1 : 0;
            scene.add(mirrorMesh3);
        });
        textureCube = textureCubeLoader.load(_cf.urls, function () {
            ArmChair.toggleOption($('#constructor__option--model').children('.js-option-toggle'));
            wPreloader.hide();
            if (typeof $.cookie('kulik3d') !== "undefined") {
                INSTANCE.cookie = JSON.parse($.cookie('kulik3d'));
                _this.restoreModel(JSON.parse($.cookie('kulik3d')), false);
            }
            quickUpdate();
        });

        textureCube.format = THREE.RGBFormat;

    };

    window.kulich3d = new kulich3d();


})(jQuery, window);
