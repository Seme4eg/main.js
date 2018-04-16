// --- document onclicks or other handlers ---

$(document).on('click', '.feed-back-form form', feedBackForm);
$(document).on('click', '.day-night-btn', dayNightBtn);
$(document).on('click', '#terms-of-use, #privacy-policy, .item-new', getInnerContent); // fetching..
$(document).on('click', '#currency-select li a', currencySelection);
$(document).on('click', '#type-select li a', typeSelection);
$(document).on('click', '.filter-search-btn', OnFilterSearch); // fetching..
$(document).on('click', '.districts p label input', districtsHandler);
$(document).on('click', '#video-object-btn, .youtube-btn', videoObjectBtn);
$(document).on('click', '.lang-links li a', OnLanguageChange);
$(document).on('click', '.category-list a', categoryList);
$(document).on('click', '.search-logo', () => OnCloseSearchPanel(true));
$(document).on('click', '#settings-btn', settingsBtn);
$(document).on('click', '#share-btn', shareBtn);
$(document).on('click', '#category-share-btn', categoryShareBtn);
$(document).on('click', '.owl-navigation .owl-item', slideChange);
$(document).on('click', '#control-share-btns a', OnCloseShareBtns);
$(document).on('click', '.back', backHandler);
$(document).on('click', '#search-btn', OnSearch);
$(document).on('click', '.search-panel-close-btn', () => OnCloseSearchPanel(true));
$(document).on('click', '.language-active', languageActive);
$(document).on('click', '#stop-play', stopPlay);
document.getElementById('audio-player').onended = audioPlayer;


