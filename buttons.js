//Отключение плеера на сайте
function stopPlayer() {
    var player = document.getElementById('audio-player');
    var playerBtn = $('.stop-play');
    if (playerBtn.hasClass('active')) {
        playerBtn.removeClass('active').css('background-image', 'url(/assets/images/play_music_icon.svg)');
        player.pause();
    }
}

//Показать фильтр в разделе недвижимости
function OnShowFilters() {
    $('.scroll-wrapper.site-search-results, .show-filters, .search-panel-footer, .sisea-search-form').hide();
    $('.search-panel-header').hide();
    $('.hide-filters, .filters-body, .filters').show();
    $('.filters-body').addClass('active');
}

//Добавление кнопки День/Ночь, Зима/Лето с нужным переводом (не совсем правильно работает если нет этой кнопки в панораме, нужно делать проверку наличия данной кнопки)
function addDayNight(img, display) {
	var imgName = img.replace('indexdata/graphics/compunics-daynight/', '').replace('.png', '');
	var lang = getUrlVars()['lang'] || 'en';
	$('#day-night-btn span').remove();
    $('#day-night-btn').css({
        "background-image": "url('" + img.replace('indexdata', 'assets').replace('png', 'svg') + "')",
        "display": display
    });
	if(imgName == 'nav_up_with_bad')
		$('#day-night-btn').append('<span>' + translation.No_Furniture(lang) + '</span>');
	else if(imgName == 'nav_up_no_bad')
		$('#day-night-btn').append('<span>' + translation.Furniture(lang) + '</span>');
	else if(imgName == 'nav_up_day')
		$('#day-night-btn').append('<span>' + translation.Night_Mode(lang) + '</span>');
	else if(imgName == 'nav_up_night')
		$('#day-night-btn').append('<span>' + translation.Day_Mode(lang) + '</span>');
	else if(imgName == 'nav_up_land')
		$('#day-night-btn').append('<span>' + translation.D_Model(lang) + '</span>');
	else if(imgName == 'nav_up_3d')
		$('#day-night-btn').append('<span>' + translation.No_D_Model(lang) + '</span>');
}






// buttons

//Кнопка на весь экран
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
//Кнопка Гироскопа
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
//Кнопка Скрытия/Показа пинов на сайте
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
//Кнопка Главной панораммы тура либо родительского тура
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
//Кнопка назад(пока вроде не используется, но пригодится)
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

//Скрытие кнопок шаринга в категориях(можно будет объединить с предидущей)
function OnCloseCategoryShareBtns() {
    if ($("#category-share-btn").hasClass('open')) {
        $("#category-share-btn").removeClass('open');
        $("#category-control-share-btns").animate({
            height: '0px'
        }, 500).hide('500');
    }
}

//Кнопка информации об объекте
$(document).on('click', '#about-object-btn', function(e){e.stopPropagation();getAboutObjectInfo(false);clearTimeout(timeout);});






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