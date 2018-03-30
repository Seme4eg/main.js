//Функция загрузки страницы(отсюда нужно вынести все обработчики кликов по кнопкам и наверно собрать их в отдельный файл)
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
        //Функции слайда окон на мобильных девайсах
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