$(document).on('click', '#sale-input', function(event) {
    event.stopPropagation();
    $('.radio-btns .select-list').hide();
    $('.priceFilter h4').text(translation.Price_Rate(getUrlVars()["lang"]));
    getPrices(getPricesAndSymbol(priceSaleMin), getPricesAndSymbol(priceSaleMax), getPricesAndSymbol(100000));
    GetFilterMap();
});
$(document).on('click', '#daily-rent', function(event) {
    event.stopPropagation();
    $('.radio-btns .select-list').hide();
    $('.priceFilter h4').text(translation.Daily_Rate(getUrlVars()["lang"]));
    getPrices(getPricesAndSymbol(priceRentDailyMin), getPricesAndSymbol(priceRentDailyMax), getPricesAndSymbol(100));
    GetFilterMap();
});
$(document).on('click', '#monthly-rent', function(event) {
    event.stopPropagation();
    $('.radio-btns .select-list').hide();
    $('.priceFilter h4').text(translation.Monthly_Rate(getUrlVars()["lang"]));
    getPrices(getPricesAndSymbol(priceRentMonthlyMin), getPricesAndSymbol(priceRentMonthlyMax), getPricesAndSymbol(500));
    GetFilterMap();
});
$(document).on('click', '#currency-select .select-active', function() {
    if ($('#currency-select ul').hasClass('open'))
        $('#currency-select ul').hide().removeClass('open');
    else
        $('#currency-select ul').show().addClass('open');
});
$(document).on('click', '#type-select .select-active', function() {
    if ($('#type-select ul').hasClass('open')) {
        $('#type-select ul').hide().removeClass('open');
    } else {
        $('#type-select ul').show().addClass('open');
    }
});
$(document).on('click', '#property-feed-back', function(){
if(!$(this).hasClass('sent'))
  sendMail(true);
})
$(document).on('click', '.contact-object-btn', function() {
    if (isMobile.any())
        OnCloseSearchPanel(false);
    parent.LC_API.open_chat_window({
        source: 'minimized'
    });
});
$(document).on('click', '.roomsFilter label', function(e) {
    e.preventDefault();
    let $this = $(this); // is needed?
    $('.roomsFilter input').each(function() {
        if (parseInt($this.find('input').val()) >= parseInt($(this).val())) {
            $(this).parent('label').addClass('active');
        } else
            $(this).parent('label').removeClass('active');
    });
    $('.roomsFilter input:checked').prop('checked', false);
    $this.find('input').prop('checked', true);
});
$(document).on('click', '.help-content-close-btn', OnCloseHelpModal);
$(document).on('click', '.filters-body, .filters-body div, .filters-body span, .filters-body p, .filters-body label, .filters-body input', () => {
    $('.select-list').hide().removeClass('open');
});
$(document).on('click', '.filter-clear-btn', filterCleanBtn);
$(document).on('click', '.radio-btns p label', function() {
    let $this = $(this);
    $('.radio-btns p label').removeClass('active');
    $this.addClass('active');
});
$(document).on('click', '#rent-input', function() {
    $('.radio-btns .select-list').show();
});
$(document).on('click', '.cookie-close-btn', () => {
    $('.cookies').slideUp();
});
$(document).on('click', '.ok-btn', function() {
    $.cookie('using_cookies', true, {
        expires: 300,
        path: '/'
    });
    $('.cookies').slideUp();
});
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
$(document).on('click', '.greeting-box-close-btn', function() {
    $('.greeting-box').fadeOut(500);
});
$(document).on('keyup', '.sisea-search-form input', function(e){
let btnCode = e.keyCode;
    if (btnCode != 16 && btnCode != 17 && btnCode != 18)
        OnSearch();
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
let placeId = $('#search-panel').attr('data-place-id');
    $('#map-modal').fadeIn(500);
    setTimeout( () => placeId ? initMapMarker(placeId, 'modalMap') : initMap('modalMap'), 500);
});
$(document).on('click', '.feed-back-close-btn', function() {
    $('.feed-back-form').fadeOut(500);
    OnShowHideControls(false, false);
    setTimeout( () => OnSearchPanelShow(), 600);
});
$(document).on('click', '.inner-modal a', function() {
    OnCloseInnerModal();
    OnCloseModal();
});
$(document).on('click', '.about-object-modal a[href*=\\#]', function() {
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
$(document).on('click', '.next-new', nextNew);


//Функция загрузки страницы(отсюда нужно вынести все обработчики кликов по кнопкам и наверно собрать их в отдельный файл)
document.addEventListener('DOMContentLoaded', function() {

    $(".roomsFilter label").mouseover(roomsFilterMouseOver).mouseout(function() {
        let $this = $(this);
        $('.roomsFilter label').removeClass('room-hover').removeClass('room-no-hover');
        if (parseInt($('.roomsFilter input:checked').val()) == 50) {
            $('.roomsFilter h5 i').text(8 + '+');
        } else
            $('.roomsFilter h5 i').text($('.roomsFilter input:checked').val());
    });
    $('.scrollbar-inner').scrollbar();
    $('#about-body').scrollbar();
    $('#inner-body').scrollbar();
    $('#about-object-body').scrollbar();
    $('#help-body').scrollbar();
    $('#main-categories').scrollbar();
    $('#location-filter').scrollbar();
    $('#feed-back-content').scrollbar();


    if (isMobile.any()) {

        // vars
        var panel = document.getElementById('search-panel'),
            startPoint = {},
            nowPoint,
            ldelay,
            widthInTwo = screen.width * 0.3,
            categoryBtn = document.getElementById('category-search-btn'),
            panel = document.getElementById('search-panel'),
            aboutObjectBtn = document.getElementById('about-object-btn'),
            aboutObjectModal = document.getElementById('about-object-modal'),
            aboutUsModal = document.getElementById('about-modal-window'),
            videoModal = document.getElementById('video-modal-window'),
            helpModal = document.getElementById('help-modal');


        // event handlers settings
        panel.addEventListener('touchmove', panelTouchMove, { passive: true });
        panel.addEventListener('touchend', panelTouchEnd, { passive: true });
        categoryBtn.addEventListener('touchmove', categoryBtnTouchMove, { passive: true });
        categoryBtn.addEventListener('touchend', categoryBtnTouchEnd, { passive: true });
        aboutObjectBtn.addEventListener('touchend', aboutObjectBtnHandler, false);
        aboutUsModal.addEventListener('touchmove', aboutUsTouchMove, { passive: true });
        aboutUsModal.addEventListener('touchend', aboutUsTouchEnd, { passive: true });
        videoModal.addEventListener('touchmove', videoModalTouchMove, { passive: true });
        videoModal.addEventListener('touchend', videoModalTouchEnd, false);
        categoryBtn.addEventListener('touchstart', btnTouchStart, { passive: true });
        aboutObjectBtn.addEventListener('touchstart', btnTouchStart, false);
        aboutUsModal.addEventListener('touchstart', createNewDate, { passive: true });
        videoModal.addEventListener('touchstart', createNewDate, { passive: true });
        helpModal.addEventListener('touchstart', createNewDate, { passive: true });
        helpModal.addEventListener('touchend', helpTouchEnd, { passive: true });


        // Listen for orientation changes
		window.addEventListener("orientationchange", function() {
			let deviceHeight = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.height : window.innerHeight;
			let deviceWidth = isMobile.AndroidApp() || isMobile.iOSApp() ? screen.width : window.innerWidth;
			$('#modalMap').css({'height': deviceHeight, 'width': deviceWidth});
        }, false);

        $('#giroscope-btn').parents('li').show();

        //Функции слайда окон на мобильных девайсах
        panel.addEventListener('touchstart', function(event) {
            if (!$('#filters-body').hasClass('active'))
            createNewDate(event);
        }, {
            passive: true
        });

        aboutObjectBtn.addEventListener('touchmove', function(event) {
			event.preventDefault();
            if (event.targetTouches.length == 1) {
                let touch = event.targetTouches[0],
                    moveX = touch.pageX - touchOffsetX;

                aboutObjectBtn.style.left = moveX + 'px';
                aboutObjectModal.style.right = (window.innerWidth + 15 - moveX) + 'px';
            }
        }, false);

        helpModal.addEventListener('touchmove', function(event) {
            nowPoint = event.changedTouches[0];

            let otk = {
                x: nowPoint.pageX - startPoint.x,
                y: nowPoint.pageY - startPoint.y
            };

            let left = otk.x;

            if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
                helpModal.style.right = (left * (-1)) + 'px';
                helpModal.style.left = left + 'px';
            }
        }, {
            passive: true
        });
    }
});

// --- functions - handlers ---
function panelTouchMove (event) {
    if (!$('#filters-body').hasClass('active')) {
        nowPoint = event.changedTouches[0];

        let otk = {
            x: nowPoint.pageX - startPoint.x,
            y: nowPoint.pageY - startPoint.y
        };

        let left = window.innerWidth > 396 ? window.innerWidth - (396 - otk.y) : otk.x;

        if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5))
            panel.style.left = left + 'px';
    }
}

