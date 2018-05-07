loadMap = false;

var owl,
    owl2,
    timeout,
    timer,
    videoTimeOut,
    loadGallery = false,
    panoIsLoad = false,
    windowLoad = false,
    dateTimeNow = new Date(),
    breadCrumbsHeight = $('#bread-crumbs').height(),
    map,
    firstLoad = true,
    pageLoad = true,
    myVar,
    timeNow = $('#startTime').val();
    randomHash = 123123;
    isLoaded = true;
    offset = 0;
    userAgent = window.navigator.userAgent;

var preloader = `<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                    <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                    <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" 
                            from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/>
                    </path>
                </svg>`;
var smallPreloader = '<svg class="object-loads" id="smallLoader" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="translate(20 50)">\
                        <circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.572192 0.572192)">\
                            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
                        </circle>\
                        </g><g transform="translate(40 50)">\
                        <circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.224255 0.224255)">\
                            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
                        </circle>\
                        </g><g transform="translate(60 50)">\
                        <circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.00676722 0.00676722)">\
                            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
                        </circle>\
                        </g><g transform="translate(80 50)">\
                        <circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.115136 0.115136)">\
                            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
                        </circle>\
                        </g></svg>';

//Определение устройства
let isMobile = {
    Android: () => navigator.userAgent.match(/Android/i),
	AndroidApp: () => navigator.userAgent.match(/AndroidApp/i),
	iOSApp: () => navigator.userAgent.match(/iOSApp/i),
    BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera: () => navigator.userAgent.match(/Opera Mini/i),
    Windows: () => navigator.userAgent.match(/IEMobile/i),
    any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
};


