//Ajax загрузка родительских категорий
function GetParentCategories() {
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
//Ajax получение фильтра городов на карте(в разделе недвижимости)
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
//Ajax загрузка топ объектов
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
//Ajax загрузка объектов по фильтру(раздел недвижимости)
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
//Ajax загрузка горячих предложений недвижимости
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
//Ajax загрузка категорий
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
//Ajax подгрузчик обектов(Изначально загружается 10 объектов при пролистывании запускается эта функция и подгружаются еще 10 объектов ну или сколько есть)
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
//Ajax поиск на сайте
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
//Ajax загрузка панораммы на сайт
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
//Ajax загрузка случайной панорамы по id категории
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
//Ajax загрузка и открытие окна информации о компании
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
//Ajax загрузка новостей объекта
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

//Ajax загрузка информации об объекте
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
//Ajax загрузка контента объекта(например открытие окна с новостью)
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
//Ajax загрузка и открытие окна help
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




//Функция по завершению ajax загрузки
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