function panelTouchEnd (event) {
    if (!$('#filters-body').hasClass('active')) {
        nowPoint = event.changedTouches[0];

        let pdelay = new Date(),
            xAbs = Math.abs(startPoint.x - nowPoint.pageX),
            yAbs = Math.abs(startPoint.y - nowPoint.pageY),
            left = window.innerWidth > 396 ? window.innerWidth - 396 : 0;

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
}

function categoryBtnTouchMove(event) {
    if (event.targetTouches.length == 1) {
        let touch = event.targetTouches[0];
        let moveX = touch.pageX - touchOffsetX;
        categoryBtn.style.right = (window.innerWidth - 38 - moveX) + 'px';
        panel.style.width = (window.innerWidth - 53 - moveX) + 'px';
    }
}

function categoryBtnTouchEnd(event) {
    if (event.changedTouches.length == 1) {
        let widthNow = parseInt(panel.style.width);
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
}

function aboutObjectBtnHandler(event){
event.preventDefault();
    if (event.changedTouches.length == 1) {
        let widthNow = parseInt(aboutObjectModal.style.right);
        if ((window.innerWidth - widthNow) >= 130) {
            aboutObjectBtn.style.left = 15 + 'px';
            getAboutObjectInfo(false);
            clearTimeout(timeout);
        } else {
            $('#about-object-btn').animate({
                left: 15
            }, 500);
            $('#about-object-modal').animate({
                right: '100%'
            }, 500);
        }
    }
}

function videoModalTouchMove(event) {
    nowPoint = event.changedTouches[0];

    let otk = {
        x: nowPoint.pageX - startPoint.x,
        y: nowPoint.pageY - startPoint.y
    };

    let left = otk.x;

    if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
        videoModal.style.right = (left * (-1)) + 'px';
        videoModal.style.left = left + 'px';
    }
}

function videoModalTouchEnd(event) {
    nowPoint = event.changedTouches[0];

    let pdelay = new Date(),
        xAbs = Math.abs(startPoint.x - nowPoint.pageX),
        yAbs = Math.abs(startPoint.y - nowPoint.pageY),
        right = '100%';

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
}

function aboutUsTouchMove(event) {
    nowPoint = event.changedTouches[0];

    let otk = {
        x: nowPoint.pageX - startPoint.x,
        y: nowPoint.pageY - startPoint.y
    };

    let left = otk.x;

    if (otk.x > 0 && Math.abs(otk.x) > Math.abs(otk.y * 5)) {
        aboutUsModal.style.right = (left * (-1)) + 'px';
        aboutUsModal.style.left = left + 'px';
    }
}

function aboutUsTouchEnd(event) {
    nowPoint = event.changedTouches[0];

    let pdelay = new Date(),
        xAbs = Math.abs(startPoint.x - nowPoint.pageX),
        yAbs = Math.abs(startPoint.y - nowPoint.pageY),
        right = '100%';

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
}
function btnTouchStart(event) {
    if (event.targetTouches.length == 1) {
        let touch = event.targetTouches[0];
        touchOffsetX = touch.pageX - touch.target.offsetLeft;
    }
}
function createNewDate(event) {
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
}
function helpTouchEnd(event) {
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
function feedBackForm() {
    var elem = $(".feed-back-form form input, .feed-back-form form select"),
        foc,
        error = false,
        oldHref = window.location.href;

    elem.each(function(index) {
        if ($(this).hasClass('required')) {
            if (!this.value || this.value == this.defaultValue) {
                $(this).addClass("error");
                error = true;
                foc = $(this).attr("id");
            } else
                $(this).removeClass("error");
        }
    });
    if (error) {
        $('#' + foc).focus();
        return false;
    } else {
        if (elem.value == this.defaultValue) this.value = "";
        window.location.href = 'https://thai360.info/message-sent?redirect=' + oldHref;
    }
}

function dayNightBtn () {
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
}

function currencySelection () {
    var $this = $(this);

    $('#currency-select li').show();
    $('#currency-select .select-active').html($this.attr('data-currency')).attr('data-currency', $this.attr('data-currency'));
    $('.price-currency').text($this.attr('data-currency'));
    $this.parent('li').hide();
    $('#currency-select ul').hide().removeClass('open');
    if ($('#sale-input').hasClass('active'))
        getPrices(getPricesAndSymbol(parseInt(priceSaleMin)), getPricesAndSymbol(parseInt(priceSaleMax)), getPricesAndSymbol(100000))
    if ($('.radio-btns .select label').hasClass('active') && $('#daily-rent input').prop('checked'))
        getPrices(getPricesAndSymbol(parseInt(priceRentDailyMin)), getPricesAndSymbol(parseInt(priceRentDailyMax)), getPricesAndSymbol(100))
    if ($('.radio-btns .select label').hasClass('active') && $('#monthly-rent input').prop('checked'))
        getPrices(getPricesAndSymbol(parseInt(priceRentMonthlyMin)), getPricesAndSymbol(parseInt(priceRentMonthlyMax)), getPricesAndSymbol(500))
}

function typeSelection () {
    var $this = $(this);
    $('#type-select li').show();
    $('#type-select .select-active').html($this.text()).attr('data-categoryId', $this.attr('data-categoryId'));
    $this.parent('li').hide();
    $('#type-select ul').hide().removeClass('open');

    if ($this.attr('data-categoryid') == '327-land') {
        $('.roomsFilter').hide();
        getBeds(0, 15);
    } else
        $('.roomsFilter').show();
    GetFilterMap();
}

function roomsFilterMouseOver () {
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
    } else
        $('.roomsFilter h5 i').text($this.find('input').val());
}

function districtsHandler () {
    var $this = $(this);
    var districtId = $this.parents('p').attr('id');
    if ($this.parent('label').hasClass('active')) {
        $this.parent('label').removeClass('active');
    } else
        $this.parent('label').addClass('active');
    $('.district-points li').each(function() {
        var $this = $(this);
        var dataDistrictId = $this.attr('data-district');
        if (districtId == dataDistrictId)
            $this.toggle();
    });
}

function videoObjectBtn () {
    let panoWindow = document.getElementById('krpanoSWFObject'),
        videoContainer = $('.video-modal-content'),
        youtubeKey = $(this).attr('data-code'),
        dataId = getUrlVars()["p"].split('-')[0];

    panoWindow.call('hidepanospotsaction');
    panoWindow.call('stopallsounds');
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
    } else
        videoContainer.empty().append('<img class="img-responsive" src="/assets/images/video_coming_soon.png" />');
    $('.video-modal-close-btn, .video-modal-content').fadeIn(1000);
    $('#panoDIV').hide();
    OnShowHideControls(true, false);
    $('.video-modal-window').animate({
        left: '0'
    }, 500);
}