document.addEventListener('DOMContentLoaded', function () {
    let categoryId = getUrlVars()["c"];
	let cultureKey = getUrlVars()["lang"] || 'en';
	let panoId = getUrlVars()["p"];
	let krpano = document.getElementById("krpanoSWFObject");
	let deviceHeight = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.height : window.innerHeight;
    let deviceWidth = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.width : window.innerWidth;
    let windowSearch = window.location.search;
    
	if(isMobile.AndroidApp() || isMobile.iOSApp())
        $('#fullScreen-btn').parent('li').hide();
	if(isMobile.any()){
		$('#modalMap').css({'height': (deviceHeight) + 'px', 'width': (deviceWidth) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-mobile-close-btn"></div>');
	}
	else{
		$('#modalMap').css({'height': (deviceHeight - 50) + 'px', 'width': (deviceWidth - 200) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-close-btn"></div>');
	}
	// if(parseInt(panoId) == 26){
		// $('body').append('<div class="greeting-box"><img src="/assets/images/thai-king.jpg" /><div class="greeting-box-close-btn"></div></div>');
	// }
	if(parseInt(panoId) == 26 && isMobile.AndroidApp())
        setTimeout(() => {
            let krpano = document.getElementById("krpanoSWFObject");
            krpano.set('hotspot[spotpoint1590].visible', false);
            krpano.set('hotspot[spotpoint1593].visible', false);
            krpano.set('hotspot[spotpoint1594].visible', false);
        }, 500);
        
    CSSLoad('https://thai.hub360.info/assets/css/owl.carousel.css');
    CSSLoad('https://thai.hub360.info/assets/css/bootstrap.css');
    CSSLoad('https://thai.hub360.info/assets/css/jquery.scrollbar.css');
    CSSLoad('https://thai.hub360.info/assets/css/main.css?' + getRandom());

    //Получение переводов
    getBtnTranslations(cultureKey); // где definition этой ф-ии?
    
    if (!categoryId && (parseInt($('.search-logo').attr('data-id')) != 35)) {
        GetTopObjects(); // definition in ajax.js
    } else {
        OnSearchPanelShow();
        $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
    }
	//Инициализация битрикса
	BitrixChatInit(cultureKey);
	if (!$.cookie('using_cookies')) 
        setTimeout(() => $('.cookies').slideDown(), 15000);
	if(categoryId || parseInt(panoId) == 26)
		searchTimeout();

    GetParentCategories(); // ajax.js
    GetFilterMap(); // ajax.js
    //setTimeout(function(){firstLoad = false;}, 1000);
    
    getPrices(priceSaleMin, priceSaleMax, getPricesAndSymbol(100000));
    getBeds(0, 15);
    setInterval(() => updateTime(), 60000);
    setTimeout(() => {
        $('#category-search-btn').append('<div class="animation-border red"></div>\
											<div class="animation-background red"></div>\
											<div class="btn-animation red"></div>');
    }, 10000);

    if (windowSearch.indexOf('?_escaped_fragment_=') != 0) {
        if (!window.location.hash) {
            window.location.hash = defaultPano + '&lang=' + getLanguage();
            contextKey = getLanguage();
        } else {
            let panoId = getUrlVars()["p"] ? getUrlVars()["p"].split('-')[0] : 1;
            let categoryId = getUrlVars()["c"];

            if (!categoryId) getPano(panoId); // ajax.js
            else {
                categoryId = getUrlVars()["c"].split('-')[0];
                getPanoByCategoryId(categoryId); // ajax.js
            }
        }
    } else {
        let urlNow = window.location.href;
        window.location.href = urlNow.replace('?_escaped_fragment_=', '#!');
    }


    contextKey = getUrlVars()["lang"];
    if (!contextKey){
        $('html').attr('lang', getLanguage());
        $('.' + getLanguage()).hide();
    } else {
        $('html').attr('lang', contextKey);
        $('.lang-links a').each(function() {
            let $this = $(this);
            if ($this.attr('data-culture') == contextKey) {
                $this.addClass('active');
                $('.language-active').text($this.text());
            }
        });
    }
    getTime();
    $('[data-fancybox]').fancybox({ // fancybox?
        infobar: false
    });

    if (/(iphone|ipod|ipad|android|iemobile|webos|fennec|blackberry|kindle|series60|playbook|opera\smini|opera\smobi|opera\stablet|symbianos|palmsource|palmos|blazer|windows\sce|windows\sphone|wp7|bolt|doris|dorothy|gobrowser|iris|maemo|minimo|netfront|semc-browser|skyfire|teashark|teleca|uzardweb|avantgo|docomo|kddi|ddipocket|polaris|eudoraweb|opwv|plink|plucker|pie|xiino|benq|playbook|bb|cricket|dell|bb10|nintendo|up.browser|playstation|tear|mib|obigo|midp|mobile|tablet)/.test(navigator.userAgent.toLowerCase())) {
        if (/iphone/.test(navigator.userAgent.toLowerCase()) && window.self === window.top)
            jQuery('body').css('height', '100.18%');
        if (window.addEventListener) {
            window.addEventListener("load", readDeviceOrientation);
            window.addEventListener("resize", readDeviceOrientation);
            window.addEventListener("orientationchange", readDeviceOrientation);
        }
        setTimeout(() => readDeviceOrientation(), 10);
    }

    if (isMobile.any()) {
        $('.search-time').show();
        $("body").append($('<link rel="stylesheet" href="https://thai.hub360.info/assets/css/mobile_adaptation.css? ' + getRandom() + '" type="text/css" />'));
    }
});










//получение значения параметра ссылки
function getUrlVars() {
    let vars = [],
        hash,
        hashes = window.location.href.slice(window.location.href.indexOf('#') + 2).split('&');
    for (let val of hashes) {
        hash = val.split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//Динамическое подключение файлов стилей
function CSSLoad(file) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", file);
    link.setAttribute("title", "dynamicLoadedSheet");
    document.getElementsByTagName("head")[0].appendChild(link)
}

//Инициализация битрикс чата
function BitrixChatInit(lang){
    var key = (lang == 'en' || lang == 'th' ) ? '2_tlmkb7' 
                : (lang == 'ru') ? '4_w1ro7v' 
                : (lang == 'zh') ? '6_e7jx3s' 
                : '2_tlmkb7';
	(function(w,d,u){
      var s=d.createElement('script');s.async=1;s.src=u+'?'+(Date.now()/60000|0);
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
  })(window,document,'https://cdn.bitrix24.com/b3820821/crm/site_button/loader_' + key + '.js');
}

//Автоматическое открытие панели поиска
function searchTimeout() {
    setTimeout(() => OnSearchPanelShow(), 5000);
}

//Получение значений ползунков Цены
function getPrices(min, max, step) {
    $("#slider-range").slider({
        range: true,
        min: min,
        max: max,
        step: step,
        values: [min, max],
        slide: function(event, ui) {
            $("#priceMin").html(priceToString(ui.values[0]));
            $("#priceMax").html(priceToString(ui.values[1]));
        }
    });
    $("#priceMin").html(priceToString($("#slider-range").slider("values", 0)));
    $("#priceMax").html(priceToString($("#slider-range").slider("values", 1)));
};

//Получение значений ползунков Кол-ва кроватей
function getBeds(min, max) {
    $("#slider-beds").slider({
        range: true,
        min: min,
        max: max,
        step: 1,
        values: [min, max],
        slide: function(event, ui) {
            $("#bedMin").html(ui.values[0]);
            $("#bedMax").html(ui.values[1]);
        }
    });
    $("#bedMin").html($("#slider-beds").slider("values", 0));
    $("#bedMax").html($("#slider-beds").slider("values", 1));
};

//Обновление времени на сайте
function updateTime() {
    let dateTime = new Date(timeNow);
    let locale = $('html').attr('lang');
    let dateTimeNow = moment(dateTime).add(1, 'minutes');

    $('.time, .mobile-time').text(dateTimeNow.locale('en').format("H:mm"));
    $('.date, .mobile-date').text(dateTimeNow.locale('en').format("ddd., DD MMM"));
    timeNow = dateTimeNow.locale('en').format("MMMM D, YYYY HH:mm:ss");
}

//Получение языка браузера пользователя
function getLanguage(){
    let lang = navigator.language.substr(0,2),
        languages = 'en,ru,th,zh';
    return languages.indexOf(lang) != -1 ? lang : 'en';
}

//Форматирование и вывод серверного времени
function getTime() {
    var dateTimeNow = new Date(timeNow);
    $('.time, .mobile-time').text(moment(dateTimeNow).locale('en').format("H:mm"));
    $('.date, .mobile-date').text(moment(dateTimeNow).locale('en').format("ddd., DD MMM"));
}

//Функция при смене ориентации мобильного устройства
function readDeviceOrientation() {
    let winH = window.innerHeight || jQuery(window).height() || '100%';
    let winW = window.innerWidth || jQuery(window).width();

    if ($('#search-panel').hasClass('active')) {
        let left = 0;
        if (winW > 396)
            left = winW - 396;
        $('#search-panel').css('left', left + 'px');
    }
    jQuery('html').css('height', '100%');
    window.scrollTo(0, 0);
}

//Получение рондомного числа (Использую в кэшированных ajax запросах)
function getRandom() {
    return Math.random();
}

/* Получение цены и символа согласно выбранной валюте, ф-я написана 
на замену getPricesByCurrency и getCurrencySymbol.
В зависимости от кол-ва переданных аргументов будет возвращаться различный результат */
function getPricesAndSymbol(value) {
    let currency = $('#currency-select .select-active').attr('data-currency');
    let [entity, symbol] = currency === 'rub' ? [value * rubKoef, '₽']
               : currency === 'eur' ? [value * eurKoef, '€']
               : currency === 'usd' ? [value * usdKoef, '$']
               : currency === 'thb' ? [value, '฿']
               : undefined;
    return value === undefined ? symbol : Math.round(entity);
}










// --- other funcitons --- (not used in this file (mostly))

//Форматирование числового значения цены в форматированное для вывода на сайте
function priceToString(price) {
    let priceString = price.toString()
                        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    let priceStart = priceString.split(' ')[0];
    let priceEnd = priceString.replace(priceStart, '') || '';

    return '<span>' + priceStart + '</span>' + priceEnd;;
}

//запись Cookie в браузер
function setCookie(name, value, options) {
    let expires = options.expires;
    let updatedCookie = name + "=" + value;
    options = options || {};

    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString)
        options.expires = expires.toUTCString();
    value = encodeURIComponent(value);
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true)
            updatedCookie += "=" + propValue;
    }
    document.cookie = updatedCookie;
}

/* function initLiveChat(){
	window.__lc = window.__lc || {};
	window.__lc.license = 8995130;
	(function() {
	  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
	  lc.src = ('https:' == document.location.protocol ? 'https://' : 'https://') + 'cdn.livechatinc.com/tracking.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
	})();
} */

//Системные функции панорамы
function webglAvailable() {
    try {
        var canvas = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch (e) {
        return false;
    }
}
function getWmodeValue() { // not used nor this one, nor the previous one --- не используется
    return webglAvailable() ? 'direct' : 'opaque';
}

function accessWebVr() {
    unloadPlayer();
    eventUnloadPlugins();
    setTimeout(() => loadPlayer(true), 100);
}
function accessStdVr() {
    unloadPlayer();
    if (!$('#search-panel').hasClass('open')) 
        OnShowHideControls(false, false);

    resetValuesForPlugins();
    setTimeout(() => loadPlayer(false), 100);
}
function loadPlayer(isWebVr) {
    if (isWebVr) {
        embedpano({
            id: "krpanoSWFObject",
            xml: panoVrXml,
            target: "panoDIV",
            passQueryParameters: true,
            bgcolor: "#000000",
            html5: "only+webgl",
            focus: false,
            vars: {
                skipintro: true,
                norotation: true
            }
        });
    } else {
        let isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
        embedpano({
            id: "krpanoSWFObject",
            xml: panoXml,
            target: "panoDIV",
            passQueryParameters: true,
            bgcolor: "#000000",
            focus: false,
            html5: "always"
        });
    }
    if (top.location === self.location)
        kpanotour.Focus.applyFocus();
}
function unloadPlayer() {
    if (jQuery('#krpanoSWFObject'))
        removepano('krpanoSWFObject');
}
function isVRModeRequested() {
    let params = window.location.hash.substring(2).split('&');

    for (let i = 0; i < params.length; i++) {
        if (params[i].toLowerCase() == "vr")
            return true;
    }
    return false;
}


//Вывод информационного сообщения на сайте --- не используется
function infoMessage(message) {
    $('body').append('<div class="info-message" style="display: none;">' + message + '</div>');
    $('body').queue(function() {
        $('.info-message').fadeIn();
        setTimeout(function() {
            $('.info-message').fadeOut();
            $('.info-message').queue(function() {
                $('.info-message').remove();
                $('.info-message').dequeue();
            });
        }, 3000);
        $('body').dequeue();
    });
}

//Функция изменения hash ссылки
$(window).on('hashchange', function() {
    let categoryHashId = getUrlVars()["c"],
        languageKey = getUrlVars()["lang"];
    if (!!languageKey)
        $('html').attr('lang', languageKey);
    if (!categoryHashId) {
        getPano(getUrlVars()["p"].split('-')[0]);
    } else {
        categoryHashId = getUrlVars()["c"].split('-')[0];
        getPanoByCategoryId(categoryHashId);
        OnSearchPanelShow();
    }
});

function OnVrMode() { // --- не используется
    accessWebVr();
    OnShowHideControls(true, false);
}





// --- some frontend ---

//Открытие панели поиска(нужно поудалять лишнее, менялось много связанного функционала, накопился мусор)
function OnSearchPanelShow() {
    let $this = $(this),
        placeId = $('#search-panel').attr('data-place-id');
      
    OnCloseShareBtns();
    $('.wrap_mW._show_1e._orinationLeft_3O').hide();
    OnCloseCategoryShareBtns();
    clearTimeout(timeout);
    $('#search-panel').addClass('open');
    OnShowHideControls(true, true);
    $('#search-panel').animate({
        width: (!isMobile.any() ? 396 : '100%')
    }, 500);
    $('#search-panel').queue(function() {
        $('.search-panel-content').fadeIn(500);
        if (!isMobile.any())
            $("#search").focus();
        setTimeout(function(){
            if (!$.cookie('first_visit')) {
                $.cookie('first_visit', true, {
                    expires: 300,
                    path: '/'
                });
            }
        }, 500);
        if (isMobile.any()) {
            var deviceWidthNow = window.innerWidth;
            var left = 0;
            if (deviceWidthNow > 396)
                left = deviceWidthNow - 396;
            $('#search-panel').css('left', left + 'px').addClass('active');
        }
        $('#search-panel').dequeue();
    });
}

//Скрытие кнопок шаринга
function OnCloseShareBtns() {
    if ($("#share-btn").hasClass('open')) {
        $("#share-btn").removeClass('open');
        $("#control-share-btns").animate({
            height: '0px'
        }, 500).hide('500');
    }
}

//Показать/Скрыть элементы управления панорамы(используется при открытии/закрытии окон на сайте)
function OnShowHideControls(isHide, isSearch) {
    if (isHide) {
        if (isMobile.any() || !isSearch) {
            $('#day-night-btn').css('z-index', '-1');
            $('#about-object-btn, #panoLocation, .site-bar-btns, .sample-info').fadeOut(500);
        }
        $('.search-tabs, .logo').fadeOut(500);
    } else {
        if (isMobile.any() || !isSearch) {
            $('#about-object-btn, #panoLocation, .site-bar-btns, .sample-info').fadeIn(500);
            $('#day-night-btn').css('z-index', '10000000000');
        }
        $('.search-tabs, .logo').fadeIn(500);
    }
}