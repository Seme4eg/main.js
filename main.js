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
var preloader = '<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>';
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
//Форматирование числового значения цены в форматированное для вывода на сайте
function priceToString(price) {
    var priceString = price.toString();
    var price = priceString.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    var priceStart = price.split(' ')[0];
    var priceEnd = price.replace(priceStart, '');
    if (priceEnd === undefined) {
        priceEnd = '';
    }
    var entity = '<span>' + priceStart + '</span>' + priceEnd;
    return entity;
}

//запись Cookie в браузер
function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}
// function initLiveChat(){
// 	window.__lc = window.__lc || {};
// 	window.__lc.license = 8995130;
// 	(function() {
// 	  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
// 	  lc.src = ('https:' == document.location.protocol ? 'https://' : 'https://') + 'cdn.livechatinc.com/tracking.js';
// 	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
// 	})();
// }

//Получение рондомного числа (Использую в кэшированных ajax запросах)
function getRandom() {
    return Math.random();
}

//Системные функции панорамы
function webglAvailable() {
    try {
        var canvas = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch (e) {
        return false;
    }
}
function getWmodeValue() {
    var webglTest = webglAvailable();
    if (webglTest) {
        return 'direct';
    }
    return 'opaque';
}
function accessWebVr() {
    unloadPlayer();
    eventUnloadPlugins();
    setTimeout(function() {
        loadPlayer(true);
    }, 100);
}
function accessStdVr() {
    unloadPlayer();
    if (!$('#search-panel').hasClass('open')) {
        OnShowHideControls(false, false);
    }
    resetValuesForPlugins();
    setTimeout(function() {
        loadPlayer(false);
    }, 100);
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
        var isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
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
    if (top.location === self.location) {
        kpanotour.Focus.applyFocus();
    }
}
function unloadPlayer() {
    if (jQuery('#krpanoSWFObject')) {
        removepano('krpanoSWFObject');
    }
}
function isVRModeRequested() {
    var querystr = window.location.hash.substring(2);
    var params = querystr.split('&');
    for (var i = 0; i < params.length; i++) {
        if (params[i].toLowerCase() == "vr") {
            return true;
        }
    }
    return false;
}
function OnVrMode() {
    accessWebVr();
    OnShowHideControls(true, false);
}

function OnLoadPano(xmlname, sphere) {
	var panoWindow = document.getElementById("krpanoSWFObject");
  panoWindow.call("onout();loadpano(" + xmlname + ", startscene=" + sphere + ", MERGE, ZOOMBLEND(0.5, 8.0));");
	panoWindow.call("blendmode_prepareblendmode");
	panoWindow.call('stopallsounds');
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
//Форматирование и вывод серверного времени
function getTime() {
    var dateTimeNow = new Date(timeNow);
    $('.time, .mobile-time').text(moment(dateTimeNow).locale('en').format("H:mm"));
    $('.date, .mobile-date').text(moment(dateTimeNow).locale('en').format("ddd., DD MMM"));
}

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
//Автоматическое открытие панели поиска
function searchTimeout() {
    setTimeout(() => OnSearchPanelShow(), 5000);
}

//Вывод информационного сообщения на сайте
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

//Открытие панели поиска(нужно поудалять лишнее, менялось много связанного функционала, накопился мусор)
function OnSearchPanelShow() {
  var $this = $(this);
	var placeId = $('#search-panel').attr('data-place-id');
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
        if (!isMobile.any()) {
            $("#search").focus();
        }
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
            if (deviceWidthNow > 396) {
                left = deviceWidthNow - 396;
            }
            $('#search-panel').css('left', left + 'px').addClass('active');
        }
        $('#search-panel').dequeue();
    });
}
//Поиск категорий/Обектов при клике на категорию(тоже присутствует ненужный код)
function OnSearch() {
	isLoaded = true;
    $('.filters, .filters-body').hide();
    var pagetitle = $('#search').val();
    var category = $('.search-logo').attr('data-category');
    var categoryId = parseInt($('.search-logo').attr('data-id'));
    var isFolder = $('.search-logo').attr('data-isfolder');
    if (parseInt(isFolder) == 0) {
        isFolder = false;
    } else {
        isFolder = true;
    }
    window.clearTimeout(timer);
    if (pagetitle.length > 1) {
        timer = setTimeout(function() {
            OnAjaxSearch(pagetitle, false, 0, 0);
        }, 1000);
    } else {
        $('.search-content').empty();
        timer = setTimeout(function() {
            if ($('#map-search-btn').hasClass('active')) {
                appendMap(false);
            } else {
                if (categoryId == 0) {
                    GetTopObjects();
                } else {
                    OnCategorySearch(category, categoryId, isFolder, '');
                }
            }
        }, 1000);
    }
}
//Переключение языка на сайте(раньше было без перезагрузки страницы, но из-за сторонних сервисов чата приходится перезагружать, хотя нужно в поддержке битрикса узнать, может можно менять язык чата динамически, в предидущем сервисе это было невозможно)
function OnLanguageChange() {
    var $this = $(this);
	var hashNow = window.location.hash;
    // var panoId = getUrlVars()["p"];
    // var categoryId = parseInt($('.search-logo').attr('data-id'));
    // var category = $('.search-logo').attr('data-category');
    // var isFolder = parseInt($('.search-logo').attr('data-isfolder'));
    // if (isFolder == 0) {
        // isFolder = false;
    // } else {
        // isFolder = true;
    // }
    contextKey = $this.data('key');
    window.location.hash = hashNow.replace(hashNow.substr(-7,7), 'lang=' + contextKey);
		setTimeout(function () { window.location.reload(true); }, 0);
    // var culture = $this.data('culture');
    // $('.language-active').text($this.text());
    // $this.parents('.lang-links').hide("slide", {
        // direction: "right"
    // }, 500);
    // $('html').attr('lang', culture);
    // $('.hub-logo, .audio-player, .feed-back-btn').show();
    // $('.lang-links li a').removeClass('active');
    // $('.language-active').removeClass('open');
    // $this.addClass('active');
	// getBtnTranslations(contextKey);
    // if (categoryId == 0) {
        // GetTopObjects();
        // GetParentCategories();
    // } else {
        // OnCategorySearch(category, categoryId, isFolder, '');
        // GetParentCategories();
    // }
}