function categoryList () {
    isLoaded = true;
    let $this = $(this),
        lastLevel = false;

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
}

function settingsBtn () {
    let blockHeight = window.innerHeight <= 480 ? 220 : isMobile.AndroidApp() ? 192 : 240;
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
}

function shareBtn () {
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
}

function categoryShareBtn () {
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
}

function backHandler () {
    isLoaded = true;
    let $this = $(this),
        lastLevel = false;

    $('#search').val('');
    $('.search-logo').attr('data-isfilter', 0);
    $('.main-categories').show();
    $('.show-filters').hide();

    if (isMobile.any())
        $('.search-time').show();

    $('#search-input').removeClass('filter-search');
    $('#site-search-results').parent('div').removeClass('estate-content');

    if ($(this).attr('data-id') == '0') {
        OnCloseSearchPanel(true);
    } else {
        if (parseInt($this.attr('data-id')) == 1220) {
            GetTopObjects();
        } else
            OnCategorySearch($this.attr('data-search-id'), $this.attr('data-id'), true, '', false);
    }
    $('.search-logo').empty().css('background-image', 'url(/assets/images/logo360.svg)');
}

function languageActive () {
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
}

function stopPlay () {
    let $this = $(this),
        player = document.getElementById('audio-player'),
        playList = $('.play-list');

    if ($this.hasClass('active')) {
        $this.removeClass('active').css('background-image', 'url(/assets/images/play_music_icon.svg)');
        player.pause();
    } else {
        if ($this.hasClass('first-click')) {
            $this.addClass('active').removeClass('first-click').css('background-image', 'url(/assets/images/pause.svg)');
            player.src = playList.find('li:first-child').attr('data-link');
            playList.find('li:first-child').addClass('playing');
        } else
            $this.addClass('active').css('background-image', 'url(/assets/images/pause.svg)');
        player.play();
    }
}

