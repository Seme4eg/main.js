$(document).on('click', '#fullScreen-btn', fullScreen);
$(document).on('click', '#hotspots-btn', hotspotsHideShow);
$(document).on('click', '#giroscope-btn', giroscopeOnOff);
$(document).on('click', '.show-filters', OnShowFilters);
$(document).on('click', '.video-modal-close-btn', OnCloseVideoModal);
$(document).on('click', '.help-content-close-btn', OnCloseVideoModal);
$(document).on('click', '.inner-content-close-btn', OnCloseInnerModal);
$(document).on('click', '.about-object-close-btn', OnCloseAboutObjectModal);
$(document).on('click', '.close-modal-btn', OnCloseModal);
$(document).on('click', '#category-control-share-btns a', OnCloseCategoryShareBtns);



// buttons

//Кнопка на весь экран
function fullScreen() {
    var panoWindow = document.getElementById('krpanoSWFObject');
    if (this.classList.contains('full-screen')) {
        panoWindow.set('fullscreen', false);
        this.classList.remove('full-screen');
        $('.logo').css('z-index', 10000);
    } else {
        panoWindow.set('fullscreen', true);
        this.classList.add('full-screen');
        $('.logo').css('z-index', 10000000000);
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

//Показать фильтр в разделе недвижимости
function OnShowFilters() {
    $('.scroll-wrapper.site-search-results, .show-filters, .search-panel-footer, .sisea-search-form').hide();
    $('.search-panel-header').hide();
    $('.hide-filters, .filters-body, .filters').show();
    $('.filters-body').addClass('active');
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

//Скрытие кнопок шаринга в категориях(можно будет объединить с предидущей)
function OnCloseCategoryShareBtns() {
    if ($("#category-share-btn").hasClass('open')) {
        $("#category-share-btn").removeClass('open');
        $("#category-control-share-btns").animate({
            height: '0px'
        }, 500).hide('500');
    }
}












//Отключение плеера на сайте --- не используется
function stopPlayer() {
    var player = document.getElementById('audio-player');
    var playerBtn = $('.stop-play');
    if (playerBtn.hasClass('active')) {
        playerBtn.removeClass('active').css('background-image', 'url(/assets/images/play_music_icon.svg)');
        player.pause();
    }
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

//Кнопка Главной панораммы тура либо родительского тура
function goHome() {
    var panoWindow = document.getElementById('krpanoSWFObject'),
        parentLink = $('#home-btn').attr('data-link'),
        scene = panoWindow.get("xml.scene"),
        sphere = getUrlVars()["s"];

    parseInt(parentLink) == 0 ? panoWindowCall()
        : !sphere ? panoWindowCall()
            : parseInt(scene.replace(/\D+/g, "")) == parseInt(sphere.replace(/\D+/g, "")) 
                ? window.location.hash = parentLink : panoWindowCall();
}

//Кнопка назад(пока вроде не используется, но пригодится)
function goBack() {
    var panoWindow = document.getElementById('krpanoSWFObject'),
        scene = panoWindow.get("xml.scene"),
        sphere = getUrlVars()["s"];

    !sphere ? panoWindowCall()
        : parseInt(scene.replace(/\D+/g, "")) == parseInt(sphere.replace(/\D+/g, "")) ?
            history.back() : panoWindowCall()
}

//Кнопка информации об объекте
$(document).on('click', '#about-object-btn', function(e){e.stopPropagation();getAboutObjectInfo(false);clearTimeout(timeout);});



// --- additional functions ---

function panoWindowCall() {
    let panoWindow = document.getElementById('krpanoSWFObject');
    panoWindow.call('startup');
    panoWindow.call('stopallsounds');
}