//Закрытие окна О компании
function OnCloseModal() {
    $('.close-modal-btn, .about-content').hide();
    $('#about-body .our-location, #about-body .privacy-policy').remove();
    $('.about-content .about-content-body').empty();
    $('.about-modal-window').animate({
        left: '100%'
    }, 500);
    OnShowHideControls(false, false);
}
//Закрытие панели поиска
function OnCloseSearchPanel(isAnimate) {
    OnCloseCategoryShareBtns();
    $('.wrap_mW._show_1e._orinationLeft_3O').show();
    close = false;
    clearTimeout(timeout);
    $('#search').val('');
    $('#category-search-btn, #map-search-btn').removeClass('open').removeClass('active');
    $('#mobile-category-search-btn, #mobile-map-search-btn').removeClass('active');
    OnShowHideControls(false, true);
    if (isAnimate) {
        $('#search-panel').css("left", "auto");
        $('#search-panel').animate({
            width: 0
        }, 500);
    } else {
        $('#search-panel').css({
            "width": "0px"
        });
        setTimeout(function() {
            $('#search-panel').css({
                "left": "auto"
            });
        }, 500);
    }
    $('.search-panel-content').hide();
    $('#search-panel').removeClass('open');
}
//Закрытие окна Видео объекта
function OnCloseVideoModal() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    panoWindow.call('showpanospotsaction');
    $('.video-modal-close-btn, .video-modal-content, .video-modal-window img').hide();
    $('.video-modal-window').animate({
        left: '100%'
    }, 500);
    $('#panoDIV').show();
    OnShowHideControls(false, false);
    $('#video-iframe iframe').attr('src', '');
}
//Закрытие окна контента
function OnCloseInnerModal() {
    $('.inner-content-close-btn, .inner-content').hide();
    $('.inner-content').empty();
    $('.inner-modal').animate({
        left: '50%',
        right: '50%',
        top: '50%',
        bottom: '50%'
    }, 500);
}
//Закрытие окна информации об объекте
function OnCloseAboutObjectModal() {
    $('.owl-navigation .owl-prev, .owl-navigation .owl-next, #booking-block .special-offer').remove();
    $('#news-block, .object-location').empty().removeClass('col-sm-6');
    $('#gallery-block, #booking-block').removeClass('col-sm-6').removeClass('col-sm-offset-3');
    $('.about-object-close-btn, .about-object-content, #booking-block').hide();
    $('.about-object-modal').animate({
        right: '100%'
    }, 500);
    OnShowHideControls(false, false);
    $('.owl-main, .owl-navigation-body .owl-stage, #gallery-block .object-content, #aboutObjectTitle').empty();
}
//Закрытие окна помощи
function OnCloseHelpModal() {
    $('.help-content').empty();
    $('.help-content-close-btn, .help-content').hide();
    $('.help-modal').animate({
        left: '100%'
    }, 500);
    OnShowHideControls(false, false);
}
//получение значения параметра ссылки
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 2).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//Функция изменения hash ссылки
$(window).on('hashchange', function() {
    var categoryHashId = getUrlVars()["c"];
    var languageKey = getUrlVars()["lang"];
    if (languageKey != '' || languageKey != 'undefined' || languageKey != null) {
        $('html').attr('lang', languageKey);
    }
    if (typeof categoryHashId === 'undefined' || categoryHashId === null) {
        getPano(getUrlVars()["p"].split('-')[0]);
    } else {
        categoryHashId = getUrlVars()["c"].split('-')[0];
        getPanoByCategoryId(categoryHashId);
        OnSearchPanelShow();
    }
});

