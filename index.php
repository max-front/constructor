<!DOCTYPE html>
<html lang="ru-RU" dir="ltr" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Kulik3d - Верстка - wezom.com.ua</title>
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="target-densitydpi=device-dpi">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" property="stylesheet" href="constructor/css/components.min.css">
    <link rel="stylesheet" property="stylesheet" href="constructor/css/constructor.min.css">
    <link rel="stylesheet" property="stylesheet" href="constructor/css/responsive.min.css">

    <script src="constructor/js/modernizr.min.js"></script>
    <script src="constructor/js/jquery.min.js"></script>
    <script src="constructor/js/libs.min.js"></script>
    <script src="constructor/js/three.min.js"></script>
    <script src="constructor/js/three_addons.min.js"></script>
    <script src="constructor/js/app.js"></script>
    <script>
        /* TODO TRS - global variable for translations */
        var TRS = {
            model: 'Модельь',
            headrest: 'Подголовник',
            material: 'Материал',
            color: 'Цвет',
            seam: 'Дизайнерский шов',
            cross: 'Крестовина',
            crystal: 'Кристаллы сваровски',
            logo: 'Нанесение лого',
            additional: 'Дополнительные опции',
            additional_stop: 'Стоп опора',
            additional_legs: 'Опора для ног Ring Base',
            color_add: '<br> Цвет вставок: ',
            color_main: 'Основной цвет: ',
            added: 'Добавить ',
            removed: 'Убрать ',
            on: 'Включен',
            off: 'Выключен',
            msg: 'Возможен при выборе<br>дизайнерского шва',
            msg2: 'Только для моделей<br>с дизайнерским швом',
            built: 'Встроенный',
            chrome: 'Хромированная',
            no_provided: 'Not provide'
        }
    </script>
    <style>
        .demoHolder {
            position: relative;
            max-width: 1015px;
            margin: 0 auto;
            background: #fff;
            z-index: 0
        }
    </style>
</head>

