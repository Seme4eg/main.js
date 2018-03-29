var owl;
var owl2;
var timeout;
var timer;
var videoTimeOut;
loadMap = false;
var loadGallery = false;
var panoIsLoad = false;
var windowLoad = false;
var dateTimeNow = new Date();
var breadCrumbsHeight = $('#bread-crumbs').height();
var map;
var firstLoad = true;
var pageLoad = true;
var myVar;
var timeNow = $('#startTime').val();
var randomHash = 123123;
var isLoaded = true;
var offset = 0;
var userAgent = window.navigator.userAgent;
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
function initMapMarker(placeId, elementId) {
    var map = new google.maps.Map(document.getElementById(elementId), {
        center: {lat: 0, lng: 0},
        zoom: 11,
		scrollwheel: true,
        gestureHandling: 'cooperative'
    });
	//var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
	var lang = $('html').attr('lang');
    service.getDetails({
        placeId: placeId
    }, function(place, status) {
			map.setZoom(11);
            map.setCenter(place.geometry.location);
			if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var directionUrl = 'https://www.google.com/maps/dir/?api=1&origin=' + position.coords.latitude + ',' + position.coords.longitude + '&destination=QVB&destination_place_id=' + placeId;
					$('#' + elementId).prepend('<a href="' + place.url + '" class="view-map-btn" target="_blank">' + translation.View_On_Google_Maps(lang) + '</a>\
					<a href="' + directionUrl + '" class="direct-map-btn" target="_blank">' + translation.Get_Directions(lang) + '</a>');
			});
        }
    });
}
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
function stopPlayer() {
    var player = document.getElementById('audio-player');
    var playerBtn = $('.stop-play');
    if (playerBtn.hasClass('active')) {
        playerBtn.removeClass('active').css('background-image', 'url(/assets/images/play_music_icon.svg)');
        player.pause();
    }
}

function getRandom() {
    return Math.random();
}

function OnShowFilters() {
    $('.scroll-wrapper.site-search-results, .show-filters, .search-panel-footer, .sisea-search-form').hide();
    $('.search-panel-header').hide();
    $('.hide-filters, .filters-body, .filters').show();
    $('.filters-body').addClass('active');
}

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

function addDayNight(img, display) {
	var imgName = img.replace('indexdata/graphics/compunics-daynight/', '').replace('.png', '');
	var lang = getUrlVars()["lang"];
	if(typeof lang === 'undefined'){
		lang = 'en';
	}
	$('#day-night-btn span').remove();
    $('#day-night-btn').css({
        "background-image": "url('" + img.replace('indexdata', 'assets').replace('png', 'svg') + "')",
        "display": display
    });
	if(imgName == 'nav_up_with_bad'){
		$('#day-night-btn').append('<span>' + translation.No_Furniture(lang) + '</span>');
	}
	else if(imgName == 'nav_up_no_bad'){
		$('#day-night-btn').append('<span>' + translation.Furniture(lang) + '</span>');
	}
	else if(imgName == 'nav_up_day'){
		$('#day-night-btn').append('<span>' + translation.Night_Mode(lang) + '</span>');
	}
	else if(imgName == 'nav_up_night'){
		$('#day-night-btn').append('<span>' + translation.Day_Mode(lang) + '</span>');
	}
	else if(imgName == 'nav_up_land'){
		$('#day-night-btn').append('<span>' + translation.D_Model(lang) + '</span>');
	}
	else if(imgName == 'nav_up_3d'){
		$('#day-night-btn').append('<span>' + translation.No_D_Model(lang) + '</span>');
	}
	console.log(imgName);
}

function readDeviceOrientation() {
    var winH = window.innerHeight ? window.innerHeight : jQuery(window).height();
    var winW = window.innerWidth ? window.innerWidth : jQuery(window).width();
    if (!winH || winH == 0) {
        winH = '100%';
    }
    if ($('#search-panel').hasClass('active')) {
        var left = 0;
        if (winW > 396) {
            left = winW - 396;
        }
        $('#search-panel').css('left', left + 'px');
    }
    jQuery('html').css('height', '100%');
    window.scrollTo(0, 0);
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

function fullScreen() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    var $this = $(this);
    if ($this.hasClass('full-screen')) {
        panoWindow.set('fullscreen', false);
        $this.removeClass('full-screen');
        $('.logo').css('z-index', 10000);
    } else {
        panoWindow.set('fullscreen', true);
        $this.addClass('full-screen');
        $('.logo').css('z-index', 10000000000);
    }
}

function giroscopeOnOff() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    var $this = $(this);
    if ($this.hasClass('active')) {
        panoWindow.set('plugin[gyroscope].enabled', false);
        $this.removeClass('active');
    } else {
        panoWindow.set('plugin[gyroscope].enabled', true);
        $this.addClass('active');
    }
}

function hotspotsHideShow() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    var $this = $(this);
    if ($this.hasClass('visible')) {
        panoWindow.call('hidepanopointspots');
        $this.removeClass('visible');
    } else {
        panoWindow.call('showpanopointspots');
        $this.addClass('visible');
    }
}

function goHome() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    var parentLink = $('#home-btn').attr('data-link');
    var scene = panoWindow.get("xml.scene");
    var sphere = getUrlVars()["s"];
    if (parseInt(parentLink) == 0) {
        panoWindow.call('startup');
        panoWindow.call('stopallsounds');
    } else {
        if (typeof sphere === 'undefined' || sphere === null) {
            panoWindow.call('startup');
            panoWindow.call('stopallsounds');
        } else {
            if (parseInt(scene.replace(/\D+/g, "")) == parseInt(sphere.replace(/\D+/g, ""))) {
                window.location.hash = parentLink;
            } else {
                panoWindow.call('startup');
                panoWindow.call('stopallsounds');
            }
        }
    }
}

function goBack() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    var scene = panoWindow.get("xml.scene");
    var sphere = getUrlVars()["s"];
    if (typeof sphere === 'undefined' || sphere === null) {
        panoWindow.call('startup');
        panoWindow.call('stopallsounds');
    } else {
        if (parseInt(scene.replace(/\D+/g, "")) == parseInt(sphere.replace(/\D+/g, ""))) {
            history.back();
        } else {
            panoWindow.call('startup');
            panoWindow.call('stopallsounds');
        }
    }
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

function CSSLoad(file) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", file);
    link.setAttribute("title", "dynamicLoadedSheet");
    document.getElementsByTagName("head")[0].appendChild(link)
}

function getTime() {
    var locale = $('html').attr('lang');
    var dateTimeNow = new Date(timeNow);
    $('.time, .mobile-time').text(moment(dateTimeNow).locale('en').format("H:mm"));
    $('.date, .mobile-date').text(moment(dateTimeNow).locale('en').format("ddd., DD MMM"));
}

function updateTime() {
    var dateTime = new Date(timeNow);
    var locale = $('html').attr('lang');
    var dateTimeNow = moment(dateTime).add(1, 'minutes');
    $('.time, .mobile-time').text(dateTimeNow.locale('en').format("H:mm"));
    $('.date, .mobile-date').text(dateTimeNow.locale('en').format("ddd., DD MMM"));
    timeNow = dateTimeNow.locale('en').format("MMMM D, YYYY HH:mm:ss");
}
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
	AndroidApp: function(){
		return navigator.userAgent.match(/AndroidApp/i);
	},
	iOSApp: function(){
		return navigator.userAgent.match(/iOSApp/i);
	},
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
// if (isMobile.any()) {
//     var LC_API = LC_API || {};
//     LC_API.on_chat_window_minimized = function() {
//         OnShowHideControls(false, false);
//     };
//     LC_API.on_chat_window_opened = function() {
// 		if($('#search-panel').hasClass('open')){
// 			OnCloseSearchPanel(false);
// 		}
//         OnShowHideControls(true, false);
//     };
// }
function searchTimeout() {
    timeout = setTimeout(function() {
        OnSearchPanelShow();
		$('.greeting-box-close-btn').click();
    }, 5000);
}

function initMap(elementId){
    var myLatlng = new google.maps.LatLng($('#search-panel').attr('data-latitude'), $('#search-panel').attr('data-longitude'));
    map = new google.maps.Map(document.getElementById(elementId), {
        center: myLatlng,
        zoom: mapZoom,
        disableDefaultUI: true,
        scrollwheel: true,
        gestureHandling: 'cooperative'
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: mapTitle
    });
    marker.setMap(map);
}

function initOurLocationMap() {
    var myLatlng = new google.maps.LatLng(7.9927999, 98.3056705);
    map = new google.maps.Map(document.getElementById('ourLocation'), {
        center: myLatlng,
        zoom: 10,
        disableDefaultUI: true,
        scrollwheel: false,
        gestureHandling: 'cooperative'
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Boat Avenue, 49/15 Bandon-Cherngtalay Road, Thalang, Choeng Thale, Phuket, 83110'
    });
    marker.setMap(map);
}

function appendMap(withPlaceId) {
	var placeId = $('#search-panel').attr('data-place-id');
    $('.search-content').empty().append('<div id="map"></div>');
    $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
    setTimeout(function(){
		if(withPlaceId){
			initMapMarker(placeId, 'map');
		}
		else{
			initMap('map');
		}
		}, 500);
}

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

function OnCloseShareBtns() {
    if ($("#share-btn").hasClass('open')) {
        $("#share-btn").removeClass('open');
        $("#control-share-btns").animate({
            height: '0px'
        }, 500).hide('500');
    }
}

function OnCloseCategoryShareBtns() {
    if ($("#category-share-btn").hasClass('open')) {
        $("#category-share-btn").removeClass('open');
        $("#category-control-share-btns").animate({
            height: '0px'
        }, 500).hide('500');
    }
}

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