//Получение языка браузера пользователя
function getLanguage(){
  let lang = navigator.language;
  let languages = 'en,ru,th,zh';
  return languages.indexOf(lang) != -1 ? lang.substr(0,2) : 'en';
}

$(document).ready(OnDocumentReady);
//Функция когда страница загружена

document.addEventListener('DOMContentLoaded', function () {
	if(isMobile.AndroidApp() || isMobile.iOSApp())
        $('#fullScreen-btn').parent('li').hide();
        
    let categoryId = getUrlVars()["c"];
	let cultureKey = getUrlVars()["lang"];
	let panoId = getUrlVars()["p"];
	let krpano = document.getElementById("krpanoSWFObject");
	let deviceHeight = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.height : window.innerHeight;
	let deviceWidth = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.width : window.innerWidth;
	if(isMobile.any()){
		$('#modalMap').css({'height': (deviceHeight) + 'px', 'width': (deviceWidth) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-mobile-close-btn"></div>');
	}
	else{
		$('#modalMap').css({'height': (deviceHeight - 50) + 'px', 'width': (deviceWidth - 200) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-close-btn"></div>');
	}
	if(typeof cultureKey === 'undefined')
		cultureKey = 'en';
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
        
    CSSLoad('https://thai360.info/assets/css/owl.carousel.css');
    CSSLoad('https://thai360.info/assets/css/bootstrap.css');
    CSSLoad('https://thai360.info/assets/css/jquery.scrollbar.css');
    CSSLoad('https://thai360.info/assets/css/main.css?' + getRandom());
    //Получение переводов
	   getBtnTranslations(cultureKey);
    if ((typeof categoryId === 'undefined' || categoryId === null) && (parseInt($('.search-logo').attr('data-id')) != 35)) {
        GetTopObjects();
    } else {
        OnSearchPanelShow();
        $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
    }
	//Инициализация битрикса
	BitrixChatInit(cultureKey);
	if (!$.cookie('using_cookies')) 
        setTimeout(() => $('.cookies').slideDown(), 15000);
	if(typeof categoryId != 'undefined' || parseInt(panoId) == 26)
		searchTimeout();

    GetParentCategories();
    GetFilterMap();
	//setTimeout(function(){firstLoad = false;}, 1000);
});
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

/* Получение цены и символа согласно выбранной валюте, ф-я написана 
на замену getPricesByCurrency и getCurrencySymbol.
В зависимости от кол-ва переданных аргументов будет возвращаться различный результат */
function getPricesAndSymbol(value) {
    let currency = $('#currency-select .select-active').attr('data-currency');
    let [entity, symbol] = currency === 'rub' ? [value * rubKoef, '₽']
               : currency === 'eur' ? [value * eurKoef, '€']
               : currency === 'usd' ? [value * usdKoef, '$']
               : currency === 'thb' ? [value, '฿'] // мне кажется в value * 1 нет смысла..
               : undefined;
    return value === undefined ? symbol : Math.round(entity);
}

//Получение строки id-шников выбранных районов в фильтре
function getDistrictArray() {
    let checkedDistricts = [];
    $('.districts p label input:checked').each(function() {
        checkedDistricts.push('district==' + $(this).val());
    });
    return checkedDistricts.length < 1 ? 0 
            : checkedDistricts.join(',');
}
//Получение кол-ва подгруженных обеъктов в окне поиска
function getObjectsCount() {
    let count = 0;
    $('#site-search-results .sisea-result.offset').each(() => count++);
    return count;
}
//Получение строки id-шников загруженных объектов для исключения их при подгрузке объектов при пролистывании
function GetExludeObjects(forSearch) {
    let excludeObjects = [];
    $('.category-list .sisea-result a').each(function() {
        let $this = $(this);
		if(forSearch)
			excludeObjects.push($this.attr('data-id'));
		else
			excludeObjects.push('-' + $this.attr('data-id'));
    });
    return excludeObjects.length != 0 ? excludeObjects.join(',') : '0';
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