<body>
    <div class="demoHolder">
        <div id="constructor" data-prices="constructor/jsons/price.json" class="constructor__wrapper">
            <div class="constructor__order">
                <div class="constructor__order_form">
                    <form class="wForm wFormDef wFormPreloader w_block">
                        <div class="option__list-todo _clear-fix">
                            <div class="list-todo__close js-form-close">
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_times"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="list-todo__block">
                                <div class="list-todo__title">Оформить заказ</div>
                            </div>
                        </div>
                        <div id="constructorForm" class="wFormWrapper">
                            <div class="wFormRow">
                                <label for="fio" class="wLabel">ФИО *</label>
                                <div class="wFormInput">
                                    <input class="wInput" type="text" name="fio" id="fio">
                                    <div class="inpInfo">ФИО *</div>
                                </div>
                            </div>
                            <div class="wFormRow">
                                <label for="email" class="wLabel">Почта *</label>
                                <div class="wFormInput">
                                    <input class="wInput" type="email" name="email" id="email">
                                    <div class="inpInfo">Почта *</div>
                                </div>
                            </div>
                            <div class="wFormRow">
                                <label for="tel" class="wLabel">Телефон *</label>
                                <div class="wFormInput">
                                    <input class="wInput" type="tel" name="tel" id="tel">
                                    <div class="inpInfo">Телефон *</div>
                                </div>
                            </div>
                            <div class="wFormRow">
                                <label for="city" class="wLabel">Город *</label>
                                <div class="wFormInput">
                                    <input class="wInput" type="text" name="city" id="city">
                                    <div class="inpInfo">Город *</div>
                                </div>
                            </div>
                            <div class="wFormRow">
                                <div class="wFormRowInner">
                                    <label for="user_id" class="wLabel">Или просто введите ID клиента</label>
                                    <div class="wFormInput">
                                        <input class="orId wInput" type="text" name="user_id" id="user_id">
                                        <div class="inpInfo">введите ID клиента</div>
                                    </div>
                                </div>
                            </div>
                            <div class="wFormRow">
                                <button class="wSubmit constructor-button" type="submit">Подтверждение</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="constructor__show-block">
                <div class="constructor__viewport" id="modelView"></div>
                <div class="constructor__result">
                    <div class="constructor__result_left">
                        <div class="constructor__result_price">
                            <span class="constructor__result_text">Цена</span>
                            <span class="js-result-price">0</span>
                            <span class="js-result-currency">грн</span>
                        </div>
                    </div>
                    <div class="constructor__result_right list-todo__next show-on-order">
                        <button data-mfp-src="#agreement" class="js-option-next is-active mfiOrder">Оформить заказ</button>
                    </div>
                </div>
                <div class="constructor__price show-on-order">
                    <button class="constructor-button js-show-options-list">
                        <span class="svg-holder">
                  <svg>
                    <use xlink:href="#icon_selected"/>
                  </svg>
                </span> Выбранные опции
                    </button>
                </div>
                <div class="constructor__fullscreen">
                    <button class="constructor-button js-fullscreen-toggle">
                        <span class="svg-holder">
                  <svg>
                    <use xlink:href="#icon_fullscreen"/>
                  </svg>
                </span>
                        <span class="svg-holder">
                  <svg>
                    <use xlink:href="#icon_fullscreen_inset"/>
                  </svg>
                </span>
                    </button>
                </div>
                <div class="constructor__mmenu">
                    <button class="constructor-button js-show-mmenu">
                        <span class="svg-holder">
                                <svg>
                                    <use xlink:href="#icon_selected"></use>
                                </svg>
                            </span> Опции
                    </button>
                </div>
                <div class="constructor__nowebgl" style="display: none;">
                    <div class="constructor__nowebgl-inner">
                        <div class="constructor__nowebgl-attention">Для просмотра содержимого веб-страницы требуется новая версия браузера.</div>
                        <div class="constructor__nowebgl-title">Обновите браузер непосредственно на веб-сайте производителя браузера.</div>
                        <div class="constructor__nowebgl-title--sub">Это займет всего несколько минут и абсолютно бесплатно.</div>
                        <div class="browser-links">
                            <a href="https://www.mozilla.org/ru/firefox/new/" target="_blank" class="browser-links__item">
                                <img src="constructor/assets/kulik/designer/images/ff.png" alt="">
                            </a>
                            <a href="https://www.google.com/chrome/browser/desktop/" target="_blank" class="browser-links__item">
                                <img src="constructor/assets/kulik/designer/images/ch.png" alt="">
                            </a>
                            <a href="https://www.opera.com/ru" target="_blank" class="browser-links__item">
                                <img src="constructor/assets/kulik/designer/images/op.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- top-->
            <div class="constructor__options constructor__options--top">
                <div id="constructor__option--list" class="constructor__option">
                    <div class="option__list">
                        <div class="option__list-holder">
                            <div class="option__list-todo _clear-fix">
                                <div class="list-todo__close js-option-close">
                                    <div class="svg-holder">
                                        <svg>
                                            <use xlink:href="#icon_times"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="list-todo__block">
                                    <div class="list-todo__title js-ignor-all-model">Выбранные опции</div>
                                </div>
                            </div>
                            <div class="option__list-content">
                                <div class="option__list--table"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="constructor__justify">
                    <div id="constructor__option--model" class="constructor__option constructor__option--model is-allowed">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Модель кресла</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не выбрано" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model">Пожалуйста выберите модель кресла</div>
                                    </div>
                                </div>
                                <div class="option__list-content">
                                    <ul class="grid-list grid-list--5 list_chair">
                                        <li data-select='{"key":"diamond","value":"Diamond"}' class="grid-list__item option-item _hover-to-color js-option-select diamond">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--diamond.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Diamond</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"monarch","value":"Monarch"}' class="grid-list__item option-item _hover-to-color js-option-select monarch">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--monarch.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Monarch</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"jet","value":"Jet"}' class="grid-list__item option-item _hover-to-color js-option-select jet">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--jet.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Jet</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"grand","value":"Grand"}' class="grid-list__item option-item _hover-to-color js-option-select grand">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--grand.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Grand</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"royal","value":"Royal"}' class="grid-list__item option-item _hover-to-color js-option-select royal">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--royal.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Royal</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"business","value":"Business"}' class="grid-list__item option-item _hover-to-color js-option-select business">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--business.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Business</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"imperial","value":"Imperial"}' class="grid-list__item option-item _hover-to-color js-option-select imperial">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--imperial.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Imperial</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"victory","value":"Victory"}' class="grid-list__item option-item _hover-to-color js-option-select victory">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--victory.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Victory</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"pyramid","value":"Pyramid"}' class="grid-list__item option-item _hover-to-color js-option-select pyramid">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--pyramid.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Pyramid</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"elegance","value":"Elegance"}' class="grid-list__item option-item _hover-to-color js-option-select elegance">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--elegance.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Elegance</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"galaxy","value":"Galaxy"}' class="grid-list__item option-item _hover-to-color js-option-select galaxy">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--galaxy.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Galaxy</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"classic","value":"Classic"}' class="grid-list__item option-item _hover-to-color js-option-select classic">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--classic.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Classic</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"fly","value":"Fly"}' class="grid-list__item option-item _hover-to-color js-option-select  fly">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--fly.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Fly</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"trio","value":"Trio"}' class="grid-list__item option-item _hover-to-color js-option-select  trio">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--trio.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Trio</span>
                                            </div>
                                        </li>
                                        <li data-select='{"key":"kids","value":"Kids"}' class="grid-list__item option-item _hover-to-color js-option-select kids">
                                            <div class="option-item__preview ">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-model--kids.png" class="_grayscale js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Kids</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--headrest" class="constructor__option constructor__option--headrest">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Подголовник</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Опция не выбрана" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model"></div>
                                    </div>
                                </div>
                                <div class="option__list-content">
                                    <ul class="grid-list grid-list--3 option_headrest">
                                        <li data-select='{"key":true,"value":"Присутствует"}' class="grid-list__item option-item js-option-select">
                                            <div class="option-item__preview">
                                                <img src="constructor/assets/kulik/designer/images/headrest/business--true.png" class="js-headrest-true">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">С подголовником</span>
                                            </div>
                                        </li>
                                        <li class="grid-list__item"></li>
                                        <li data-select='{"key":false,"value":"Опция не выбрана"}' class="grid-list__item option-item js-option-select">
                                            <div class="option-item__preview">
                                                <img src="constructor/assets/kulik/designer/images/headrest/business--false.png" class="js-headrest-false">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Без подголовника</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--material" class="constructor__option constructor__option--material">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Материал</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не указан" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <button id="option-descr--genuine-leather" class="option-item__descr">
                                    <p>Натуральная кожа – новый тип обивочного материала с широкой цветовой гаммой. Ткань имеет мелкое и плотное переплетение нитей, и укреплена основой, в состав которой входит хлопок. Натуральная кожа имеет натуральную основу, которая позволяет создать ощущение уюта и комфорта, как в офисном, так и в домашнем интерьере</p>
                                </button>
                                <button id="option-descr--azur" class="option-item__descr">
                                    <p>Азур – новый тип обивочного материала с широкой цветовой гаммой. Ткань имеет мелкое и плотное переплетение нитей, и укреплена основой, в состав которой входит хлопок. Азур имеет натуральную основу, которая позволяет создать ощущение уюта и комфорта, как в офисном, так и в домашнем интерьере</p>
                                </button>
                                <button id="option-descr--antara" class="option-item__descr">
                                    <p>Антара – новый тип обивочного материала с широкой цветовой гаммой. Ткань имеет мелкое и плотное переплетение нитей, и укреплена основой, в состав которой входит хлопок. Антара имеет натуральную основу, которая позволяет создать ощущение уюта и комфорта, как в офисном, так и в домашнем интерьере</p>
                                </button>
                                <button id="option-descr--faux-leather" class="option-item__descr">
                                    <p>Экокожа – новый тип обивочного материала с широкой цветовой гаммой. Ткань имеет мелкое и плотное переплетение нитей, и укреплена основой, в состав которой входит хлопок. Экокожа имеет натуральную основу, которая позволяет создать ощущение уюта и комфорта, как в офисном, так и в домашнем интерьере</p>
                                </button>
                                <button id="option-descr--perforated-leather" class="option-item__descr">
                                    <p>Перфорированная экокожа – новый тип обивочного материала с широкой цветовой гаммой. Ткань имеет мелкое и плотное переплетение нитей, и укреплена основой, в состав которой входит хлопок. Перфорированная экокожа имеет натуральную основу, которая позволяет создать ощущение уюта и комфорта, как в офисном, так и в домашнем интерьере</p>
                                </button>
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model">Выберете материал отделки кресла</div>
                                    </div>
                                </div>
                                <div class="option__list-content">
                                    <ul class="grid-list grid-list--5 list_material">
                                        <li data-select='{"key":"genuine-leather","value":"Натуральная кожа"}' class="grid-list__item option-item js-option-select">
                                            <label for="option-descr--genuine-leather" style="background-image: url(constructor/assets/kulik/designer/images/armchair-material--genuine-leather.jpg);" class="option-item__label">
                                                <div class="option-item__title">Натуральная кожа</div>
                                            </label>
                                        </li>
                                        <li data-select='{"key":"azur","value":"Азур"}' class="grid-list__item option-item js-option-select">
                                            <label for="option-descr--azur" style="background-image: url(constructor/assets/kulik/designer/images/armchair-material--azur.jpg);" class="option-item__label">
                                                <div class="option-item__title">Азур</div>
                                            </label>
                                        </li>
                                        <li data-select='{"key":"antara","value":"Антара"}' class="grid-list__item option-item js-option-select">
                                            <label for="option-descr--antara" style="background-image: url(constructor/assets/kulik/designer/images/armchair-material--antara.jpg);" class="option-item__label">
                                                <div class="option-item__title">Антара</div>
                                            </label>
                                        </li>
                                        <li data-select='{"key":"faux-leather","value":"Экокожа"}' class="grid-list__item option-item js-option-select">
                                            <label for="option-descr--faux-leather" style="background-image: url(constructor/assets/kulik/designer/images/armchair-material--faux-leather.jpg);" class="option-item__label">
                                                <div class="option-item__title">Экокожа</div>
                                            </label>
                                        </li>
                                        <li data-select='{"key":"perforated-leather","value":"Перфорированная экокожа"}' class="grid-list__item option-item js-option-select">
                                            <label for="option-descr--perforated-leather" style="background-image: url(constructor/assets/kulik/designer/images/armchair-material--perforated-leather.jpg);" class="option-item__label">
                                                <div class="option-item__title">Перфорированная экокожа</div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--color" class="constructor__option constructor__option--color">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Цвет</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не указан" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model">Выберите основной цвет
                                            <label class="list-todo__controller list-todo__controller--checked is-hidden">
                                                <input type="checkbox" class="js-additional-color">
                                                <ins>&nbsp;</ins>
                                                <span data-off="Добавить " data-on="Убрать ">цвет вставок</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="option__list-conteiner">
                                    <div id="constructor__option--color--add" class="option__list-content option__list-content--right is-hidden"></div>
                                    <div id="constructor__option--color--main" class="option__list-content option__list-content--left">
                                        <ul class="grid-list grid-list--2 list_color">
                                            <li data-select='{"key":"#141414","value":"Черный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#252525;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Черный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#151515","value":"Черный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#151515;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Черный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#222222","value":"Черный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#222222;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Черный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#252525","value":"Черный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#353535;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Черный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#41222d","value":"Фиолетовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#54323e;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Фиолетовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#555555","value":"Серый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#858585;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Серый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#727272","value":"Серый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#727272;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Серый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#373131","value":"Серый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#474040;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Серый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#502b1d","value":"Коричневый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#502b1d;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Коричневый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#23140b","value":"Каштановый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#482b19;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Каштановый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#18253c","value":"Кобальт"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#2d3f5f;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Кобальт</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#FEFEFE","value":"Серебро"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#c7c7c7;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Серебро</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#50270e","value":"Коричневый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#663616;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Коричневый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#9d9d9d","value":"Серебряный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#dbdbdb;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Серебряный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#666565","value":"Серебряный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#7d7b7b;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Серебряный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#411212","value":"Бордо"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#6e2727;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Бордо</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#0d2013","value":"Зеленый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#193422;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Зеленый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#213421","value":"Зеленый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#3f5c3f;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Зеленый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#70141d","value":"Красный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#bf091e;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Красный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#731413","value":"Красный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#cc2020;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Красный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#731414","value":"Красный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#d43030;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Красный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#8c3519","value":"Морковный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#db4c17;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Морковный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#2d150b","value":"Виски"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#703218;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Виски</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#7a5038","value":"Бронзовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#9e5c35;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Бронзовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#3c2518","value":"Шоколад"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#4e3425;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Шоколад</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#202843","value":"Синий"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#3f4c74;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Синий</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#2e4055","value":"Джинс"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#40546c;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Джинс</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#892b41","value":"Коралловый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#b74a4a;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Коралловый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#82235b","value":"Розовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#ae2f5f;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Розовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#843053","value":"Розовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#f05685;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Розовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#381948","value":"Лиловый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#3e234d;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Лиловый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#7192a5","value":"Голубой"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#abd7f0;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Голубой</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#008a93","value":"Бирюзовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#069da6;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Бирюзовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#2d758c","value":"Бирюзовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#4aa9c6;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Бирюзовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#9b4d14","value":"Оранжевый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#ff9236;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Оранжевый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#b44521","value":"Оранжевый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#d0562a;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-white">
                                                    <span class="_text-clip">Оранжевый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#b19710","value":"Желтый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#fff83a;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Желтый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#c3a65d","value":"Золотой"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#e5c266;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Золотой</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#6d783c","value":"Оливковый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#8e9959;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Оливковый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#8c8722","value":"Оливковый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#a7a232;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Оливковый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#a56830","value":"Медовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#ff8f34;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Медовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#a4866a","value":"Бежевый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#dfba97;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Бежевый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#a7865f","value":"Бежевый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#dab383;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Бежевый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#b4a581","value":"Песочный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#fffac9;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Песочный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#fff0cd","value":"Песочный"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#fff0cd;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Песочный</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#b9a68f","value":"Кремовый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#dbbb93;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Кремовый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#755f4e","value":"Карамель"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#8c6c54;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Карамель</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#896d53","value":"Дюна"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#f9b97f;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Дюна</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#cfc8b9","value":"Белый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#ffe;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Белый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#fcfcfc","value":"Белый"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#fcfcfc;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Белый</span>
                                                </div>
                                            </li>
                                            <li data-select='{"key":"#c08920","value":"Золотой"}' class="grid-list__item option-item js-option-select">
                                                <div style="color:#e8b635;" class="option-item__preview js-set-color"></div>
                                                <div class="option-item__title _contrast-black">
                                                    <span class="_text-clip">Золотой</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--seam" class="constructor__option constructor__option--seam js-jump-from is-ignor-all">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Дизайнерский шов</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Выключен" class="option__block-subtitle js-option-selected-val">Не предусмотрен</div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next is-active js-not-reset">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-seam-design.jpg)" class="preview_img preview_img__seam-design click-label"></div>
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-seam-fashion.jpg)" class="preview_img preview_img__seam-fashion click-label"></div>
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-seam-quatro.jpg)" class="preview_img preview_img__seam-quatro click-label"></div>
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-seam-aristo.jpg)" class="preview_img preview_img__seam-aristo click-label"></div>
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-seam-zeta.jpg)" class="preview_img preview_img__seam-zeta click-label"></div>
                                        <div class="list-todo__title js-ignor-all-model">
                                            <span class="click-label">Дизайнерский шов</span>
                                            <label class="list-todo__controller list-todo__controller--checked">
                                                <input type="checkbox" class="js-toggle-seam">
                                                <ins>&nbsp;</ins>
                                                <span data-off="Добавить " data-on="Убрать ">шов для кресла</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- bottom-->
            <div class="constructor__options constructor__options--bottom">
                <div class="constructor__justify">
                    <div id="constructor__option--cross" class="constructor__option constructor__option--cross js-jump-to">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Крестовина</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не указано" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-content">
                                    <ul class="grid-list grid-list--4 unstyle-default">
                                        <li class="grid-list__item option-item unstyle-default">
                                            <div class="option-item__preview unstyle-default">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-cross--wood.png" class="js-simple-load">
                                            </div>
                                            <div class="option-item__title">
                                                <span style="line-height:1.4em;display:inline-block;vertical-align:middle;">Деревянная Крестовина</span>
                                            </div>
                                        </li>
                                        <li class="grid-list__item option-item">
                                            <div class="inner-list">
                                                <ul class="grid-list grid-list--3">
                                                    <li data-select='{"key":"wood-black","value":"Черный"}' class="grid-list__item option-item js-option-select">
                                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-cross--wood-black.jpg)" class="option-item__title">
                                                            <span class="_text-clip">Черный</span>
                                                        </div>
                                                    </li>
                                                    <li data-select='{"key":"wood-brown","value":"Коричневый"}' class="grid-list__item option-item js-option-select">
                                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-cross--wood-brown.jpg)" class="option-item__title">
                                                            <span class="_text-clip">Коричневый</span>
                                                        </div>
                                                    </li>
                                                    <li data-select='{"key":"wood-white","value":"Белый"}' class="grid-list__item option-item js-option-select">
                                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-cross--wood-white.jpg)" class="option-item__title">
                                                            <span class="_text-clip">Белый</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="option-item__title">
                                                <div class="svg-holder stand">
                                                    <svg>
                                                        <use xlink:href="#icon_right"/>
                                                    </svg>
                                                </div>
                                                <span class="_text-clip">Выберите цвет</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul class="grid-list grid-list--3 default-list list_cross">
                                        <li data-select='{"key":"poly","value":"Полиамидная"}' class="grid-list__item option-item js-option-select">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-cross--poliamid.png" class="js-simple-load">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Полиамидная</span>
                                            </div>
                                        </li>
                                        <li class="grid-list__item"></li>
                                        <li data-select='{"key":"chrome","value":"Хромированная"}' class="grid-list__item option-item js-option-select">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-cross--chrome.png" class="js-simple-load">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span class="_text-clip">Хромированная</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model">Укажите материал крестовины</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--additional" class="constructor__option constructor__option--additional">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Дополнительные опции</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не выбрано" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-content">
                                    <ul class="grid-list grid-list--3 list_additional">
                                        <li data-select='{"key":"additional_stop","value":"Стоп опора"}' class="grid-list__item option-item js-option-select js-option-select--multiple">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-additional--stop.png" class="js-simple-load">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span>Стоп опора</span>
                                            </div>
                                        </li>
                                        <li class="grid-list__item"></li>
                                        <li data-select='{"key":"additional_legs","value":"Опора для ног Ring Base"}' class="grid-list__item option-item js-option-select js-option-select--multiple">
                                            <div class="option-item__preview">
                                                <img data-src="constructor/assets/kulik/designer/images/armchair-additional--legs.png" class="js-simple-load">
                                            </div>
                                            <div class="svg-holder">
                                                <svg>
                                                    <use xlink:href="#icon_left"/>
                                                </svg>
                                            </div>
                                            <div class="option-item__title">
                                                <span>Опора для ног Ring Base</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-next is-active js-not-reset">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</span></button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div class="list-todo__title js-ignor-all-model">Выберите дополнительные опции для кресла</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="constructor__option--crystals" class="constructor__option constructor__option--crystals is-ignor-all">
                        <div class="option__block js-option-toggle">
                            <div class="option__block-holder">
                                <div class="option__block-title">Кристаллы сваровски</div>
                                <div class="svg-holder">
                                    <svg>
                                        <use xlink:href="#icon_caret"/>
                                    </svg>
                                </div>
                                <div data-empty="Не выбрано" class="option__block-subtitle js-option-selected-val"></div>
                            </div>
                        </div>
                        <div class="option__list">
                            <div class="option__list-holder">
                                <div class="option__list-todo _clear-fix">
                                    <div class="list-todo__close js-option-close">
                                        <div class="svg-holder">
                                            <svg>
                                                <use xlink:href="#icon_times"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="is-active js-order-trigger">
                                            <span class="md-hide">Далее</span> &gt;
                                        </button>
                                    </div>
                                    <div class="list-todo__next">
                                        <button class="js-option-prev is-active">&lt;
                                            <span class="md-hide">Назад</button>
                                    </div>
                                    <div class="list-todo__block">
                                        <div style="background-image:url(constructor/assets/kulik/designer/images/armchair-crystals.jpg)" class="preview_img click-label"></div>
                                        <div class="list-todo__title js-ignor-all-model">
                                            <span class="click-label">Кристаллы сваровски</span>
                                            <label class="list-todo__controller list-todo__controller--checked">
                                                <input type="checkbox" class="js-toggle-crystals">
                                                <ins>&nbsp;</ins>
                                                <span data-off="Добавить " data-on="Убрать ">кристаллы</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <svg id="constructor__sprite" xmlns="http://www.w3.org/2000/svg" style="height:0; width:0; visibility:hidden; position:absolute; top:0; left:0;">
                <symbol id="icon_caret" viewbox="0 0 16 7">
                    <path fill="none" stroke-miterlimit="10" d="M0.3,0.5L7.6,6l8.1-5.5"/>
                </symbol>
                <symbol id="icon_left" viewbox="0 0 7 16">
                    <path fill="none" stroke-miterlimit="10" d="M6.3,0.3L0.8,8.4l5.5,7.3"/>
                </symbol>
                <symbol id="icon_right" viewbox="0 0 7 16">
                    <path fill="none" stroke-miterlimit="10" d="M0.8,15.7l5.5-7.3L0.8,0.3"/>
                </symbol>
                <symbol id="icon_times" viewbox="0 0 30 30">
                    <path d="M20.5,9.5c0.5,0.5,0.5,1.4,0,1.9l-9.1,9.1c-0.5,0.5-1.4,0.5-1.9,0  C9,20,9,19.1,9.5,18.6l9.1-9.1C19.1,9,19.9,9,20.5,9.5z"/>
                    <path d="M9.5,9.5C9,10,9,10.9,9.5,11.4l9.1,9.1c0.5,0.5,1.4,0.5,1.9,0  c0.5-0.5,0.5-1.4,0-1.9l-9.1-9.1C10.9,9,10,9,9.5,9.5z"/>
                    <path d="M15,1c7.7,0,14,6.3,14,14s-6.3,14-14,14S1,22.7,1,15S7.3,1,15,1 M15,0C6.7,0,0,6.7,0,15s6.7,15,15,15s15-6.7,15-15  S23.3,0,15,0L15,0z"/>
                </symbol>
                <symbol id="icon_edit" viewbox="0 0 20 20">
                    <path d="M17,3c-0.7-0.7-1.5-1-2.5-1c-0.9,0-1.8,0.4-2.4,1l-8.6,8.6c-0.1,0.1-0.1,0.2-0.2,0.3L2,17.2c-0.1,0.2,0,0.5,0.2,0.6  C2.3,17.9,2.5,18,2.6,18c0.1,0,0.1,0,0.2,0l5.3-1.3c0.1,0,0.2-0.1,0.3-0.2L17,7.9C18.3,6.6,18.3,4.4,17,3z M4.3,13.4l2.3,2.3  l-3.1,0.8L4.3,13.4z M7.9,15.1l-3-3l7-7l1,1l-5.5,5.5c-0.3,0.3-0.3,0.7,0,0.9c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.3-0.1,0.5-0.2  l5.5-5.5l1,1L7.9,15.1z M16.1,7l-0.2,0.2l-3-3L13,3.9c0.8-0.8,2.2-0.8,3,0C16.9,4.8,16.9,6.1,16.1,7z"/>
                </symbol>
                <symbol id="icon_close" viewbox="0 0 20 20">
                    <path d="M15.3,4.4c0.5,0.5,0.5,1.4,0,1.9l-9.1,9.1c-0.5,0.5-1.4,0.5-1.9,0  c-0.5-0.5-0.5-1.4,0-1.9l9.1-9.1C14,3.9,14.8,3.9,15.3,4.4z"/>
                    <path d="M4.6,4.6C4.1,5.2,4.1,6,4.6,6.5l9.1,9.1c0.5,0.5,1.4,0.5,1.9,0  c0.5-0.5,0.5-1.4,0-1.9L6.5,4.6C6,4.1,5.2,4.1,4.6,4.6z"/>
                </symbol>
                <symbol id="icon_selected" viewbox="0 0 35 35">
                    <path d="M17.5,0C7.8,0,0,7.8,0,17.5C0,27.2,7.8,35,17.5,35C27.2,35,35,27.2,35,17.5C35,7.8,27.2,0,17.5,0z M17.5,33.1  c-8.6,0-15.6-7-15.6-15.6c0-8.6,7-15.6,15.6-15.6c8.6,0,15.6,7,15.6,15.6C33.1,26.1,26.1,33.1,17.5,33.1z"/>
                    <path d="M24.9,18.7l1.7-0.7c-0.1-1.1-0.1-1.1-0.2-2.2l-1.8-0.4c-0.3-0.7-0.5-1-0.8-1.7l0.8-1.6c-0.8-0.8-0.8-0.8-1.6-1.6l-1.6,0.8  c-0.7-0.3-1-0.5-1.7-0.8l-0.4-1.8c-1.1-0.1-1.1-0.1-2.2-0.2l-0.7,1.7c-0.7,0.2-1,0.3-1.8,0.5l-1.4-1.1c-0.9,0.6-0.9,0.6-1.8,1.3  l0.5,1.7c-0.4,0.6-0.6,0.9-1.1,1.5L9,14.3c-0.3,1.1-0.3,1.1-0.6,2.1l1.5,1c0.1,0.8,0.1,1.1,0.2,1.8l-1.3,1.2c0.5,1,0.5,1,0.9,2  l1.8-0.2c0.5,0.5,0.8,0.8,1.3,1.3l-0.2,1.8c1,0.5,1,0.5,2,0.9l1.2-1.3c0.8,0.1,1.1,0.1,1.8,0.2l1,1.5c1.1-0.3,1.1-0.3,2.1-0.6  l0.1-1.8c0.6-0.4,0.9-0.6,1.5-1.1l1.7,0.5c0.7-0.9,0.6-0.9,1.3-1.8l-1.1-1.5C24.6,19.7,24.7,19.4,24.9,18.7z M17.6,22.4  c-2.7,0-4.9-2.2-4.9-4.9s2.2-4.9,4.9-4.9c2.7,0,4.9,2.2,4.9,4.9S20.3,22.4,17.6,22.4z"/>
                </symbol>
                <symbol id="icon_fullscreen" viewbox="0 0 35 35">
                    <path d="M7.8,0v2.2H3.7l4.1,4.1v1.5H6.3L2.2,3.7v4.1H0V0H7.8L7.8,0z M10.6,8.4h13.7  c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,1,0.6,1.6v13.7c0,0.6-0.2,1.2-0.6,1.6c-0.4,0.4-1,0.6-1.6,0.6H10.6c-0.6,0-1.2-0.2-1.6-0.6  c-0.4-0.4-0.6-1-0.6-1.6V10.6c0-0.6,0.2-1.2,0.6-1.6C9.5,8.7,10,8.4,10.6,8.4L10.6,8.4z M24.3,10.6H10.6c0,0,0,0,0,0c0,0,0,0,0,0  v13.7c0,0,0,0,0,0c0,0,0,0,0,0h13.7c0,0,0,0,0,0c0,0,0,0,0,0L24.3,10.6C24.4,10.6,24.4,10.6,24.3,10.6  C24.3,10.6,24.3,10.6,24.3,10.6L24.3,10.6z M2.2,31.3l4.1-4.1h1.5v1.5l-4.1,4.1h4.1v2.2H0v-7.8h2.2V31.3L2.2,31.3z M27.1,6.3  l4.1-4.1h-4.1V0h7.8v7.8h-2.2V3.7l-4.1,4.1h-1.5V6.3L27.1,6.3z M28.7,27.1l4.1,4.1v-4.1h2.2v7.8h-7.8v-2.2h4.1l-4.1-4.1v-1.5H28.7z"/>
                </symbol>
                <symbol id="icon_fullscreen_inset" viewbox="0 0 35 35">
                    <path d="M10.6,8.4h13.7c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,1,0.6,1.6v13.7  c0,0.6-0.2,1.2-0.6,1.6c-0.4,0.4-1,0.6-1.6,0.6H10.6c-0.6,0-1.2-0.2-1.6-0.6c-0.4-0.4-0.6-1-0.6-1.6V10.6c0-0.6,0.2-1.2,0.6-1.6  C9.5,8.7,10,8.4,10.6,8.4L10.6,8.4z M0,33.4l4.1-4.1H0v-2.2h7.8v7.8H5.6v-4.1l-4.1,4.1H0V33.4L0,33.4z M4.1,5.6L0,1.5V0h1.5l4.1,4.1  V0h2.2v7.8H0V5.6H4.1L4.1,5.6z M29.3,4.1L33.4,0h1.5v1.5l-4.1,4.1h4.1v2.2h-7.8V0h2.2V4.1L29.3,4.1z M30.8,29.3l4.1,4.1v1.5h-1.5  l-4.1-4.1v4.1h-2.2v-7.8h7.8v2.2H30.8L30.8,29.3z M24.3,10.6H10.6c0,0,0,0,0,0c0,0,0,0,0,0v13.7c0,0,0,0,0,0c0,0,0,0,0,0h13.7  c0,0,0,0,0,0c0,0,0,0,0,0L24.3,10.6C24.4,10.6,24.4,10.6,24.3,10.6C24.3,10.6,24.3,10.6,24.3,10.6z"/>
                </symbol>
            </svg>
        </div>
        <div id="menu" class="mobile-options">
            <ul>
                <li data-id="model" class="is-allowed"><span><b>Модель кресла</b><i>Не указан</i></span></li>
                <li data-id="headrest"><span><b>Поголовник</b><i>Не указан</i></span></li>
                <li data-id="material"><span><b>Материал</b><i>Не указан</i></span></li>
                <li data-id="color"><span><b>Цвет</b><i>Не указан</i></span></li>
                <li data-id="seam"><span><b>Дизайнерский шов</b><i>Не указан</i></span></li>
                <li data-id="cross"><span><b>Крестовина</b><i>Не указан</i></span></li>
                <li data-id="additional"><span><b>Доп. опции</b><i>Не указан</i></span></li>
                <li data-id="crystals"><span><b>Кристаллы Сваровски</b><i>Не указан</i></span></li>
                <li data-id="logo"><span><b>Нанесение лого</b><i>Не указан</i></span></li>
                <li class="show-on-order"><span><b>Оформить заказ</b></span></li>
            </ul>
        </div>
        <div style="display: none;">
            <div id="agreement" class="popup-block">
                <div class="wTxt">
                    <h2>Обратите внимание!</h2>
                    <p>Цвета кресел в реальности могут отличаться от цветов моделей в зависимости от настроек Вашего
                        монитора.</p>
                    <p>Разница в оттенках цветов не является недостатком товара и основанием к возврату.</p>
                </div>
                <div class="list-todo__next agree-center">
                    <button class="js-agree is-active">Оформить заказ</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