function audioPlayer () {
    let trackId = 1
    let tracksCount = $('.play-list li').length;

    // console.log(tracksCount);
    $('.play-list li').each(function() {
        if ($(this).hasClass('playing')) {
            trackId++;
            return false;
        } else trackId++;
    });
    if (trackId > tracksCount) trackId = 1;

    $('.play-list li').removeClass('playing');
    $('.play-list li:nth-child(' + trackId + ')').addClass('playing');
    this.src = $('.play-list li:nth-child(' + trackId + ')').attr('data-link');
    this.play();
}

function filterCleanBtn(e) {
    e.preventDefault();
    var clearType = $('#type-select ul li:first-child a');
    getPrices(getPricesAndSymbol(priceSaleMin), getPricesAndSymbol(priceSaleMax), getPricesAndSymbol(100000));
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
}

function nextNew() {
    let offset = parseInt($(this).attr('data-offset')),
        prevOffset = parseInt($('.prev-new').attr('data-offset')),
        count = parseInt($('.about-block.block-2 h3').attr('data-count'));

    if (offset < count) {
        OnLoadNews(offset);
        $(this).attr('data-offset', offset + 3);
        if ((count - offset) > 0)
            $('.prev-new').attr('data-offset', prevOffset + 3);
    }
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

//Поиск категорий/Обектов при клике на категорию(тоже присутствует ненужный код)
function OnSearch() {
    isLoaded = true;

    let pagetitle = $('#search').val(),
        category = $('.search-logo').attr('data-category'),
        categoryId = parseInt($('.search-logo').attr('data-id')),
        isFolder = $('.search-logo').attr('data-isfolder');

    $('.filters, .filters-body').hide();

    if (parseInt(isFolder) == 0) isFolder = false;
    else isFolder = true;

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
            } else if (categoryId == 0)
                GetTopObjects();
            else OnCategorySearch(category, categoryId, isFolder, '');
        }, 1000);
    }
}

//Переключение языка на сайте(раньше было без перезагрузки страницы, но из-за сторонних сервисов чата приходится перезагружать, хотя нужно в поддержке битрикса узнать, может можно менять язык чата динамически, в предидущем сервисе это было невозможно)
function OnLanguageChange() {
    var $this = $(this),
	    hashNow = window.location.hash;
    contextKey = $this.data('key');
    window.location.hash = hashNow.replace(hashNow.substr(-7,7), 'lang=' + contextKey);
    setTimeout( () => window.location.reload(true), 0);
}