function OnSearch() {
	isLoaded = true;
    $('.filters, .filters-body').hide();
    // if (!isMobile.any()) {
        // $('.search-panel-header').show();
        // $('.search-panel-body').css('top', '150px');
    // }
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

function GetParentCategories() {
    // if (!isMobile.any()) {
        // $('.search-panel-body').css('top', '150px');
    // }
    $('.search-logo').attr('data-categoryid', 0).attr('data-isfolder', 1);
    $('.parent-category').remove();
    $('.filters, .filters-body').hide();
    $('.filters-body').removeClass('active');
    var searchResults = $('#main-categories .category-list');
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/get-parent-categories',
        data: {
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {
            searchResults.html(preloader);
        },
        success: function(data) {
            var items = data.items;
            searchResults.hide().empty();
						searchResults.append('<li><a href="https://hub360.info"><span style="background-image: url(/assets/images/logo360.svg);"></span><p>HUB360</p></a></li>');
            for (key in items) {
                var item = items[key];
                searchResults.append('<li class="' + item.catClass + '">\
										<a data-id="' + item.itemId + '" data-search-id="' + item.searchId + '" title="' + item.title + '">\
										<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
											  viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:' + item.borderColor + ';" xml:space="preserve">\
											<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
											<g>\
											 <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
											  C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
											</g>\
											<g>\
											 <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
											 <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
											   M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
											</g>\
										</svg>\
											<span>\
												<i style="background-image: url(' + item.icon + ');"></i>\
											</span>\
											<p>' + item.title + '</p>\
										</a>\
									</li>');
            }
            searchResults.fadeIn('500');
        }
    });
}

function GetFilterMap() {
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    var rentType = parseInt($('.radio-btns .select-list input:checked').val());
    var type = parseInt($('.radio-btns input[name="type"]:checked').val());
    var districtsContainer = $('.districts');
    var points = $('.district-points');
    var map = $('.map');
    var categoryId = $('#type-select .select-active').attr('data-categoryid')
    var locationFilter = $('.location-filter');
    $.ajax({
        url: 'https://thai360.info/api/get-filter-map',
        data: {
            lang: cultureKey,
            type: type,
            rentType: rentType,
            categoryId: categoryId,
			rand: getRandom()
        },
        beforeSend: function() {
            map.append(preloader);
        },
        success: function(data) {
            districtsContainer.empty();
            points.empty();
            var districts = data.districts;
            var districtPoints = data.disrictPoints;
            for (key in districts) {
                var district = districts[key];
                districtsContainer.prepend('<p id="' + district.alias + '-district"><label><input name="' + district.alias + '" type="checkbox" value="' + district.value + '"><span>' + district.count + '</span>' + district.title + '</label></p>');
            }
            for (key in districtPoints) {
                var point = districtPoints[key];
                points.append('<li id="' + point.alias + '-point" data-district="' + point.alias + '-district" style="display: none;"><a></a></li>');
            }
            map.find('svg').remove();
            map.fadeIn('500');
        }
    });
}

function GetTopObjects() {
    if (!isMobile.any()) {
        $('.search-panel-header').show();
        $('.search-panel-body').css('top', '150px');
    }
    $('.search-logo').attr('data-id', 0).attr('data-isfolder', 1).attr('data-category', 0);
    $('.parent-category').remove();
    $('.absolute, .filters, .filters-body').hide();
    $('.filters-body').removeClass('active');
    var searchResults = $('.site-search-results .search-content');
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/get-top-objects',
        data: {
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {
            searchResults.html(preloader);
        },
        success: function(data) {
            var items = data.items;
            searchResults.hide().empty();
            $('#search').attr('placeholder', translation.Search(cultureKey));
            $('.back').attr('data-id', 0).attr('data-search-id', 0);
            var $container = searchResults.append('<div class="category-list"></div>').find('div');
            for (key in items) {
                var item = items[key];
                if (item.type == 1 || item.type == 2 || item.type == 3) {
                    $container.append('<div class="sisea-result estate search offset">\
													<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div> <p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
													<div class="object-description">\
													<p class="card-object-location"><i></i>' + item.location + '</p>\
													<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + (item.sold == 'true' ? '<p class="object-price">Sold</p>' : (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<i>' + '<b>' + getCurrencySymbol() + '</b>' + '</i>' + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
									</div>');
                } else {
                    $container.append('<div class="sisea-result slide offset">\
												<a ' + (item.objectLink.length < 10 ? 'href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '"' : 'href="' + item.objectLink + '" target="_blank"') + ' title="' + item.title + '" style="background-image: url(' + item.image + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + (item.type == 3 || item.type == 2 || item.type == 1 ? '<p>' + item.titleWithCategory + '</p>' : '<p class="big-title">' + item.titleWithLocation + '</p>') + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>' + (item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '') + '</div>');
                }
                $.cookie('object_' + item.itemId, true, {
                    expires: 300,
                    path: '/'
                });
            }
            searchResults.fadeIn('500');
        }
    });
}

function OnFilterSearch() {
    $('.filters-body, .hide-filters, .search-panel-header').hide();
    $('.filters-body').removeClass('active');
    $('.search-logo').attr('data-isfilter', 1);
    isLoaded = true;
    var priceNowMin = parseInt($("#slider-range").slider("values", 0));
    var priceNowMax = parseInt($("#slider-range").slider("values", 1));
    $('.scroll-wrapper.site-search-results, .show-filters, .sisea-search-form, .search-panel-footer').show();
    var districts = getDistrictArray();
    var rentType = parseInt($('.radio-btns .select-list input:checked').val());
    var categoryId = $('#type-select .select-active').attr('data-categoryId');
    var type = $('.radio-btns input[name="type"]:checked').val();
    $('.parent-category').remove();
    var searchResults = $('.site-search-results .search-content');
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/get-real-estate-objects',
        data: {
            categoryId: categoryId,
            lang: cultureKey,
            type: type,
            rentType: rentType,
            currency: $('#currency-select .select-active').attr('data-currency'),
            bedroomsMin: $("#slider-beds").slider("values", 0),
            bedroomsMax: $("#slider-beds").slider("values", 1),
			rand: getRandom()
        },
        beforeSend: function() {
            searchResults.html(preloader);
        },
        success: function(data) {
            var items = data.items;
            var parentId = data.parentId;
            var count = 1;
            searchResults.hide().empty();
            $('#search').attr('placeholder', translation.Search(cultureKey));
            $('.back').attr('data-id', parentId).attr('data-search-id', parentId);
            $('.absolute').show();
            var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');
            if (type == 1) {
                for (key in items) {
                    var item = items[key];
                    if (rentType == 1 && categoryId != '327-land') {
                        if (parseInt(item.priceRentDaily) >= priceNowMin && parseInt(item.priceRentDaily) <= priceNowMax && parseInt(item.priceRentDaily) != 0 && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                            $container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentDaily) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceRentDaily) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                            count++;
                        };
                    } else {
                        if (parseInt(item.priceRentMonthly) >= priceNowMin && parseInt(item.priceRentMonthly) <= priceNowMax && parseInt(item.priceRentMonthly) != 0 && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                            $container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                            count++;
                        };
                    }
                    $.cookie('object_' + item.itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                }
            } else {
                for (key in items) {
                    var item = items[key];
                    console.log(item.priceSale);
                    if ((parseInt(item.priceSale) >= priceNowMin) && (parseInt(item.priceSale) <= priceNowMax) && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                        $container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                        count++;
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                    };
                }
            }
            searchResults.fadeIn('500');
        }
    });
}

function GetHotRealEstates() {
    var searchResults = $('.site-search-results  .search-content');
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $('.search-logo').empty();
    $('.filters, .show-filters, .absolute').show();
    $('.search-panel-header, .main-categories, .search-time').hide();
    $('#search-input').addClass('filter-search');
    $('#site-search-results').parent('div').addClass('estate-content');
    $('.parent-category').remove();
    if (!isMobile.any()) {
        $('.search-panel-body').css('top', '90px');
    }
    $.ajax({
        url: 'https://thai360.info/api/get-hots-real-estates',
        data: {
            lang: cultureKey,
            currency: $('#currency-select .select-active').attr('data-currency'),
			rand: getRandom()
        },
        beforeSend: function() {
            searchResults.html(preloader);
        },
        success: function(data) {
            var hots = data.hots;
            var items = data.items;
            var parentId = data.parentId;
            searchResults.hide().empty();
            $('.search-logo').append('<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill: rgba(255,0,0, 1);" xml:space="preserve">\
									<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
									<g>\
									<path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
									C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
									</g>\
									<g>\
									<path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
									<path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
									M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
									</g>\
								</svg>\
								<i style="background-image: url(/assets/images/category-icons/R_Panel_Icon_Real_Estate.svg);"></i>').css('background-image', '').attr('data-id', 35).attr('data-category', '35-real-estate').attr('data-description', data.parentDescription).attr('data-url', data.parentUrl).attr('data-image', data.parentImage).attr('data-isfolder', 0);
            $('#search').attr('placeholder', translation.Search(cultureKey));
            $('.back').attr('data-id', parentId).attr('data-search-id', parentId);
            var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');
            for (key in hots) {
                var item = hots[key];
                $container.append('<div class="sisea-result estate">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div> <p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.sold == 'true' ? '<p class="object-price">Sold</p>' : (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                $.cookie('object_' + item.itemId, true, {
                    expires: 300,
                    path: '/'
                });
            };
            searchResults.fadeIn('500');
        }
    });
}

function OnCategorySearch(category, categoryId, isFolder, title) {
    if (categoryId == 35) {
        GetHotRealEstates();
    } else {
        $('.search-logo').empty();
        $('.absolute, .filters, .filters-body').hide();
        $('.filters-body').removeClass('active');
        var searchResults = $('.site-search-results .search-content');
        var cultureKey = getUrlVars()["lang"];
		if(typeof cultureKey === 'undefined'){
			cultureKey = 'en';
		}
        var url = '';
        if (!isFolder) {
            url = 'https://thai360.info/api/objects';
        } else {
            url = 'https://thai360.info/api/categories';
        }
        $.ajax({
            url: url,
            data: {
                parents: category,
                categoryId: categoryId,
                lang: cultureKey,
                pagetitle: title,
				rand: getRandom()
            },
            beforeSend: function() {
                searchResults.html(preloader);
            },
            success: function(data) {
                var items = data.items;
                var parentId = data.parentId;
                var parentCategory = data.parentCategory;
                searchResults.hide().empty();
                $('#search').attr('placeholder', translation.Search(cultureKey));
                var baseUrl = '/' + cultureKey + '/';
                if (cultureKey == 'en') {
                    baseUrl = '/';
                }
                $('.back').attr('data-id', parentId).attr('data-search-id', parentCategory);
                if (categoryId != 1220) {
                    $('.absolute').show();
                }
                if (!isMobile.any()) {
                    $('.search-panel-header').show();
                    $('.search-panel-body').css('top', '150px');
                }
                if (data.parentId != 0) {
                    $('.search-logo').append('<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
											  viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:' + data.parentBorderColor + ';" xml:space="preserve">\
											<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
											<g>\
											 <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
											  C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
											</g>\
											<g>\
											 <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
											 <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
											   M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
											</g>\
										</svg>\
							<i style="background-image: url(' + data.parentIcon + ');"></i>').attr('data-id', categoryId).attr('data-category', category).attr('data-description', data.parentDescription).attr('data-url', data.parentUrl).attr('data-image', data.parentImage).css('background-image', '');
                } else {
                    if (!isMobile.any()) {
                        $('.search-panel-body').css('top', '150px');
                    }
                }
                if (!isFolder) {
                    $('.search-logo').attr('data-categoryid', category).attr('data-isfolder', 0);
                    var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');
                    for (key in items) {
                        var item = items[key];
                        $container.append('<div class="sisea-result slide offset">\
													<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.image + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + '<p>' + item.titleWithLocation + '</p>\
													</a>' + (item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '') + '</div>');
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                    };
                } else {
                    $('.search-logo').attr('data-categoryid', category).attr('data-isfolder', 1);
                    var $container = searchResults.append('<ul class="category-list"></ul>').find('ul');
                    for (key in items) {
                        var item = items[key];
                        $container.append('<li class="' + item.catClass + '">\
											<a data-id="' + item.itemId + '" data-search-id="' + item.searchId + '" title="' + item.title + '">\
												<span>\
													<i style="background-image: url(' + (categoryId == 1220 ? item.icon : item.image) + ');"></i>\
												</span>\
												<p>' + item.title + '</p>\
											</a>\
										</li>');
                    }
                }
                searchResults.fadeIn('500');
            }
        });
    }
}

function OnLoadObjects(category, offset) {
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    var searchResults = $('.site-search-results .search-content .category-list');
    var url = 'https://thai360.info/api/loading-objects';
    var currency = $('#currency-select .select-active').attr('data-currency');
    var districts = getDistrictArray();
    var rentType = parseInt($('.radio-btns .select-list input:checked').val());
    var categoryId = $('#type-select .select-active').attr('data-categoryId');
    var type = $('.radio-btns input[name="type"]:checked').val();
    var isFilter = parseInt($('.search-logo').attr('data-isfilter'));
    var exclude = '';
    priceMin = $('#priceMin').text();
    priceMax = $('#priceMax').text();
		if (category == 35) {
			if (isFilter) {
				url = 'https://thai360.info/api/get-real-estate-objects';
				offset = 0;
				exclude = GetExludeObjects(false);
			} else {
				url = 'https://thai360.info/api/get-all-real-estates';
			}
		}
		if (category == 0) {
			url = 'https://thai360.info/api/get-top-objects';
			offset = 10;
			exclude = GetExludeObjects(false);
		}
    $.ajax({
        url: url,
        data: {
            category: category,
            lang: cultureKey,
            offset: offset,
            categoryId: categoryId,
            type: type,
            rentType: rentType,
            currency: currency,
            bedroomsMin: $("#slider-beds").slider("values", 0),
            bedroomsMax: $("#slider-beds").slider("values", 1),
            districts: districts,
            exclude: exclude,
			rand: getRandom()
        },
        beforeSend: function() {
            searchResults.append(smallPreloader);
        },
        success: function(data) {
            var items = data.items;
            var count = 0;
            var priceNowMin = $("#slider-range").slider("values", 0);
            var priceNowMax = $("#slider-range").slider("values", 1);
            if (category == 35) {
                if (isFilter) {
                    if (type == 1) {
                        for (key in items) {
                            var item = items[key];
                            if (rentType == 1 && categoryId != '327-land') {
                                if (parseInt(item.priceRentDaily) >= priceNowMin && parseInt(item.priceRentDaily) <= priceNowMax && parseInt(item.priceRentDaily) != 0 && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                                    searchResults.append('<div class="sisea-result estate offset">\
																	<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
																	<div class="object-description">\
																	<p class="card-object-location"><i></i>' + item.location + '</p>\
																	<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentDaily) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceRentDaily) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>') + '</div>\
																	<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
																	<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
											</div>');
                                    count++;
                                };
                            } else {
                                if (parseInt(item.priceRentMonthly) >= priceNowMin && parseInt(item.priceRentMonthly) <= priceNowMax && parseInt(item.priceRentMonthly) != 0 && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                                    searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                                    count++;
                                };
                            }
                            $.cookie('object_' + item.itemId, true, {
                                expires: 300,
                                path: '/'
                            });
                        }
                    } else {
                        for (key in items) {
                            var item = items[key];
                            if (parseInt(item.priceSale) >= priceNowMin && parseInt(item.priceSale) <= priceNowMax && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                                searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                                count++;
                                $.cookie('object_' + item.itemId, true, {
                                    expires: 300,
                                    path: '/'
                                });
                            };
                        }
                    }
                } else {
                    for (key in items) {
                        var item = items[key];
                        searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div><p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.sold == 'true' ? '<p class="object-price">Sold<p>' : (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
									</div>');
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                    };
                }
            } else {
                if (offset >= 10) {
                    for (key in items) {
                        var item = items[key];
                        if (item.type == 1 || item.type == 2 || item.type == 3) {
                            searchResults.append('<div class="sisea-result estate search offset">\
											<a href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.title + '" style="background-image: url(' + item.squareImg + '?' + randomHash + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div> <p>' + item.title + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
											<div class="object-description">\
											<p class="card-object-location"><i></i>' + item.location + '</p>\
											<p class="card-object-category"><i></i>' + item.category + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + (item.sold == 'true' ? '<p class="object-price">Sold</p>' : (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
									</div>');
                        } else {
                            searchResults.append('<div class="sisea-result slide offset">\
											<a ' + (item.objectLink.length < 10 ? 'href="#!p=' + item.itemId + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '"' : 'href="' + item.objectLink + '" target="_blank"') + ' title="' + item.title + '" style="background-image: url(' + item.image + ');" class="object" data-id="' + item.itemId + '">' + ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + (item.type == 3 || item.type == 2 || item.type == 1 ? '<p>' + item.titleWithCategory + '</p>' : (category == 0 ? '<p class="big-title">' + item.titleWithLocation + '</p>' : '<p>' + item.titleWithLocation + '</p>')) + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>' + (item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '') + '</div>');
                        }
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                    };
                }
            }
			if (items.length >= 1) {
                isLoaded = true;
            } else {
                isLoaded = false;
            }
            searchResults.find('svg').remove();
        }
    });
}

function OnAjaxSearch(title, OnLoaded, count, exclude) {
    $('.parent-category').remove();
    var searchResults = $('.site-search-results .search-content');
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    var categoryId = $('.search-logo').attr('data-category');
    var isFolder = parseInt($('.search-logo').attr('data-isfolder'));
    var currency = $('#currency-select .select-active').attr('data-currency');
    $.ajax({
        url: 'https://thai360.info/api/ajax-search',
        data: {
            lang: cultureKey,
            title: title,
			offset: count,
			exclude: exclude,
            categoryId: categoryId,
            currency: currency,
			rand: getRandom()

        },
        beforeSend: function() {
			if(OnLoaded){
				searchResults.append(smallPreloader);
			}else{
				searchResults.html(preloader);
			}
        },
        success: function(data) {
			if(!OnLoaded){
				searchResults.hide().empty();
			}
			$('#smallLoader, #loader').remove();
			var items = data;
            //$('#search').attr('placeholder', translation.Search(cultureKey));
            $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
            var $container = searchResults.find('.category-list');
			if(!OnLoaded){
				$container = searchResults.append('<div class="category-list"></div>').find('.category-list');
			}
            for (key in items) {
                var item = items[key];
				if(item.template == 4){
					var categorySvgBorder = '<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:rgba(255,222,0, 1);" xml:space="preserve"><polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "></polyline><g><path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"></path></g><g><path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"></path><path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8zM2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"></path></g>&nbsp;</svg>';
					$container.append('<div class="sisea-result slide offset ' + item.catClass + '">\
													<a data-id="' + item.id + '" data-search-id="' + item.id + '-' + item.alias + '" title="' + item.pagetitle + '" class="search-category" style="background-image: url(' + item.image + '?' + randomHash + ');">\
													<p><i class="category-icon" style="background-image: url(/' + (item.icon) + ');"></i>' + categorySvgBorder + item.longtitle + '</p></a>\
									</div>');
				}
				else{
					if (categoryId == '35-real-estate') {
						$container.append('<div class="sisea-result estate offset">\
																<a href="#!p=' + item.id + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.pagetitle  + '" style="background-image: url(' + item.square_img + '?' + randomHash + ');" class="object" data-id="' + item.id + '">' + ($.cookie('object_' + item.id) ? (item.typeRealEstate == 1 ? '<div class="rent"></div>' : '') + (item.typeRealEstate == 2 ? '<div class="sale"></div>' : '') + (item.typeRealEstate == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.id + '</div> <p>' + item.pagetitle + '</p></a>\
																<div class="object-description">\
																<p class="card-object-location"><i></i>' + item.districtTitle + '</p>\
																<p class="card-object-category"><i></i>' + item.categoryTitle + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + '<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>' + (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + (item.sold == 'true' ? '<p class="object-price">Sold</p>' : (item.typeRealEstate == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.typeRealEstate == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.typeRealEstate == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
																<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>' + translation.Contact(cultureKey) + '</span></div>\
																<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>' + translation.Favorites(cultureKey) + '</span></div>\
										</div>');
					} else {
						if (item.typeRealEstate == 1 || item.typeRealEstate == 2 || item.typeRealEstate == 3) {
							$container.append('<div class="sisea-result estate search offset">\
																<a href="#!p=' + item.id + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.pagetitle + '" style="background-image: url(' + item.square_img + '?' + randomHash + ');" class="object" data-id="' + item.id + '">' + ($.cookie('object_' + item.id) ? (item.typeRealEstate == 1 ? '<div class="rent"></div>' : '') + (item.typeRealEstate == 2 ? '<div class="sale"></div>' : '') + (item.typeRealEstate == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.id + '</div> <p>' + item.pagetitle + '</p>' + (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>\
																<div class="object-description">\
																<p class="card-object-location"><i></i>' + item.districtTitle + '</p>\
																<p class="card-object-category"><i></i>' + item.categoryTitle + '</p>' + (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') + '<p class="card-area">' + item.area + ' <span>sq. m.</span></p>' + (item.sold == 'true' ? '<p class="object-price">Sold</p>' : (item.typeRealEstate == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '<text> monthly+</text></p>' : (item.typeRealEstate == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : (item.typeRealEstate == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + '<b>' + getCurrencySymbol() + '</b>' + '</p>' : '')))) + '</div>\
										</div>');
						} else {
							$container.append('<div class="sisea-result slide offset">\
														<a href="#!p=' + item.id + '-' + item.alias + '&s=pano' + item.panoId + '&lang=' + cultureKey + '" title="' + item.pagetitle + '" style="background-image: url(' + item.img + '?' + randomHash + ');" class="object" data-id="' + item.id + '">' + ($.cookie('object_' + item.id) ? '' : '<div class="new"></div>') + '<p><span class="title-district">'+ item.districtTitle +'</span> ' + item.pagetitle + (item.longtitletwo.length > 3 ? '<br>' + item.longtitletwo : '') + '</p></a>\
									</div>');
						}
					}
				}

            };
			if (data.length >= 10) {
                    isLoaded = true;
            } else {
                    isLoaded = false;
            }
            searchResults.fadeIn('500');
        }
    });
}

function getPano(itemId) {
    panoIsLoad = false;
	clearTimeout(videoTimeOut);
    $('#day-night-btn div').remove().hide();
    $('#video-object-btn div, #about-object-btn div').remove();
    $('.sample-info').remove();
    var panoContainer = $('#tourDIV');
    var videoContainer = $('.video-modal-content');
    var panoLocation = $('#panoLocation');
	var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/get-object',
        data: {
            cultureKey: cultureKey,
            itemId: itemId,
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {},
        success: function(data) {
            panoUrl = data.panoUrl + 'indexdata/index_messages_en.xml';
            panoVrXml = data.panoUrl + 'indexdata/index_vr.xml';
			panoXml = data.panoUrl + 'indexdata/index_' + cultureKey + '.xml';
            panoSwf = data.panoUrl + 'indexdata/index.swf';
            crossPanoUrl = data.panoUrl;
            mapTitle = data.longtitle;
            var objectId = data.id;
            var player = $('.audio-player .play-list');
            var published = data.published;
            var isRealEstate = data.isRealEstate;
            var audioLink = data.audioLink;
            var audioFiles = data.audioFiles.split(',');
            var sphereId = getUrlVars()["s"];
			var mainPanoLink = parseInt(data.mainPanoLink) == 0 ? data.mainPanoLink : data.mainPanoLink + '&lang=' + cultureKey;
			var placeId = data.placeId;
			$('#search-panel').attr('data-place-id', placeId);
            if (audioLink == musicLink) {} else {
                musicLink = audioLink;
                player.empty();
                audioFiles.forEach(function(item) {
                    player.append('<li data-link="' + item + '"></li>');
                });
                $('#stop-play').addClass('first-click');
                if ($('#stop-play').hasClass('active')) {
                    $('#stop-play').click();
                    setTimeout(function() {
                        $('#stop-play').click();
                    }, 2000);
                }
            }
            if (published == 0) {
                window.location.hash = '#!p=26-phuket&s=pano12&lang=' + cultureKey;
            } else {
                if (firstLoad || $.cookie('video_' + data.id) || parseInt(data.video) == 0) {

                }
				else{
					videoTimeOut = setTimeout(function() {
                        $('#video-object-btn').append('<div class="animation-border"></div>\
										<div class="animation-background"></div>\
										<div class="btn-animation"></div>');
                    }, 10000);
				}
                if ((!firstLoad) && (!$.cookie('object_info'))) {
                    $('#about-object-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
                }
                if (!$.cookie('day_night_' + itemId)) {
                    $('#day-night-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
                }
                if (!$.cookie('object_' + itemId)) {
                    $.cookie('object_' + itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                }
                $('.search-logo, .logo').attr('href', data.parentPoint + '&lang=' + cultureKey);
                $("meta[name='description']").attr('content', data.description);
                $("meta[name='keywords']").attr('content', data.keywords);
                $("meta[property='og:description']").attr('content', data.description);
                $("meta[property='og:image']").attr('content', data.image);
                $("link[rel='image_src']").attr('href', data.image);
                $("link[rel='alternate']").attr('hreflang', cultureKey).attr('href', window.location.href);
                $("meta[property='og:image:secure_url']").attr('content', data.image);
                $("meta[name='twitter:image']").attr('content', data.image);
                $("meta[property='og:url']").attr('content', window.location.href);
                $('#home-btn').attr('data-link', mainPanoLink);
                if (isVRModeRequested()) {
                    accessWebVr();
                } else {
					if(firstLoad){
						accessStdVr();
					}
					else{
						OnLoadPano(panoXml, sphereId);
						//$('body').css('-webkit-filter', 'grayscale(0%)');
					}
                }
                if ((data.video != null || data.video != '' || data.video != undefined) && data.video) {
                    $('#video-object-btn').attr('data-code', data.video);
                } else {
                    $('#video-object-btn').attr('data-code', 0);
                }
                if (data.template == 3) {
                    $('title').text(data.longtitle + ' - ' + siteName);
                    $("meta[name='title']").attr('content', data.longtitle + ' - ' + siteName);
                    $("meta[property='og:title']").attr('content', data.longtitle + ' - ' + siteName);
                    panoLocation.empty().html(translation.Thailand(cultureKey) + '<br><span>' + data.title + '</span>');
                } else {
                    $('title').text(data.seoTitle);
                    $("meta[name='title']").attr('content', data.seoTitle);
                    $("meta[property='og:title']").attr('content', data.seoTitle);
                    panoLocation.empty().html(translation.Thailand(cultureKey) + '<br><span>' + data.location + '<br>' + data.longtitle + (data.isRealEstate == true ? ' ID: ' + objectId : '') + '</span>');
                }
                if (data.isSample) {
                    $('#tourDIV').append('<div class="sample-info">' + translation.Sample_Tour(cultureKey) + '</div>');
                }
            }
        }
    }).done(function() {
        panoIsLoad = true;
		if(!firstLoad){
			ga('create', 'UA-90941148-2', 'auto', 'myAnalytics');
			ga('myAnalytics.send', 'pageview', location.pathname + location.search + location.hash);
			ga('myAnalytics.remove');
			if(parseInt(itemId) == 26 && isMobile.AndroidApp()){
				setTimeout(function(){var krpano = document.getElementById("krpanoSWFObject");krpano.set('hotspot[spotpoint1590].visible', false);krpano.set('hotspot[spotpoint1593].visible', false);krpano.set('hotspot[spotpoint1594].visible', false);}, 500);
			}
		}
		else{
			firstLoad = false;
		}
		fbq('track', 'PageView');
		fbq('track','ViewContent',{value:3.50, currency:'USD', content_name: $('title').text()});
    });
}

function getPanoByCategoryId(itemId) {
	clearTimeout(videoTimeOut);
    panoIsLoad = false;
    $('#day-night-btn div').remove().hide();
    $('#video-object-btn div, #about-object-btn div').remove();
    var krpano = document.getElementById("krpanoSWFObject");
    var cultureKey = getUrlVars()["lang"];
    var panoContainer = $('#tourDIV');
    var videoContainer = $('.video-modal-content');
    var panoLocation = $('#panoLocation');
    var categoryId = getUrlVars()["c"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/get-object-by-category',
        data: {
            itemId: itemId,
            lang: cultureKey,
            categoryId: categoryId,
			rand: getRandom()
        },
        beforeSend: function() {},
        success: function(data) {
            var itemObject = data.item;
            var isFolder = data.isfolder;
            for (key in itemObject) {
                var item = itemObject[key];
                var player = $('.audio-player .play-list');
                var audioLink = item.audioLink;
                var audioFiles = item.audioFiles.split(',');
                if (audioLink == musicLink) {} else {
                    musicLink = audioLink;
                    player.empty();
                    audioFiles.forEach(function(item) {
                        player.append('<li data-link="' + item + '"></li>');
                    });
                    $('#stop-play').addClass('first-click');
                    if ($('#stop-play').hasClass('active')) {
                        $('#stop-play').click();
                        setTimeout(function() {
                            $('#stop-play').click();
                        }, 2000);
                    }
                }
                panoUrl = item.panoUrl + 'indexdata/index_messages_en.xml';
                panoVrXml = item.panoUrl + 'indexdata/index_vr.xml';
				panoXml = item.panoUrl + 'indexdata/index_' + cultureKey + '.xml';
                panoSwf = item.panoUrl + 'indexdata/index.swf';
                crossPanoUrl = item.panoUrl;
                mapTitle = item.longtitle;
				var mainPanoLink = parseInt(item.mainPanoLink) == 0 ? item.mainPanoLink : item.mainPanoLink + '&lang=' + cultureKey;
                if (firstLoad && $.cookie('video_' + item.id) && (item.video == null || item.video == '' || item.video == undefined || parseInt(item.video) == 0)){}else{
                    videoTimeOut = setTimeout(function() {
                        $('#video-object-btn').append('<div class="animation-border"></div>\
										<div class="animation-background"></div>\
										<div class="btn-animation"></div>');
                    }, 10000);
                }
                if ((!firstLoad) && (!$.cookie('object_info'))) {
                    $('#about-object-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
                }
                if (!$.cookie('day_night_' + itemId)) {
                    $('#day-night-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
                }
                if (!$.cookie('object_' + itemId)) {
                    $.cookie('object_' + itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                }
                $('.search-logo, .logo').attr('href', item.parentPoint + '&lang=' + cultureKey);
                $('title').text(data.title + ' - ' + siteName);
                $("meta[name='title']").attr('content', data.title + ' - ' + siteName);
                $("meta[name='description']").attr('content', data.description);
                $("meta[name='keywords']").attr('content', data.keywords);
                $("meta[property='og:title']").attr('content', data.title + ' - ' + siteName);
                $("meta[property='og:description']").attr('content', data.description);
                $("meta[property='og:image']").attr('content', data.image);
                $("link[rel='image_src']").attr('href', data.image);
                $("link[rel='alternate']").attr('hreflang', cultureKey).attr('href', window.location.href);
                $("meta[property='og:image:secure_url']").attr('content', data.image);
                $("meta[name='twitter:image']").attr('content', data.image);
                $("meta[property='og:url']").attr('content', window.location.href);
				$('#home-btn').attr('data-link', mainPanoLink);
                if (isVRModeRequested()) {
                    accessWebVr();
                } else {
                    accessStdVr();
                }
                if ((item.video != null || item.video != '' || item.video != undefined) && item.video) {
                    $('#video-object-btn').attr('data-code', item.video);
                } else {
                    $('#video-object-btn').attr('data-code', 0);
                }
                if (data.template == 3) {
                    panoLocation.empty().html(translation.Thailand(cultureKey) + '<br><span>' + item.title + '</span>');
                } else {
                    panoLocation.empty().html(translation.Thailand(cultureKey) + '<br><span>' + item.location + '<br>' + item.longtitle + (item.isRealEstate == true ? ' ID: ' + item.id : '') + '</span>');
                }
            }
            OnCategorySearch(categoryId, itemId, isFolder, '');
        }
    }).done(function() {
        panoIsLoad = true;
		if(!firstLoad){
			ga('create', 'UA-90941148-2', 'auto', 'myAnalytics');
			ga('myAnalytics.send', 'pageview', location.pathname + location.search + location.hash);
			ga('myAnalytics.remove');
		}
		else{
			firstLoad = false;
		}
    });
}

function getAboutInfo(isContacts) {
    $('#info-btn').removeClass('open');
    OnShowHideControls(true, false);
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $('.about-modal-window').animate({
        left: 0
    }, 500);
    $('.about-modal-window').queue(function() {
        $('.close-modal-btn').fadeIn(500);
        $('.about-modal-window').dequeue();
    });
    $.ajax({
        url: 'https://thai360.info/api/get-about-info',
        data: {
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {
            $('.about-content').append(preloader);
        },
        success: function(data) {
            var pages = data.pages;
            var news = data.news;
            var counter = 1;
            $('.about-content svg').remove();
            if (!isContacts) {
                $('.about-block.block-2 h3').attr('data-count', data.newsCount)
                for (key in pages) {
                    var page = pages[key];
                    if (page.alias == 'project-news-i-updates') {
                        $('.about-block.block-' + counter + ' h3').text(page.title);
                        $('.block-2 h3').append('<span class="prev-new" data-offset="-3"></span><span class="next-new" data-offset="3"></span>');
                        for (key in news) {
                            var itemNew = news[key];
                            $('.block-2 .about-content-body').append('<div class="item-new" data-id="' + itemNew.itemId + '">\
									<h4>' + itemNew.title + '</h4>\
									<div class="new-image" style="background-image: url(' + itemNew.imageUrl + ');"></div>\
									<p>' + itemNew.introtext + '</p>\
								</div>');
                        }
                    } else {
                        $('.about-block.block-' + counter + ' h3').text(page.title);
                        $('.about-block.block-' + counter + ' .about-content-body').html(page.content);
                        if (counter == 3) {
                            $('.block-3 .about-content-body').append('<div id="ourLocation"><iframe class="location-iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2stest.thai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" frameborder="0" style="border:0"></iframe><div>');
                        }
                    }
                    counter++;
                };
                $('.about-content').append(data.privacyPolicy);
                $('.about-content').fadeIn('500');
            } else {
                for (key in pages) {
                    var page = pages[key];
                    if (page.alias == 'we-are-located-at') {
                        $('#about-body').append('<div class="our-location">\
								<h3>' + page.title + '</h3>\
								<div class="about-content-body">' + page.content + '</div>\
								<div id="ourLocation"><iframe class="location-iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2stest.thai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" frameborder="0" style="border:0"></iframe><div>\
							</div>');
                    }
                }
            }
        }
    }).done(function() {
        panoIsLoad = false;
        loadMap = true;
    });
}

function OnLoadNews(offset) {
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    $.ajax({
        url: 'https://thai360.info/api/loading-news',
        data: {
            lang: cultureKey,
            offset: offset,
			rand: getRandom()
        },
        beforeSend: function() {
            $('.about-content').append(preloader);
        },
        success: function(data) {
            $('.about-block.block-2 .about-content-body').empty();
            $('.about-content svg').remove();
            for (key in data) {
                var itemNew = data[key];
                $('.block-2 .about-content-body').append('<div class="item-new" data-id="' + itemNew.itemId + '">\
							<h4>' + itemNew.title + '</h4>\
							<div class="new-image" style="background-image: url(' + itemNew.imageUrl + ');"></div>\
							<p>' + itemNew.introtext + '</p>\
							</div>');
            }
        }
    }).done(function() {
        panoIsLoad = false;
    });
}

$(document).on('click', '#about-object-btn', function(e){e.stopPropagation();getAboutObjectInfo(false);clearTimeout(timeout);});
function getAboutObjectInfo(showFeedBack){
	if (!$.cookie('object_info')) {
		$.cookie('object_info', true, {
				expires: 300,
				path: '/'
		});
		$('#about-object-btn div').remove();
    }
    if($('#search-panel').hasClass('open')){
		OnCloseSearchPanel(false);
	}
	if(showFeedBack){
		ga('send', 'event', 'Button', 'Click', 'FeedBack Button Click');
	}
	else{
		ga('send', 'event', 'Button', 'Click', 'Open Object Info');
	}
	$('.object-location').show();
    OnShowHideControls(true, false);
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    var aboutContent = $('.about-object-content');
    var panoId = getUrlVars()["p"];
    if (typeof panoId === 'undefined' || panoId === null) {
        panoId = 1;
    } else {
        panoId = getUrlVars()["p"].split('-')[0];
    }
    $('.about-object-modal').queue(function() {
		$('.about-object-modal').animate({right: 0}, 500);
		$.ajax({
        url: 'https://thai360.info/api/get-about-object-info',
        data: {
            itemId: panoId,
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {
            $('#about-object-body').append(preloader);
        },
        success: function(data) {
			$('#about-object-body #loader').remove();
            var album = data.gallery;
            var news = data.news;
			var placeId = data.placeId;
            var counter = 4;
			if(data.type == 2){
				$('#booking-block h3').text(translation.Get_Special_Offer(cultureKey));
			}
			else if(data.type == 1){
				$('#booking-block h3').text(translation.Get_Personal_Offer(cultureKey));
			}
			else{
				$('#booking-block h3').text(translation.Fill_Out_Form_And_Get_Special_Offer(cultureKey));
			}
            $('#aboutObjectTitle').text(data.title);
			if(!showFeedBack){
				var bodyTitle = data.bodytitle;
				if(bodyTitle){
					$('.about-object-content .object-content').append('<h2>' + bodyTitle + '</h2>');
				}
			if(data.rent_table){
				var lowSeason = data.low_season;
				var highSeason = data.high_season;
				var peakSeason = data.peak_season;
				var longTermMin = parseInt(data.long_term_min);
				$('.about-object-content .object-content').append('<table class="rent-table"><tbody>\
					<tr>\
						<td></td>\
						<td>' + translation.Daily_Rent_Table(cultureKey) + '</td>\
						<td>' + translation.Weekly_Rent_Table(cultureKey) + '</td>\
						<td>' + translation.Monthly_Rent_Table(cultureKey) + '</td>\
					</tr>\
					<tr>\
						<td>' + translation.Low_Season(cultureKey) + '<br /><small>' + getAllMonth(lowSeason, cultureKey).replace(', ', ' - ') + '</small></td>\
						<td>' + (data.low_season_daily ? data.low_season_daily + ' ฿' : '') + '</td>\
						<td>' + (data.low_season_weekly ? data.low_season_weekly + ' ฿' : '') + '</td>\
						<td>' + (data.low_season_monthly ? data.low_season_monthly + ' ฿' : '') + '</td>\
					</tr>\
					<tr>\
						<td>' + translation.High_Season(cultureKey) + '<br /><small>' + getAllMonth(highSeason, cultureKey) + '</small></td>\
						<td>' + (data.high_season_daily ? data.high_season_daily + ' ฿' : '') + '</td>\
						<td>' + (data.high_season_weekly ? data.high_season_weekly + ' ฿' : '') + '</td>\
						<td>' + (data.high_season_monthly ? data.high_season_monthly + ' ฿' : '') + '</td>\
					</tr>\
					<tr>\
						<td>' + translation.Peak_Season(cultureKey) + '<br /><small>' + getAllMonth(peakSeason, cultureKey) + '</small></td>\
						<td>' + (data.peak_season_daily ? data.peak_season_daily + ' ฿' : '') + '</td>\
						<td>' + (data.peak_season_weekly ? data.peak_season_weekly + ' ฿' : '') + '</td>\
						<td>' + (data.peak_season_monthly ? data.peak_season_monthly + ' ฿' : '') + '</td>\
					</tr>\
					<tr>\
						<td>' + translation.Long_Term(cultureKey) + '<br><small>' + translation.Get_Min_Rent(longTermMin, cultureKey) + '</small></td>\
						<td style="border: 1px solid transparent!important;border-bottom: 1px solid rgba(221, 221, 221, 0.5)!important;"></td>\
						<td style="border: 1px solid transparent!important;border-bottom: 1px solid rgba(221, 221, 221, 0.5)!important;"></td>\
						<td>' + (data.long_term ? data.long_term + ' ฿' : '') + '</td>\
					</tr>\
					</tbody></table>');
			}
            $('.object-content').append(data.content).find('table').wrap('<div class="table-responsive"></div>');
            $('.about-object-content svg').remove();
            if (data.video == null || data.video == '' || data.video == undefined || parseInt(data.video) == 0) {} else {
                $('.owl-main').append('<div class="gallery-item video-item" style="display: none;"><iframe src="https://www.youtube.com/embed/' + data.video + '" frameborder="0" style="border:0;"></iframe></div>');
                $('.owl-navigation-body .owl-stage').append('<div class="owl-item"><div class="gallery-item" style="background-image: url(https://img.youtube.com/vi/' + data.video + '/hqdefault.jpg);"></div></div>');
            }
            $('.owl-main').append('<a class="fancybox" data-fancybox="gallery" href="' + data.fullImage + '" title="' + data.title + '"><div class="gallery-item" style="background-image: url(' + data.image + ');display: none;"></div></a>');
            $('.owl-navigation-body .owl-stage').append('<div class="owl-item"><div class="gallery-item"  style="background-image: url(' + data.image + ');"></div></div>');
            if (album) {
                for (key in album) {
                    var galleryItem = album[key];
                    $('.owl-main').append('<a class="fancybox" data-fancybox="gallery" href="' + galleryItem.url + '" title="' + data.title + '"><div class="gallery-item" style="background-image: url(' + galleryItem.thumbUrl + ');display: none;"></div></a>');
                    $('.owl-navigation-body .owl-stage').append('<div class="owl-item"><div class="gallery-item" style="background-image: url(' + galleryItem.thumbUrl + ');"></div></div>');
                };
				$('.owl-navigation').append('<div class="owl-prev" id="owl-prev"></div><div class="owl-next" id="owl-next"></div>');
            }
            if (news.length >= 1 && !data.isCity) {
                if (data.isFeedBack) {
                    $('#gallery-block, #news-block, #booking-block').addClass('col-sm-4');
					// if(data.special_offer){
						// $('<div class="special-offer">' + data.special_offer + '</div>').insertAfter('#booking-block h3');
					// }
                    $('#booking-block').show();
                } else {
                    $('#gallery-block, #news-block').addClass('col-sm-6');
                }
                $('#news-block').empty().append('<h3>' + translation.Object_News_Title(cultureKey) + '</h3>');
                for (key in news) {
                    var itemNew = news[key];
                    $('#news-block').append('<div class="item-new" data-id="' + itemNew.itemId + '">\
								<h4>' + itemNew.title + '</h4>\
								<img src="' + itemNew.imageUrl + '" />\
								<p>' + itemNew.introtext + '</p>\
							</div>');
                }
            } else {
                if (data.isFeedBack) {
                    $('#gallery-block, #booking-block').addClass('col-sm-6');
					// if(data.special_offer){
						// $('<div class="special-offer">' + data.special_offer + '</div>').insertAfter('#booking-block h3');
					// }
                    $('#booking-block').show();
                } else {
                    $('#gallery-block').addClass('col-sm-6 col-sm-offset-3');
                }
                $('#news-block').addClass('hidden');
            }
			}
			else{
				$('#booking-block').addClass('col-sm-6 col-sm-offset-3');
				// if(data.special_offer){
					// $('<div class="special-offer">' + data.special_offer + '</div>').insertAfter('#booking-block h3');
				// }
                $('#booking-block').show();
			}
			$('.about-object-close-btn').show();
			if(!showFeedBack){
				if(placeId || parseInt($('#search-panel').attr('data-latitude')) != 0){
					setTimeout(function(){
						if(placeId){
							initMapMarker(placeId, 'object-location');
						}
						else{
							initMap('object-location');
						}
					}, 1000);
				}
				else{
					$('.object-location').hide();
				}
			}
			else{
				$('.object-location').hide();
			}
        }
    }).done(function() {
		aboutContent.fadeIn(500);
        panoIsLoad = false;
        loadGallery = true;
    });
    $('.about-object-modal').dequeue();
    });
}

function getInnerContent() {
    $this = $(this);
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    var innerContainer = $('.inner-content');
    itemId = $this.attr('data-id');
    $('.inner-content-close-btn, .inner-content').fadeIn(500);
    $('.inner-modal').animate({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    }, 500);
    $.ajax({
        url: 'https://thai360.info/api/get-default-object',
        data: {
            itemId: itemId,
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {},
        success: function(data) {
            if ($this.hasClass('item-new')) {
                if (data.imageUrl) {
                    innerContainer.append('<h2>' + data.title + '</h2><img src="' + data.imageUrl + '" class="main-new-img"/><div class="main-new-body">' + data.content + '</div>');
                } else {
                    innerContainer.append('<h2>' + data.title + '</h2><div class="main-new-body">' + data.content + '</div>');
                }
            } else {
                innerContainer.append('<h2>' + data.title + '</h2><div>' + data.content + '</div>');
            }
        }
    }).done(function() {
        panoIsLoad = false;
    });
}

function getHelpInfo(dataId) {
    var cultureKey = getUrlVars()["lang"];
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
    OnShowHideControls(true, false);
    var helpContainer = $('.help-content');
    $('.help-content-close-btn, .help-content').fadeIn(500);
    $('.help-modal').animate({
        left: 0
    }, 500);
    $.ajax({
        url: 'https://thai360.info/api/get-default-object',
        data: {
            itemId: dataId,
            lang: cultureKey,
			rand: getRandom()
        },
        beforeSend: function() {
            helpContainer.append(preloader);
        },
        success: function(data) {
            $('.help-content svg').remove();
            helpContainer.append('<h2>' + data.title + '</h2><div>' + data.content + '</div>');
        }
    }).done(function() {
        panoIsLoad = false;
    });
}

function OnCloseModal() {
    $('.close-modal-btn, .about-content').hide();
    $('#about-body .our-location, #about-body .privacy-policy').remove();
    $('.about-content .about-content-body').empty();
    $('.about-modal-window').animate({
        left: '100%'
    }, 500);
    OnShowHideControls(false, false);
}

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

function OnCloseHelpModal() {
    $('.help-content').empty();
    $('.help-content-close-btn, .help-content').hide();
    $('.help-modal').animate({
        left: '100%'
    }, 500);
    OnShowHideControls(false, false);
}

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
$(document).ajaxComplete(function() {
    if (panoIsLoad) {
        xmlParser(panoVrXml);
        panoIsLoad = false;
    }
    if (loadGallery) {
        setTimeout(function(){myCarouselInit();loadGallery = false;}, 100)
    }
    if ($('#mobile-map-search-btn').hasClass('active')) {
        initMap();
    }
    jQuery('.site-search-results').not('.scroll-wrapper').on("scroll", function() {
        var category = $('.search-logo').attr('data-id');
        var isFolder = parseInt($('.search-logo').attr('data-isfolder'));
        var scrollBodyHeight = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-element_outer').height());
        var scrollBarHeight = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-bar').height());
        var scrollBarPosition = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-bar').css('top'));
		var exclude = GetExludeObjects(true);
		var count = getObjectsCount();
		var title = $('#search').val();
        if ((scrollBarHeight + scrollBarPosition) == scrollBodyHeight && isLoaded && scrollBodyHeight > 100) {
            isLoaded = false;
			if(title.length > 1){
				OnAjaxSearch(title, true, count, exclude);
			}
			else{
				OnLoadObjects(category, count);
			}
        }
    });
});

function xmlParser(xmlUrl) {
    $.ajax({
        type: "GET",
        url: xmlUrl,
        dataType: "xml",
        success: function(xml) {
            var xmlLatitude = $(xml).find("scene").attr('latitude');
            var xmlLongitude = $(xml).find("scene").attr('longitude');
			if(typeof xmlLatitude == 'undefined'){xmlLatitude = 0}
			if(typeof xmlLongitude == 'undefined'){xmlLongitude = 0}
            $('#search-panel').attr('data-latitude', xmlLatitude).attr('data-longitude', xmlLongitude);
        }
    }).done(function() {
        panoIsLoad = false;
    });
}
function getLanguage(){
  var lang = navigator.language;
  var output;
  var languages = 'en,ru,th,zh';
  if(languages.indexOf(lang) != -1){
	  output = lang;
  }
  else{
	output = 'en';
  }
  return lang.substr(0,2);
}
function OnDocumentReady() {
    $(".feed-back-form form").submit(function() {
        var elem = $(".feed-back-form form input, .feed-back-form form select");
        var foc;
        var error = false;
        elem.each(function(index) {
            if ($(this).hasClass('required')) {
                if (!this.value || this.value == this.defaultValue) {
                    $(this).addClass("error");
                    error = true;
                    foc = $(this).attr("id");
                } else {
                    $(this).removeClass("error");
                }
            }
        });
        var oldHref = window.location.href;
        if (error) {
            $('#' + foc).focus();
            return false;
        } else {
            if (elem.value == this.defaultValue) this.value = "";
            window.location.href = 'https://thai360.info/message-sent?redirect=' + oldHref;
        }
    });
    getPrices(priceSaleMin, priceSaleMax, getPricesByCurrency(100000));
    getBeds(0, 15);
    setInterval(function() {
        updateTime();
    }, 60000)
    setTimeout(function() {
        $('#category-search-btn').append('<div class="animation-border red"></div>\
											<div class="animation-background red"></div>\
											<div class="btn-animation red"></div>');
    }, 10000);
	var windowSearch = window.location.search;
    if (windowSearch.indexOf('?_escaped_fragment_=') != 0) {
        if (window.location.hash == '' || typeof window.location.hash == 'undefined' || window.location.hash == null) {
            window.location.hash = defaultPano + '&lang=' + getLanguage();
            contextKey = getLanguage();
        } else {
            var panoId = getUrlVars()["p"];
            var categoryId = getUrlVars()["c"];
            if (typeof panoId === 'undefined' || panoId === null) {
                panoId = 1;
            } else {
                panoId = getUrlVars()["p"].split('-')[0];
            }
            if (typeof categoryId === 'undefined' || categoryId === null) {
                getPano(panoId);
            } else {
                categoryId = getUrlVars()["c"].split('-')[0];
                getPanoByCategoryId(categoryId);
            }
        }
    } else {
        var urlNow = window.location.href;
        window.location.href = urlNow.replace('?_escaped_fragment_=', '#!');
    }
    contextKey = getUrlVars()["lang"];
    if (contextKey == '' || contextKey == 'undefined' || contextKey == null) {
        $('html').attr('lang', getLanguage());
        $('.' + getLanguage()).hide();
    } else {
        $('html').attr('lang', contextKey);
        $('.lang-links a').each(function() {
            var $this = $(this);
            if ($this.attr('data-culture') == contextKey) {
                $this.addClass('active');
                $('.language-active').text($this.text());
            }
        });
    }
    getTime();
    $('[data-fancybox]').fancybox({
        infobar: false
    });
    $(document).on('click', '.day-night-btn', function() {
        ga('send', 'event', 'Button', 'Click', 'Day Night');
        var panoWindow = document.getElementById('krpanoSWFObject');
        var dataId = getUrlVars()["p"].split('-')[0];
        if (!$.cookie('day_night_' + dataId)) {
            setCookie('day_night_' + dataId, true, {
                path: '/',
                expires: 3600
            });
            $('#day-night-btn').empty();
        }
        panoWindow.call('SwitchPano();');
    });
    $(document).on('click', '#fullScreen-btn', fullScreen);
    $(document).on('click', '#hotspots-btn', hotspotsHideShow);
    $(document).on('click', '#giroscope-btn', giroscopeOnOff);
    $(document).on('click', '#terms-of-use, #privacy-policy, .item-new', getInnerContent);
    $(document).on('click', '#sale-input', function(event) {
        event.stopPropagation();
        $('.radio-btns .select-list').hide();
        $('.priceFilter h4').text(translation.Price_Rate(getUrlVars()["lang"]));
        getPrices(getPricesByCurrency(priceSaleMin), getPricesByCurrency(priceSaleMax), getPricesByCurrency(100000));
        GetFilterMap();
    });
    $(document).on('click', '#daily-rent', function(event) {
        event.stopPropagation();
        $('.radio-btns .select-list').hide();
        $('.priceFilter h4').text(translation.Daily_Rate(getUrlVars()["lang"]));
        getPrices(getPricesByCurrency(priceRentDailyMin), getPricesByCurrency(priceRentDailyMax), getPricesByCurrency(100));
        GetFilterMap();
    });
    $(document).on('click', '#monthly-rent', function(event) {
        event.stopPropagation();
        $('.radio-btns .select-list').hide();
        $('.priceFilter h4').text(translation.Monthly_Rate(getUrlVars()["lang"]));
        getPrices(getPricesByCurrency(priceRentMonthlyMin), getPricesByCurrency(priceRentMonthlyMax), getPricesByCurrency(500));
        GetFilterMap();
    });
    $(document).on('click', '#currency-select .select-active', function() {
        if ($('#currency-select ul').hasClass('open')) {
            $('#currency-select ul').hide().removeClass('open');
        } else {
            $('#currency-select ul').show().addClass('open');
        }
    });
    $(document).on('click', '#currency-select li a', function() {
        var $this = $(this);
        $('#currency-select li').show();
        $('#currency-select .select-active').html($this.attr('data-currency')).attr('data-currency', $this.attr('data-currency'));
        $('.price-currency').text($this.attr('data-currency'));
        $this.parent('li').hide();
        $('#currency-select ul').hide().removeClass('open');
        if ($('#sale-input').hasClass('active')) {
            getPrices(getPricesByCurrency(parseInt(priceSaleMin)), getPricesByCurrency(parseInt(priceSaleMax)), getPricesByCurrency(100000))
        }
        if ($('.radio-btns .select label').hasClass('active') && $('#daily-rent input').prop('checked')) {
            getPrices(getPricesByCurrency(parseInt(priceRentDailyMin)), getPricesByCurrency(parseInt(priceRentDailyMax)), getPricesByCurrency(100))
        }
        if ($('.radio-btns .select label').hasClass('active') && $('#monthly-rent input').prop('checked')) {
            getPrices(getPricesByCurrency(parseInt(priceRentMonthlyMin)), getPricesByCurrency(parseInt(priceRentMonthlyMax)), getPricesByCurrency(500))
        }
    });
    $(document).on('click', '#type-select .select-active', function() {
        if ($('#type-select ul').hasClass('open')) {
            $('#type-select ul').hide().removeClass('open');
        } else {
            $('#type-select ul').show().addClass('open');
        }
    });
	$(document).on('click', '#property-feed-back', function(){
		if(!$(this).hasClass('sent')){
			sendMail(true);
		}
	})
    $(document).on('click', '#type-select li a', function() {
        var $this = $(this);
        $('#type-select li').show();
        $('#type-select .select-active').html($this.text()).attr('data-categoryId', $this.attr('data-categoryId'));
        $this.parent('li').hide();
        $('#type-select ul').hide().removeClass('open');
        if ($this.attr('data-categoryid') == '327-land') {
            $('.roomsFilter').hide();
            getBeds(0, 15);
        } else {
            $('.roomsFilter').show();
        }
        GetFilterMap();
    });
    $(document).on('click', '.contact-object-btn', function() {
        if (isMobile.any()) {
            OnCloseSearchPanel(false);
        }
        parent.LC_API.open_chat_window({
            source: 'minimized'
        });
    });
    $(document).on('click', '.show-filters', OnShowFilters);
    $(document).on('click', '.filter-search-btn', OnFilterSearch);
    $(document).on('click', '.roomsFilter label', function(e) {
        e.preventDefault();
        var $this = $(this);
        $('.roomsFilter input').each(function() {
            if (parseInt($this.find('input').val()) >= parseInt($(this).val())) {
                $(this).parent('label').addClass('active');
            } else {
                $(this).parent('label').removeClass('active');
            }
        });
        $('.roomsFilter input:checked').prop('checked', false);
        $this.find('input').prop('checked', true);
    });
    $(".roomsFilter label").mouseover(function() {
        var $this = $(this);
        $('.roomsFilter input').each(function() {
            if (parseInt($this.find('input').val()) >= parseInt($(this).val())) {
                $(this).parent('label').addClass('room-hover');
            } else {
                $(this).parent('label').addClass('room-no-hover');
            }
        });
        if (parseInt($this.find('input').val()) == 50) {
            $('.roomsFilter h5 i').text(8 + '+');
        } else {
            $('.roomsFilter h5 i').text($this.find('input').val());
        }
    }).mouseout(function() {
        var $this = $(this);
        $('.roomsFilter label').removeClass('room-hover').removeClass('room-no-hover');
        if (parseInt($('.roomsFilter input:checked').val()) == 50) {
            $('.roomsFilter h5 i').text(8 + '+');
        } else {
            $('.roomsFilter h5 i').text($('.roomsFilter input:checked').val());
        }
    });
    $(document).on('click', '.filters-body, .filters-body div, .filters-body span, .filters-body p, .filters-body label, .filters-body input', function() {
        $('.select-list').hide().removeClass('open');
    });
    $(document).on('click', '.filter-clear-btn', function(e) {
        e.preventDefault();
        var clearType = $('#type-select ul li:first-child a');
        getPrices(getPricesByCurrency(priceSaleMin), getPricesByCurrency(priceSaleMax), getPricesByCurrency(100000));
        $('#type-select .select-active').html(clearType.text()).attr('data-categoryid', clearType.attr('data-categoryid'));
        $('#type-select .select-list li').show();
        $('#type-select .select-list li:first-child').hide();
        $('.districts input').prop('checked', false);
        $('.priceFilter h4').text(translation.Price_Rate(getUrlVars()["lang"]));
        $("#priceMin").html(priceToString($("#slider-range").slider("values", 0)));
        $("#priceMax").html(priceToString($("#slider-range").slider("values", 1)));
        $('.roomsFilter label, .districts label').removeClass('active');
        $('.roomsFilter h5 i').text(0);
        $('#clearInput').prop('checked', true);
        getBeds(0, 15);
        $('.radio-btns .select label').removeClass('active');
        $('.radio-btns .select-list').hide();
        $('#sale-input').addClass('active');
        $('#sale-input input').prop('checked', true);
        $('.roomsFilter').show();
        $('.district-points li').hide();
    });
    $(document).on('click', '.districts p label input', function() {
        var $this = $(this);
        var districtId = $this.parents('p').attr('id');
        if ($this.parent('label').hasClass('active')) {
            $this.parent('label').removeClass('active');
        } else {
            $this.parent('label').addClass('active');
        }
        $('.district-points li').each(function() {
            var $this = $(this);
            var dataDistrictId = $this.attr('data-district');
            if (districtId == dataDistrictId) {
                $this.toggle();
            }
        });
    });
    $(document).on('click', '.radio-btns p label', function() {
        var $this = $(this);
        $('.radio-btns p label').removeClass('active');
        $this.addClass('active');
    });
    $(document).on('click', '#rent-input', function() {
        $('.radio-btns .select-list').show();
    });
    if (/(iphone|ipod|ipad|android|iemobile|webos|fennec|blackberry|kindle|series60|playbook|opera\smini|opera\smobi|opera\stablet|symbianos|palmsource|palmos|blazer|windows\sce|windows\sphone|wp7|bolt|doris|dorothy|gobrowser|iris|maemo|minimo|netfront|semc-browser|skyfire|teashark|teleca|uzardweb|avantgo|docomo|kddi|ddipocket|polaris|eudoraweb|opwv|plink|plucker|pie|xiino|benq|playbook|bb|cricket|dell|bb10|nintendo|up.browser|playstation|tear|mib|obigo|midp|mobile|tablet)/.test(navigator.userAgent.toLowerCase())) {
        if (/iphone/.test(navigator.userAgent.toLowerCase()) && window.self === window.top) {
            jQuery('body').css('height', '100.18%');
        }
        if (window.addEventListener) {
            window.addEventListener("load", readDeviceOrientation);
            window.addEventListener("resize", readDeviceOrientation);
            window.addEventListener("orientationchange", readDeviceOrientation);
        }
        setTimeout(function() {
            readDeviceOrientation();
        }, 10);
    }
    $(document).on('click', '.cookie-close-btn', function() {
        $('.cookies').slideUp();
    });
    $(document).on('click', '.ok-btn', function() {
        $.cookie('using_cookies', true, {
            expires: 300,
            path: '/'
        });
        $('.cookies').slideUp();
    });
    $(document).on('click', '#video-object-btn, .youtube-btn', function() {
        var panoWindow = document.getElementById('krpanoSWFObject');
        var videoContainer = $('.video-modal-content');
        var youtubeKey = $(this).attr('data-code');
        panoWindow.call('hidepanospotsaction');
        panoWindow.call('stopallsounds');
        var dataId = getUrlVars()["p"].split('-')[0];
        if (!$.cookie('video_' + dataId)) {
            setCookie('video_' + dataId, true, {
                path: '/',
                expires: 3600
            });
            $('#video-object-btn div').remove();
        }
        OnCloseSearchPanel(false);
        if (parseInt(youtubeKey) != 0) {
            videoContainer.empty().append('<div class="embed-responsive embed-responsive-16by9" id="video-iframe">\
					<iframe class="embed-responsive-item modal-iframe"  frameborder="0" src="https://www.youtube.com/embed/' + youtubeKey + '?autoplay=1" allowfullscreen></iframe>\
				</div>');
        } else {
            videoContainer.empty().append('<img class="img-responsive" src="/assets/images/video_coming_soon.png" />');
        }
        $('.video-modal-close-btn, .video-modal-content').fadeIn(1000);
        $('#panoDIV').hide();
        OnShowHideControls(true, false);
        $('.video-modal-window').animate({
            left: '0'
        }, 500);
    });
    $(document).on('click', '.video-modal-close-btn', OnCloseVideoModal);
    $(document).on('click', '.help-content-close-btn', OnCloseVideoModal);
    $(document).on('click', '.inner-content-close-btn', OnCloseInnerModal);
    $(document).on('click', '.about-object-close-btn', OnCloseAboutObjectModal);
    $(document).on('click', '.help-content-close-btn', OnCloseHelpModal);
    $(document).on('click', '.lang-links li a', OnLanguageChange);
    $(document).on('click', '#about-full-btn', function() {
        OnCloseSearchPanel(false);
        getAboutInfo(false);
    });
    $(document).on('click', '.estate-back-btn', function() {
        $('.show-filters, .sisea-search-form, .search-panel-footer, .site-search-results').show();
        $('.filters-body, .hide-filters').hide().removeClass('active');
    });
    $(document).on('click', '#about-btn', function() {
        OnCloseSearchPanel(false);
        document.querySelectorAll('[data-b24-crm-button-widget=openline_livechat]')[0].click();
    });
    $(document).on('click', '.feed-back-btn', function() {
        // parent.LC_API.open_chat_window({
            // source: 'minimized'
        // });
		ga('send', 'event', 'Button', 'Click', 'List Property Click');
		$('.feed-back-form').fadeIn(500);
		OnCloseSearchPanel(false);
        OnShowHideControls(true, false);
    });
    $(document).on('click', '#help-btn', function() {
        OnCloseSearchPanel(false);
        getHelpInfo($(this).attr('data-id'));
    });
    $(document).on('click', '.close-modal-btn', OnCloseModal);
    $('.scrollbar-inner').scrollbar();
    $('#about-body').scrollbar();
    $('#inner-body').scrollbar();
    $('#about-object-body').scrollbar();
    $('#help-body').scrollbar();
    $('#main-categories').scrollbar();
    $('#location-filter').scrollbar();
    $('#feed-back-content').scrollbar();
    $(document).on('click', '.category-list a', function() {
        isLoaded = true;
        var $this = $(this);
        var lastLevel = false;
        if (!$this.parent().hasClass('last-level')) {
            lastLevel = true;
        }
        if ($this.hasClass('object')) {
            $this.find('.new').remove();
            if (isMobile.any()) {
                OnCloseSearchPanel(true);
            }
        } else {
            OnCategorySearch($this.data('search-id'), $this.data('id'), lastLevel, '', false);
        }
    });
    $(document).on('click', '.search-logo', function() {
        OnCloseSearchPanel(true);
    });
    $(document).on('click', '#settings-btn', function() {
        var blockHeight = 240;
        if (window.innerHeight <= 480) {
            blockHeight = 220;
        }
		if(isMobile.AndroidApp()){
			blockHeight = 192;
		}
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(".pano-control").animate({
                height: '0px'
            }, 500).hide('500');
        } else {
            $(this).addClass('open');
            $(".pano-control").css('display', 'inline-block').animate({
                height: blockHeight + 'px'
            }, 500);
        }
    });
    $(document).on('click', '#share-btn', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(".control-share-btns").animate({
                height: '0px'
            }, 500).hide('500');
        } else {
            $(this).addClass('open');
            $(".control-share-btns").show().animate({
                height: 86 + 'px'
            }, 500);
        }
    });
    $(document).on('click', '#category-share-btn', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(".category-control-share-btns").animate({
                height: '0px'
            }, 500).hide('500');
        } else {
            $(this).addClass('open');
            $(".category-control-share-btns").show().animate({
                height: 86 + 'px'
            }, 500);
        }
    });
    $(document).on('click', '.greeting-box-close-btn', function() {
        $('.greeting-box').fadeOut(500);
    });
	$(document).on('click', '.owl-navigation .owl-item', slideChange);
    $(document).on('click', '#category-control-share-btns a', OnCloseCategoryShareBtns);
    $(document).on('click', '#control-share-btns a', OnCloseShareBtns);
    $(document).on('click', '.back', function() {
        $('#search').val('');
        isLoaded = true;
        $('.search-logo').attr('data-isfilter', 0);
        var $this = $(this);
        $('.main-categories').show();
        $('.show-filters').hide();
        if (isMobile.any()) {
            $('.search-time').show();
        }
        $('#search-input').removeClass('filter-search');
        $('#site-search-results').parent('div').removeClass('estate-content');
        var lastLevel = false;
        if ($(this).attr('data-id') == '0') {
            OnCloseSearchPanel(true);
        } else {
            if (parseInt($this.attr('data-id')) == 1220) {
                GetTopObjects();
            } else {
                OnCategorySearch($this.attr('data-search-id'), $this.attr('data-id'), true, '', false);
            }
        }
        $('.search-logo').empty().css('background-image', 'url(/assets/images/logo360.svg)');
    });
    $(document).on('click', '#search-btn', OnSearch);
    $(document).on('keyup', '.sisea-search-form input', function(e){
		var btnCode = e.keyCode;
		if(btnCode ==16 || btnCode == 17 || btnCode == 18){}else{OnSearch();}
	});
    $(document).on('click', '.search-panel-close-btn', function() {
        OnCloseSearchPanel(true);
    });
    $(document).on('click', '#category-search-btn', function() {
				$('.category-search-btn div').remove();
        OnSearchPanelShow();
    });
	$(document).on('click', '.map-modal-close-btn, .map-modal-mobile-close-btn', function(){
		$('#map-modal').fadeOut(500);
		$('#modalMap').empty();
	});
    $(document).on('click', '#map-search-btn', function() {
		var placeId = $('#search-panel').attr('data-place-id');
        $('#map-modal').fadeIn(500);
		setTimeout(function(){
						if(placeId){
							initMapMarker(placeId, 'modalMap');
						}
						else{
							initMap('modalMap');
						}
					}, 500);
    });
    if (isMobile.any()) {
        $('.search-time').show();
        $("body").append($('<link rel="stylesheet" href="https://thai360.info/assets/css/mobile_adaptation.css? ' + getRandom() + '" type="text/css" />'));
    }
    $(document).on('click', '.language-active', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(".lang-links").hide("slide", {
                direction: "right"
            }, 500);
            $('.hub-logo, .audio-player, .feed-back-btn').show();
        } else {
            $(this).addClass('open');
            $(".lang-links").show("slide", {
                direction: "right"
            }, 500);
            $('.hub-logo, .audio-player, .feed-back-btn').hide();
        }
    });
    $(document).on('click', '.feed-back-close-btn', function() {
        $('.feed-back-form').fadeOut(500);
        OnShowHideControls(false, false);
        setTimeout(function() {
            OnSearchPanelShow();
        }, 600);
    });
    $(document).on('click', '.inner-modal a', function() {
        OnCloseInnerModal();
        OnCloseModal();
    });
    $(document).on('click', '.about-object-modal a[href*=#]', function() {
        OnCloseAboutObjectModal();
    })
    $(document).on('click', '.prev-new', function() {
        var offset = parseInt($(this).attr('data-offset'));
        var nextOffset = parseInt($('.next-new').attr('data-offset'));
        if (offset >= 0) {
            OnLoadNews(offset);
            if (offset >= 0) {
                $(this).attr('data-offset', offset - 3);
                $('.next-new').attr('data-offset', nextOffset - 3);
            }
        }
    });
    $(document).on('click', '.next-new', function() {
        var offset = parseInt($(this).attr('data-offset'));
        var prevOffset = parseInt($('.prev-new').attr('data-offset'));
        var count = parseInt($('.about-block.block-2 h3').attr('data-count'));
        if (offset < count) {
            OnLoadNews(offset);
            $(this).attr('data-offset', offset + 3);
            if ((count - offset) > 0) {
                $('.prev-new').attr('data-offset', prevOffset + 3);
            }
        }
    });
    $(document).on('click', '#stop-play', function() {
        var $this = $(this);
        var player = document.getElementById('audio-player');
        var playList = $('.play-list');
        if ($this.hasClass('active')) {
            $this.removeClass('active').css('background-image', 'url(/assets/images/play_music_icon.svg)');
            player.pause();
        } else {
            if ($this.hasClass('first-click')) {
                $this.addClass('active').removeClass('first-click').css('background-image', 'url(/assets/images/pause.svg)');
                player.src = playList.find('li:first-child').attr('data-link');
                playList.find('li:first-child').addClass('playing');
            } else {
                $this.addClass('active').css('background-image', 'url(/assets/images/pause.svg)');
            }
            player.play();
        }
    });
    document.getElementById('audio-player').onended = function() {
        var trackId = 1
        var tracksCount = $('.play-list li').length;
        console.log(tracksCount);
        $('.play-list li').each(function() {
            if ($(this).hasClass('playing')) {
                trackId++;
                return false;
            } else {
                trackId++;
            }
        });
        if (trackId > tracksCount) {
            trackId = 1;
        }
        $('.play-list li').removeClass('playing');
        $('.play-list li:nth-child(' + trackId + ')').addClass('playing');
        this.src = $('.play-list li:nth-child(' + trackId + ')').attr('data-link');
        this.play();
    }
    if (isMobile.any()) {
		// Listen for orientation changes
		window.addEventListener("orientationchange", function() {
			var deviceHeight = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.height : window.innerHeight;
			var deviceWidth = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.width : window.innerWidth;
			$('#modalMap').css({'height': deviceHeight, 'width': deviceWidth});
		}, false);
        $('#giroscope-btn').parents('li').show();
        var panel = document.getElementById('search-panel');
        var startPoint = {};
        var nowPoint;
        var ldelay;
        panel.addEventListener('touchstart', function(event) {
            if (!$('#filters-body').hasClass('active')) {
                startPoint.x = event.changedTouches[0].pageX;
                startPoint.y = event.changedTouches[0].pageY;
                ldelay = new Date();
            }
        }, {
            passive: true
        });
        panel.addEventListener('touchmove', function(event) {
            if (!$('#filters-body').hasClass('active')) {
                var otk = {};
                nowPoint = event.changedTouches[0];
                otk.x = nowPoint.pageX - startPoint.x;
                otk.y = nowPoint.pageY - startPoint.y;
                var left = otk.x;
                if (window.innerWidth > 396) {
                    left = window.innerWidth - (396 - otk.x);
                }
                if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
                    //event.preventDefault();
                    //event.stopPropagation();
                    panel.style.left = left + 'px';
                }
            }
        }, {
            passive: true
        });
        panel.addEventListener('touchend', function(event) {
            if (!$('#filters-body').hasClass('active')) {
                var pdelay = new Date();
                nowPoint = event.changedTouches[0];
                var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
                var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
                var left = 0;
                if (window.innerWidth > 396) {
                    left = window.innerWidth - 396;
                }
                if ((xAbs > 20 || yAbs > 20)) {
                    if (xAbs > (yAbs * 5)) {
                        if (xAbs > 130) {
                            if (nowPoint.pageX > startPoint.x) {
                                $('#search-panel').animate({
                                    left: window.innerWidth
                                }, 500);
                                $('#search-panel').queue(function() {
                                    OnCloseSearchPanel(false);
                                    $('#search-panel').dequeue();
                                });
                            }
                        } else {
                            $('#search-panel').animate({
                                left: left
                            }, 500);
                        }
                    } else {
                        $('#search-panel').animate({
                            left: left
                        }, 500);
                    }
                }
            }
        }, {
            passive: true
        });
        var categoryBtn = document.getElementById('category-search-btn');
        var panel = document.getElementById('search-panel');
        var aboutObjectBtn = document.getElementById('about-object-btn');
        var aboutObjectModal = document.getElementById('about-object-modal');
        var widthInTwo = screen.width * 0.3;
        categoryBtn.addEventListener('touchstart', function(event) {
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                touchOffsetX = touch.pageX - touch.target.offsetLeft;
            }
        }, {
            passive: true
        });
        categoryBtn.addEventListener('touchmove', function(event) {
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                var moveX = touch.pageX - touchOffsetX;
                categoryBtn.style.right = (window.innerWidth - 38 - moveX) + 'px';
                panel.style.width = (window.innerWidth - 53 - moveX) + 'px';
            }
        }, {
            passive: true
        });
        categoryBtn.addEventListener('touchend', function(event) {
            if (event.changedTouches.length == 1) {
                var widthNow = parseInt(panel.style.width);
                if (widthNow >= 130) {
                    categoryBtn.style.right = 15 + 'px';
                    OnSearchPanelShow();
                } else {
                    $('#category-search-btn').animate({
                        right: 15
                    }, 500);
                    $('#search-panel').animate({
                        width: 0
                    }, 500);
                }
            }
        }, {
            passive: true
        });
        aboutObjectBtn.addEventListener('touchstart', function(event) {
			//event.preventDefault();
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                touchOffsetX = touch.pageX - touch.target.offsetLeft;
            }
        }, false);
        aboutObjectBtn.addEventListener('touchmove', function(event) {
			event.preventDefault();
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                var moveX = touch.pageX - touchOffsetX;
                aboutObjectBtn.style.left = moveX + 'px';
                aboutObjectModal.style.right = (window.innerWidth + 15 - moveX) + 'px';
            }
        }, false);
        aboutObjectBtn.addEventListener('touchend', function(event){
			event.preventDefault();
            if (event.changedTouches.length == 1) {
                var widthNow = parseInt(aboutObjectModal.style.right);
                if ((window.innerWidth - widthNow) >= 130) {
                    aboutObjectBtn.style.left = 15 + 'px';
                    getAboutObjectInfo(false);clearTimeout(timeout);
                } else {
                    $('#about-object-btn').animate({
                        left: 15
                    }, 500);
                    $('#about-object-modal').animate({
                        right: '100%'
                    }, 500);
                }
            }
        }, false);
        var aboutUsModal = document.getElementById('about-modal-window');
        aboutUsModal.addEventListener('touchstart', function(event) {
            startPoint.x = event.changedTouches[0].pageX;
            startPoint.y = event.changedTouches[0].pageY;
            ldelay = new Date();
        }, {
            passive: true
        });
        aboutUsModal.addEventListener('touchmove', function(event) {
            var otk = {};
            nowPoint = event.changedTouches[0];
            otk.x = nowPoint.pageX - startPoint.x;
            otk.y = nowPoint.pageY - startPoint.y;
            var left = otk.x;
            if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
                aboutUsModal.style.right = (left * (-1)) + 'px';
                aboutUsModal.style.left = left + 'px';
            }
        }, {
            passive: true
        });
        aboutUsModal.addEventListener('touchend', function(event) {
            var pdelay = new Date();
            nowPoint = event.changedTouches[0];
            var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
            var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
            var right = '100%';
            if ((xAbs > 20 || yAbs > 20)) {
                if (xAbs > (yAbs * 5)) {
                    if (xAbs > 130) {
                        if (nowPoint.pageX > startPoint.x) {
                            $('#about-modal-window').animate({
                                right: (window.innerWidth * (-1)),
                                left: window.innerWidth
                            }, 500);
                            $('#about-modal-window').queue(function() {
                                OnCloseModal();
                                $('#about-modal-window').css({
                                    right: '0',
                                    left: '100%'
                                });
                                $('#about-modal-window').dequeue();
                            });
                        }
                    } else {
                        $('#about-modal-window').animate({
                            left: 0,
                            right: 0
                        }, 500);
                    }
                } else {
                    $('#about-modal-window').animate({
                        left: 0,
                        right: 0
                    }, 500);
                }
            }
        }, {
            passive: true
        });
        var videoModal = document.getElementById('video-modal-window');
        videoModal.addEventListener('touchstart', function(event) {
            startPoint.x = event.changedTouches[0].pageX;
            startPoint.y = event.changedTouches[0].pageY;
            ldelay = new Date();
        }, {
            passive: true
        });
        videoModal.addEventListener('touchmove', function(event) {
            var otk = {};
            nowPoint = event.changedTouches[0];
            otk.x = nowPoint.pageX - startPoint.x;
            otk.y = nowPoint.pageY - startPoint.y;
            var left = otk.x;
            if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
                videoModal.style.right = (left * (-1)) + 'px';
                videoModal.style.left = left + 'px';
            }
        }, {
            passive: true
        });
        videoModal.addEventListener('touchend', function(event) {
            var pdelay = new Date();
            nowPoint = event.changedTouches[0];
            var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
            var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
            var right = '100%';
            if ((xAbs > 20 || yAbs > 20)) {
                if (xAbs > (yAbs * 5)) {
                    if (xAbs > 130) {
                        if (nowPoint.pageX > startPoint.x) {
                            $('#video-modal-window').animate({
                                right: (window.innerWidth * (-1)),
                                left: window.innerWidth
                            }, 500);
                            $('#video-modal-window').queue(function() {
                                OnCloseVideoModal();
                                $('#video-modal-window').css({
                                    right: '0',
                                    left: '100%'
                                });
                                $('#video-modal-window').dequeue();
                            });
                        }
                    } else {
                        $('#video-modal-window').animate({
                            left: 0,
                            right: 0
                        }, 500);
                    }
                } else {
                    $('#video-modal-window').animate({
                        left: 0,
                        right: 0
                    }, 500);
                }
            }
        }, false);
        var helpModal = document.getElementById('help-modal');
        helpModal.addEventListener('touchstart', function(event) {
            startPoint.x = event.changedTouches[0].pageX;
            startPoint.y = event.changedTouches[0].pageY;
            ldelay = new Date();
        }, {
            passive: true
        });
        helpModal.addEventListener('touchmove', function(event) {
            var otk = {};
            nowPoint = event.changedTouches[0];
            otk.x = nowPoint.pageX - startPoint.x;
            otk.y = nowPoint.pageY - startPoint.y;
            var left = otk.x;
            if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
                helpModal.style.right = (left * (-1)) + 'px';
                helpModal.style.left = left + 'px';
            }
        }, {
            passive: true
        });
        helpModal.addEventListener('touchend', function(event) {
            var pdelay = new Date();
            nowPoint = event.changedTouches[0];
            var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
            var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
            var right = '100%';
            if ((xAbs > 20 || yAbs > 20)) {
                if (xAbs > (yAbs * 5)) {
                    if (xAbs > 130) {
                        if (nowPoint.pageX > startPoint.x) {
                            $('#help-modal').animate({
                                right: (window.innerWidth * (-1)),
                                left: window.innerWidth
                            }, 500);
                            $('#help-modal').queue(function() {
                                OnCloseHelpModal();
                                $('#help-modal').css({
                                    right: '0',
                                    left: '100%'
                                });
                                $('#help-modal').dequeue();
                            });
                        }
                    } else {
                        $('#help-modal').animate({
                            left: 0,
                            right: 0
                        }, 500);
                    }
                } else {
                    $('#help-modal').animate({
                        left: 0,
                        right: 0
                    }, 500);
                }
            }
        }, {
            passive: true
        });
    }
}
$(document).ready(OnDocumentReady);
$(window).load(function() {
	if(isMobile.AndroidApp() || isMobile.iOSApp()){
		$('#fullScreen-btn').parent('li').hide();
	}
    var categoryId = getUrlVars()["c"];
	var cultureKey = getUrlVars()["lang"];
	var panoId = getUrlVars()["p"];
	var krpano = document.getElementById("krpanoSWFObject");
	var deviceHeight = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.height : window.innerHeight;
	var deviceWidth = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.width : window.innerWidth;
	if(isMobile.any()){
		$('#modalMap').css({'height': (deviceHeight) + 'px', 'width': (deviceWidth) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-mobile-close-btn"></div>');
	}
	else{
		$('#modalMap').css({'height': (deviceHeight - 50) + 'px', 'width': (deviceWidth - 200) + 'px'});
		$('#map-modal').prepend('<div class="map-modal-close-btn"></div>');
	}
	if(typeof cultureKey === 'undefined'){
		cultureKey = 'en';
	}
	// if(parseInt(panoId) == 26){
		// $('body').append('<div class="greeting-box"><img src="/assets/images/thai-king.jpg" /><div class="greeting-box-close-btn"></div></div>');
	// }
	if(parseInt(panoId) == 26 && isMobile.AndroidApp()){
		setTimeout(function(){var krpano = document.getElementById("krpanoSWFObject");krpano.set('hotspot[spotpoint1590].visible', false);krpano.set('hotspot[spotpoint1593].visible', false);krpano.set('hotspot[spotpoint1594].visible', false);}, 500);
	}
    CSSLoad('https://thai360.info/assets/css/owl.carousel.css');
    CSSLoad('https://thai360.info/assets/css/bootstrap.css');
    CSSLoad('https://thai360.info/assets/css/jquery.scrollbar.css');
    CSSLoad('https://thai360.info/assets/css/main.css?' + getRandom());
	getBtnTranslations(cultureKey);
    if ((typeof categoryId === 'undefined' || categoryId === null) && (parseInt($('.search-logo').attr('data-id')) != 35)) {
        GetTopObjects();
    } else {
        OnSearchPanelShow();
        $('.back').attr('data-id', 1220).attr('data-search-id', 1220);
    }
	//initLiveChat();
	BitrixChatInit(cultureKey);
	if (!$.cookie('using_cookies')) {
        setTimeout(function() {
            $('.cookies').slideDown();
        }, 15000);
    }
	if(typeof categoryId != 'undefined' || parseInt(panoId) == 26){
			searchTimeout();
	}

    GetParentCategories();
    GetFilterMap();
	//setTimeout(function(){firstLoad = false;}, 1000);
});
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

function getPricesByCurrency(value) {
    var currency = $('#currency-select .select-active').attr('data-currency');
    var entity;
    switch (currency) {
        case 'rub':
            entity = value * rubKoef;
            break;
        case 'eur':
            entity = value * eurKoef;
            break;
        case 'usd':
            entity = value * usdKoef;
            break;
        case 'thb':
            entity = value * 1;
            break;
    }
    return Math.round(entity);
}

function getCurrencySymbol() {
    var currency = $('#currency-select .select-active').attr('data-currency');
    var entity;
    switch (currency) {
        case 'rub':
            entity = '₽';
            break;
        case 'eur':
            entity = '€';
            break;
        case 'usd':
            entity = '$';
            break;
        case 'thb':
            entity = '฿';
            break;
    }
    return entity;
}

function getDistrictArray() {
    var checkedDistricts = [];
    $('.districts p label input:checked').each(function() {
        checkedDistricts.push('district==' + $(this).val());
    });
    checkedDistricts = checkedDistricts.join(',');
    if (checkedDistricts.length < 1) {
        checkedDistricts = 0;
    }
    return checkedDistricts;
}

function getObjectsCount() {
    var count = 0;
    $('#site-search-results .sisea-result.offset').each(function() {
        count++;
    });
    return count;
}

function GetExludeObjects(forSearch) {
    var excludeObjects = [];
    $('.category-list .sisea-result a').each(function() {
        var $this = $(this);
		if(forSearch){
			excludeObjects.push($this.attr('data-id'));
		}
		else{
			excludeObjects.push('-' + $this.attr('data-id'));
		}
    });
	if(excludeObjects.length != 0){
		excludeObjects = excludeObjects.join(',');
	}
	else{
		excludeObjects = '0';
	}
    return excludeObjects;
}
function BitrixChatInit(lang){
	var key = (lang == 'en' || lang == 'th' ) ? '2_tlmkb7' : (lang == 'ru') ? '4_w1ro7v' : (lang == 'zh') ? '6_e7jx3s' : '2_tlmkb7';
	(function(w,d,u){
      var s=d.createElement('script');s.async=1;s.src=u+'?'+(Date.now()/60000|0);
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
  })(window,document,'https://cdn.bitrix24.com/b3820821/crm/site_button/loader_' + key + '.js');
}
