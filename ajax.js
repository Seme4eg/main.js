// --- refactored ones ---

// загрузка родительских категорий
function GetParentCategories() {

    setAttributes(document.querySelector('.search-logo'), { 'data-categoryid': 0, 'data-isfolder': 1 });
    
    if (document.querySelector('.parent-category'))
        document.querySelector('.parent-category').remove();
    document.querySelectorAll('.filters, .filters-body').forEach(node => 
        node.style.display = 'none');
    document.querySelector('.filters-body').classList.remove('active');

    let searchResults = document.querySelector('#main-categories .category-list'),
        cultureKey = getUrlVars()["lang"] || 'en',
        url = `https://thai.hub360.info/api/get-parent-categories?lang=${cultureKey}&rand=${getRandom()}`;

    searchResults.innerHTML = preloader;

    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let items = data.items;

            searchResults.innerHTML = 
                `<li><a href="https://hub360.info">
                    <span style="background-image: url(/assets/images/logo360.svg);"></span>
                    <p>HUB360</p>
                </a></li>`
            
            for (const item of items) {
                searchResults.innerHTML += 
                    `<li class="${item.catClass}">
                        <a data-id="${item.itemId}" data-search-id="${item.searchId}" title="${item.title}">
                            <svg version="1.1" id="Layer_2" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:${item.borderColor};" 
                                xml:space="preserve">
                                    <polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>
                                    <g>
                                        <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3
                                            C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>
                                    </g>
                                    <g>
                                        <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>
                                        <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z
                                            M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>
                                    </g>
                            </svg>
                            <span>
                                <i style="background-image: url(${item.icon});"></i>
                            </span>
                            <p>${item.title}</p>
                        </a>
                    </li>`
            }

        })
        .then(() => fetchComplete())
        .catch (error => {
            console.log('Request failed', error);
        });
}


// получение фильтра городов на карте(в разделе недвижимости)
function GetFilterMap() {
    let cultureKey = getUrlVars()["lang"] || 'en';
    
    let rentType = document.querySelector('.radio-btns .select-list input:checked') ?
        parseInt(document.querySelector('.radio-btns .select-list input:checked').value)
        : NaN;
        
    let type = parseInt(document.querySelector('.radio-btns input[name="type"]:checked').value);

    let map = document.querySelector('.map');
    map.innerHTML += preloader;

    let districtsContainer = map.querySelector('.districts'),
        points = map.querySelector('.district-points');

    let data = {
        type: type,
        rentType: rentType,
        categoryId: document.querySelector('#type-select .select-active').getAttribute('data-categoryid'),
        rand: getRandom()
    };

    let url = `https://thai.hub360.info/api/get-filter-map?lang=${cultureKey}${getUrlString(data)}`;

    // getting data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            districtsContainer.innerHTML = '';
            points.innerHTML = '';

            districtsContainer.innerHTML = data.districts.reduceRight((acc, obj) => {
                return acc += `<p id="${obj.alias}-district">
                                    <label>
                                        <input name="${obj.alias}" type="checkbox" value="${obj.value}">
                                        <span>${obj.count}</span>${obj.title}
                                    </label>
                                </p>`
            }, '');

            points.innerHTML = data.districtPoints.reduceRight((acc, obj) => {
                return acc += 
                    `<li id="${obj.alias}-point" data-district="${obj.alias}-district" style="display: none;"><a></a></li>`;
            }, '');

            map.querySelector('svg').remove();
            
        })
        .then(() => fetchComplete())
        .catch (error => console.log('Request failed', error));  
}

// загрузка топ объектов
function GetTopObjects() {

    if (!isMobile.any()) {
        document.querySelector('.search-panel-header').style.display = '';
        document.querySelector('.search-panel-body').style.top = '150px';
    }

    setAttributes(
        document.querySelector('.search-logo'),
        { 'data-id': 0, 'data-isfolder': 1, 'data-category': 0 }
    )
    
    // document.querySelector('.parent-category').remove(); -- element does not exist
    document.querySelectorAll('.absolute, .filters, .filters-body').forEach(node =>
        node.style.display = 'none');
    document.querySelector('.filters-body').classList.remove('active'); // test
    
    let searchResults = document.querySelector('.site-search-results .search-content'),
        cultureKey = getUrlVars()['lang'] || 'en';
    
    let url = `https://thai.hub360.info/api/get-top-objects?lang=${cultureKey}&rand=${getRandom()}`;

    searchResults.innerHTML = preloader;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let items = data.items;

            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            document.getElementById('search').setAttribute('placeholder', translation.Search(cultureKey));
            document.querySelector('.back').setAttribute('data-id', 0);
            document.querySelector('.back').setAttribute('data-search-id', 0);
            setAttributes(document.querySelector('.back'),
                {'data-id': 0, 'data-search-id': 0})

            // adding 'container' element:
            let container = document.createElement('div');
            container.className = 'category-list';

            for (const item of items) {
                let obj = {
                    1: {
                        class: '<div class="rent"></div>',
                        paragraph: `<p class="object-price">
                                        ${priceToString(item.priceRentMonthly)} 
                                        <i><b>${getPricesAndSymbol()}</b></i>
                                        <text> monthly+</text>
                                    </p>`
                    },
                    2: {
                        class: '<div class="sale"></div>',
                        paragraph: `<p class="object-price">${priceToString(item.priceSale)} 
                                        <b>${getPricesAndSymbol()}</b>
                                    </p>`
                    },
                    3: {
                        class: '<div class="sale-rent"></div>',
                        paragraph: `<p class="second-object-price">
                                        <i>Rent: </i>
                                        ${priceToString(item.priceRentMonthly)} 
                                        <b>${getPricesAndSymbol()}</b>
                                    </p>
                                    <p class="object-price">
                                        <i>Sale: </i>${priceToString(item.priceSale)} 
                                        <b>${getPricesAndSymbol()}</b>
                                    </p>`
                    }
                }
                
                container.innerHTML += obj[item.type] ? 
                    `<div class="sisea-result estate search offset">
                        <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                           title="${item.title}" 
                           style="background-image: url(${item.squareImg}?${randomHash});" 
                           class="object" 
                           data-id="${item.itemId}">
                                ${($.cookie('object_' + item.itemId) ? 
                                    (obj[item.type] ? obj[item.type].class : '')
                                    : '<div class="new"></div>')}
                           <div class="object-id">Id: ${item.itemId}</div>
                           <p>${item.title}</p>
                           ${(item.sold == 'true' ? '<div class="sold"></div>' : '')}
                        </a>
                        <div class="object-description">
                            <p class="card-object-location"><i></i>${item.location}</p>
                            <p class="card-object-category"><i></i>${item.category}</p>
                            ${(item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>')}
                            <p class="card-area">
                                ${item.area} 
                                <span>sq. m.</span>
                            </p>
                            ${(item.sold == 'true' ? '<p class="object-price">Sold</p>' 
                                : obj[item.type] ? obj[item.type].paragraph : '')}
                        </div>
                    </div>`
                    : `<div class="sisea-result slide offset">
                          <a ${(item.objectLink.length < 10 ? `href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}"` 
                                : 'href="' + item.objectLink + '" target="_blank"')}
                             title="${item.title}" 
                             style="background-image: url(${item.image});" 
                             class="object" data-id="${item.itemId}">
                                ${($.cookie('object_' + item.itemId) ? 
                                    (obj[item.type] ? obj[item.type].class : '')
                                    : '<div class="new"></div>') + 
                                (obj[item.type] ? '<p>' + item.titleWithCategory + '</p>' : '<p class="big-title">' + item.titleWithLocation + '</p>') + 
                                (item.sold == 'true' ? '<div class="sold"></div>' : '') + '</a>' + 
                                (item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '')} 
                      </div>`;

                $.cookie('object_' + item.itemId, true, {
                    expires: 300,
                    path: '/'
                });

                searchResults.appendChild(container);

                searchResults.style.display = ''; // сдесь была fadeIn(500), можно прописать анимацию на JS
            }
        })
        .then(() => fetchComplete())
        .catch (error => {
            console.log('Request failed', error);
        });

}

//Ajax загрузка объектов по фильтру(раздел недвижимости)
function OnFilterSearch() {
    isLoaded = true;

    document.querySelectorAll('.filters-body, .hide-filters, .search-panel-header').forEach(node => 
        node.style.display = 'none');
    document.querySelector('.filters-body').classList.remove('active');
    document.querySelector('.search-logo').setAttribute('data-isfilter', 1);
    document.querySelectorAll('.scroll-wrapper.site-search-results, .show-filters, .sisea-search-form, .search-panel-footer')
        .forEach(node => node.style.display = '');
    
    let districts = getDistrictArray();
    let rentType = document.querySelector('.radio-btns .select-list input:checked') ?
        parseInt(document.querySelector('.radio-btns .select-list input:checked').value)
        : NaN;
    var categoryId = document.querySelector('#type-select .select-active').getAttribute('data-categoryId');
    var type = document.querySelector('.radio-btns input[name="type"]:checked').value;
    
    // document.querySelector('.parent-category').remove(); // node not exist..
    
    var searchResults = document.querySelector('.site-search-results .search-content');
    var cultureKey = getUrlVars()["lang"] || 'en';

    let data = {
        categoryId: categoryId,
        type: type,
        rentType: rentType,
        currency: document.querySelector('#currency-select .select-active').getAttribute('data-currency'),
        bedroomsMin: $("#slider-beds").slider("values", 0),
        bedroomsMax: $("#slider-beds").slider("values", 1),
        rand: getRandom()
    }

    let url = `https://thai.hub360.info/api/get-real-estate-objects?lang=${cultureKey}${getUrlString(data)}`;

    searchResults.innerHTML = preloader;

    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let [items, parentId, count] = [data.items, data.parentId, 1];
            let priceNowMin = parseInt($("#slider-range").slider("values", 0));
            let priceNowMax = parseInt($("#slider-range").slider("values", 1));
            
            searchResults.innerHTML = ''; // может убрать прелоадер в конце?

            document.getElementById('search').setAttribute('placeholder', translation.Search(cultureKey));
            setAttributes(document.querySelector('.back'), {'data-id': parentId, 'data-search-id': parentId});
            document.querySelector('.absolute').style.display = 'none';

            let container = document.createElement('div');
            container.className = 'category-list'; // don't forget to append to 'searchresults'

            if (type == 1) {
                container.innerHTML = items.reduce((acc, item) => {
                    let [a, b] = [parseInt(item.priceRentDaily), parseInt(item.priceRentMonthly)];
                    
                    $.cookie('object_' + item.itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                    
                    if (rentType == 1 && categoryId != '327-land') {
                        if (a >= priceNowMin && a <= priceNowMax && a != 0 && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                            count++;

                            return acc += `<div class="sisea-result estate offset">
                                    <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                                        title="${item.title}" style="background-image: url(${item.squareImg}?${randomHash});" 
                                        class="object" data-id="${item.itemId}">
                                            ${($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + 
                                                (item.type == 3 ? '<div class="sale-rent"></div>' : '') 
                                                    : '<div class="new"></div>')}
                                            <div class="object-id">Id: ${item.itemId}</div><p>${item.title}</p>
                                    </a>
                                    <div class="object-description">
                                        <p class="card-object-location"><i></i>${item.location}</p>
                                        <p class="card-object-category"><i></i>${item.category}</p>
                                        ${(item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '')}
                                        <p class="card-area">${item.area} <span>sq. m.</span></p>
                                        <p class="object-sea-view">${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                                        ${(item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + 
                                        (item.type == 3 ? 
                                            `<p class="second-object-price"><i>Rent: </i>
                                                ${priceToString(item.priceRentDaily)} 
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>
                                            <p class="object-price"><i>Sale: </i>
                                                ${priceToString(item.priceSale)} 
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>` 
                                                : `<p class="object-price">${priceToString(item.priceRentDaily)} <b>${getPricesAndSymbol()}</b></p>`)}
                                    </div>
                                    <div class="contact-object-btn">
                                        <img src="/assets/images/object_contact_icon.svg"/><span>${translation.Contact(cultureKey)}</span>
                                    </div>
                                    <div class="favorite-object-btn">
                                        <img src="/assets/images/favorites_icon.svg"/><span>${translation.Favorites(cultureKey)}</span>
                                    </div>
                                </div>`;
                        }
                    } else if (b >= priceNowMin && b <= priceNowMax && b != 0 && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                        count++;

                        return acc += `<div class="sisea-result estate offset">
                                <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                                    title="${item.title}" style="background-image: url(${item.squareImg}?${randomHash});" 
                                    class="object" data-id="${item.itemId}">
                                        ${($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + 
                                            (item.type == 3 ? '<div class="sale-rent"></div>' : '') 
                                                : '<div class="new"></div>')}
                                        <div class="object-id">Id: ${item.itemId}</div><p>${item.title}</p>
                                </a>
                                <div class="object-description">
                                    <p class="card-object-location"><i></i>${item.location}</p>
                                    <p class="card-object-category"><i></i>${item.category}</p>
                                    ${(item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '')}
                                    <p class="card-area">${item.area} <span>sq. m.</span></p>
                                    <p class="object-sea-view">
                                        ${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                                        ${(item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + 
                                        (item.type == 3 ? `<p class="second-object-price"><i>Rent: </i>
                                                ${priceToString(item.priceRentMonthly)} 
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>
                                            <p class="object-price"><i>Sale: </i>
                                                ${priceToString(item.priceSale)}
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>` 
                                                : `<p class="object-price">${priceToString(item.priceRentMonthly)} <b>${getPricesAndSymbol()}</b><text> monthly+</text></p>`)}
                                </div>
                                <div class="contact-object-btn">
                                    <img src="/assets/images/object_contact_icon.svg"/><span>${translation.Contact(cultureKey)}</span>
                                </div>
                                <div class="favorite-object-btn">
                                    <img src="/assets/images/favorites_icon.svg"/><span>${translation.Favorites(cultureKey)}</span>
                                </div>
                            </div>`
                    }

                    return acc;

                }, '');
            } else {
                container.innerHTML = items.reduce((acc, item) => {
                    let a = parseInt(item.priceSale);

                    if ((a >= priceNowMin) && (a <= priceNowMax) && (count <= 10) && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                        count++;

                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });

                        return acc += `<div class="sisea-result estate offset">
                                <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                                    title="${item.title}" style="background-image: url(${item.squareImg}?${randomHash});" 
                                    class="object" data-id="${item.itemId}">
                                        ${($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + 
                                            (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>')}
                                        <div class="object-id">Id: ${item.itemId}</div><p>${item.title}</p>
                                </a>
                                <div class="object-description">
                                    <p class="card-object-location"><i></i>${item.location}</p>
                                    <p class="card-object-category"><i></i>${item.category}</p>
                                        ${(item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '')}
                                        <p class="card-area">${item.area} <span>sq. m.</span></p>
                                        <p class="object-sea-view">${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                                        ${(item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + 
                                        (item.type == 3 ? `<p class="second-object-price"><i>Rent: </i>
                                                ${priceToString(item.priceRentMonthly)} 
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>
                                            <p class="object-price"><i>Sale: </i>
                                                ${priceToString(item.priceSale)} 
                                                <b>${getPricesAndSymbol()}</b>
                                            </p>` 
                                        : `<p class="object-price">${priceToString(item.priceSale)} <b>${getPricesAndSymbol()}</b></p>`)}
                                </div>
                                <div class="contact-object-btn">
                                    <img src="/assets/images/object_contact_icon.svg"/><span>${translation.Contact(cultureKey)}</span>
                                </div>
                                <div class="favorite-object-btn">
                                    <img src="/assets/images/favorites_icon.svg"/><span>${translation.Favorites(cultureKey)}</span>
                                </div>
                            </div>`
                    }

                    return acc;
                }, '');
            }

            searchResults.appendChild(container);
            searchResults.style.display = '';
            
        })
        .then(() => fetchComplete())
}


// загрузка горячих предложений недвижимости
function GetHotRealEstates() {
    var searchResults = document.querySelector('.site-search-results .search-content');
    var cultureKey = getUrlVars()["lang"] || 'en';

    document.querySelector('.search-logo').innerHTML = '';
    document.querySelectorAll('.filters, .show-filters, .absolute').forEach(node => 
        node.style.display = '');
    document.querySelectorAll('.search-panel-header, .main-categories, .search-time').forEach(node => 
        node.style.display = 'none');
    document.getElementById('search-input').classList.add('filter-search');


    $('#site-search-results').parent('div').addClass('estate-content'); // ???

    // document.querySelector('.parent-category').remove(); // node not exist
    if (!isMobile.any())
        $('.search-panel-body').css('top', '90px');
        
    let data = {
        currency: document.querySelector('#currency-select .select-active').getAttribute('data-currency'),
        rand: getRandom()
    };

    let url = `https://thai.hub360.info/api/get-hots-real-estates?lang=${cultureKey}${getUrlString(data)}`

    searchResults.innerHTML = preloader;    

    fetch(url)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';

            let searchLogo = document.querySelector('.search-logo');
            
            searchLogo.innerHTML +=
                `<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill: rgba(255,0,0, 1);" xml:space="preserve">
                        <polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>
                        <g>
                            <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3
                                C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>
                        </g>
                        <g>
                            <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>
                            <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z
                                M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>
                        </g>
                </svg>
                <i style="background-image: url(/assets/images/category-icons/R_Panel_Icon_Real_Estate.svg);"></i>`;
            
            searchLogo.style.backgroundImage = '';
            setAttributes(searchLogo, {
                'data-id': 35,
                'data-category': '35-real-estate',
                'data-description': data.parentDescription,
                'data-url': data.parentUrl,
                'data-image': data.parentImage,
                'data-isfolder': 0
            });

            document.getElementById('search').setAttribute('placeholder', translation.Search(cultureKey));
            setAttributes(document.querySelector('.back'), 
                { 'data-id': data.parentId, 'data-search-id': data.parentId });

            let container = document.createElement('div');
            container.className = 'category-list';
            container.innerHTML = data.hots.reduce((acc, item) => {
                let obj = buildDOMObj(item, {'cultureKey': cultureKey});

                $.cookie('object_' + item.itemId, true, {
                    expires: 300,
                    path: '/'
                });
                
                return acc += `<div class="sisea-result estate">
                        <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                            title="${item.title}" style="background-image: url(${item.squareImg}?${randomHash});" 
                            class="object" data-id="${item.itemId}">
                                ${($.cookie('object_' + item.id) ? 
                                    (obj[item.type] ? obj[item.type].divRent : '')
                                    : '<div class="new"></div>')}
                                    <div class="object-id">Id: ${item.itemId}</div>
                                    <p>${item.title}</p>
                                    ${(item.sold == 'true' ? '<div class="sold"></div>' : '')}
                        </a>
                        <div class="object-description">
                            <p class="card-object-location"><i></i>${item.location}</p>
                            <p class="card-object-category"><i></i>${item.category}</p>
                            ${(item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>')}
                            <p class="card-area">${item.area} 
                            <span>sq. m.</span></p>
                            <p class="object-sea-view">${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                            ${(item.pool == 0 ? '' : '<p class="card-pool">' + 
                                (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>') + 
                            (item.sold == 'true' ? '<p class="object-price">Sold</p>' 
                                : (item.type == 1 ? `${obj[item.type].pPrice}<text> monthly+</text></p>` 
                                    : (obj[item.type] ? obj[item.type].pPrice : '')))}
                        </div>
                        <div class="contact-object-btn">
                            <img src="/assets/images/object_contact_icon.svg"/>
                            <span>${translation.Contact(cultureKey)}</span>
                        </div>
                        <div class="favorite-object-btn">
                            <img src="/assets/images/favorites_icon.svg"/>
                            <span>${translation.Favorites(cultureKey)}</span>
                        </div>
                    </div>`;
                    
            }, '');

            searchResults.appendChild(container);
            searchResults.style.display = '';

        })
        .then(() => fetchComplete())
}

// поиск на сайте
function OnAjaxSearch(title, OnLoaded, count, exclude) {
    
    if (document.querySelector('.parent-category'))
        document.querySelector('.parent-category').remove();
    
    let searchResults = document.querySelector('.site-search-results .search-content'),
        cultureKey = getUrlVars()["lang"] || 'en',
        categoryId = getElAttr('.search-logo', 'data-category'),
        currency = getElAttr('#currency-select .select-active', 'data-currency');

    let data = {
        title: title,
        offset: count,
        exclude: exclude,
        categoryId: categoryId,
        currency: currency,
        rand: getRandom()
    }

    let url = `https://thai.hub360.info/api/ajax-search?lang=${cultureKey}${getUrlString(data)}`;

    searchResults.innerHTML = OnLoaded ? searchResults.innerHTML + smallPreloader
                                : preloader;

    // fetching data
    fetch(url)
        .then(response => response.json())
        .then(items => {
            if (!OnLoaded) {
                searchResults.style.display = 'none';
                searchResults.innerHTML = '';
            }

            document.querySelectorAll('#smallLoader, #loader').forEach(node => 
                node.parentElement.removeChild(node));

            document.querySelector('.back').setAttribute('data-id', 1220);
            document.querySelector('.back').setAttribute('data-search-id', 1220);

            let container = searchResults.querySelector('.category-list');

            if (!OnLoaded) {
                container = document.createElement('div');
                container.className = 'category-list';
                searchResults.appendChild(container);
            }

            for (const item of items) {

                let obj = buildDOMObj(item, {'cultureKey': cultureKey}); // =============================

                let firstRepeatable = `<a href="#!p=${item.id}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                                title="${item.pagetitle}" 
                                style="background-image: url(${item.square_img}?${randomHash});" 
                                class="object" data-id="${item.id}">
                                ${($.cookie('object_' + item.id) ? 
                                    (obj[item.typeRealEstate] ? obj[item.typeRealEstate].divRent : '')
                                    : '<div class="new"></div>')}
                                <div class="object-id">Id: ${item.id}</div> 
                                <p>${item.pagetitle}</p>`,
                    secondRepeatable = `</a>
                            <div class="object-description">
                                <p class="card-object-location"><i></i>${item.districtTitle}</p>
                                <p class="card-object-category"><i></i>${item.categoryTitle}</p>
                                ${(item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>')}
                                <p class="card-area">${item.area} <span>sq. m.</span></p>`;
                
                let categorySvgBorder = 
                    `<svg version="1.1" 
                        id="Layer_2" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" 
                        style="enable-background:new 0 0 60 60; fill:rgba(255,222,0, 1);" 
                        xml:space="preserve">
                            <polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "></polyline>
                            <g>
                                <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"></path>
                            </g>
                            <g>
                                <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"></path>
                                <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8zM2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"></path>
                            </g>&nbsp;
                     </svg>`;

                container.innerHTML += item.template == 4 ?
                    `<div class="sisea-result slide offset ${item.catClass}">
                        <a data-id="${item.id}" data-search-id="${item.id}-${item.alias}" 
                        title="${item.pagetitle}" class="search-category" 
                        style="background-image: url(${item.image}?${randomHash});">
                            <p><i class="category-icon" 
                                style="background-image: url(/${item.icon});">
                            </i>${categorySvgBorder + item.longtitle}
                            </p>
                        </a>
                    </div>`

                    : categoryId == '35-real-estate' ? 
                        `<div class="sisea-result estate offset">
                            ${firstRepeatable}
                            ${secondRepeatable}

                                <p class="object-sea-view">${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                                ${(item.pool == 0 ? '' : '<p class="card-pool">' + 
                                    (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>')}
                                ${item.sold == 'true' ? '<p class="object-price">Sold</p>' 
                                    : (obj[item.typeRealEstate] ? obj[item.typeRealEstate].pPrice : '')}
                            </div>
                            <div class="contact-object-btn">
                                <img src="/assets/images/object_contact_icon.svg"/>
                                <span>${translation.Contact(cultureKey)}</span>
                            </div>
                            <div class="favorite-object-btn">
                                <img src="/assets/images/favorites_icon.svg"/>
                                <span>${translation.Favorites(cultureKey)}</span>
                            </div>
                        </div>`
                    
                    : (obj[item.typeRealEstate]) ?
                        `<div class="sisea-result estate search offset">
                            ${firstRepeatable}
                                ${(item.sold == 'true' ? '<div class="sold"></div>' : '')}
                            ${secondRepeatable}
                                ${item.sold == 'true' ? '<p class="object-price">Sold</p>' 
                                    : (obj[item.typeRealEstate] ? obj[item.typeRealEstate].pPrice : '')}
                            </div>
                        </div>`
                    
                    : `<div class="sisea-result slide offset">
                            <a href="#!p=${item.id}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                            title="${item.pagetitle}" 
                            style="background-image: url(${item.img}?${randomHash});" 
                            class="object" data-id="${item.id}">
                                    ${($.cookie('object_' + item.id) ? '' : '<div class="new"></div>')}
                                    <p>
                                        <span class="title-district">${item.districtTitle}</span> 
                                        ${item.pagetitle + (item.longtitletwo.length > 3 ? '<br>' + item.longtitletwo : '')}
                                    </p>
                            </a>
                        </div>`;
            }

            isLoaded = items.length >= 10 ? true : false;

            // searchResults.fadeIn('500');
            searchResults.style.display = '';
            
        })
        .then(() => fetchComplete())
}

//Ajax загрузка панораммы на сайт
function getPano(itemId) {
    panoIsLoad = false;
    
    clearTimeout(videoTimeOut);
    
    // $('#day-night-btn div').remove().hide();
    document.querySelectorAll('#day-night-btn div, #video-object-btn div, #about-object-btn div, .sample-info').forEach(node => 
        node.remove());
    // node doesn't exist:
    // document.querySelector('#day-night-btn div').style.display = 'none';
    
    let panoContainer = document.getElementById('tourDIV'),
        videoContainer = document.querySelector('.video-modal-content'),
        panoLocation = document.getElementById('panoLocation');
    
    let cultureKey = getUrlVars()["lang"] || 'en';
    let data = {
        cultureKey: cultureKey,
        itemId: itemId,
        rand: getRandom()
    }

    let url = `https://thai.hub360.info/api/get-object?lang=${cultureKey}${getUrlString(data)}`;

    // fetching data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            panoVrXml = data.panoUrl + 'indexdata/index_vr.xml';
            panoXml = data.panoUrl + 'indexdata/index_' + cultureKey + '.xml';

            var player = document.querySelector('.audio-player .play-list'),
                audioLink = data.audioLink,
                mainPanoLink = parseInt(data.mainPanoLink) == 0 ? data.mainPanoLink : data.mainPanoLink + '&lang=' + cultureKey;
                
            document.getElementById('search-panel').setAttribute('data-place-id', data.placeId);
            
            if (audioLink != musicLink){
                musicLink = audioLink;
                player.innerHTML = '';
                data.audioFiles.split(',').forEach(item => {
                    player.innerHTML += `<li data-link="${item}"></li>`;
                });

                let stopPlay = document.getElementById('stop-play');
                stopPlay.className += ' first-click';
                if (stopPlay.classList.contains('active')) {
                    // check for working
                    stopPlay.click();
                    setTimeout(() => stopPlay.click(), 2000);
                }
            }
            if (data.published == 0)
                window.location.hash = '#!p=26-phuket&s=pano12&lang=' + cultureKey;
            else {
                if (firstLoad || $.cookie('video_' + data.id) || parseInt(data.video) == 0) {}
				else{
					videoTimeOut = setTimeout(() => {
                        document.getElementById('video-object-btn').innerHTML +=
                            `<div class="animation-border"></div>
                            <div class="animation-background"></div>
                            <div class="btn-animation"></div>`;
                    }, 10000);
				}
                if ((!firstLoad) && (!$.cookie('object_info'))) {
                    document.getElementById('about-object-btn').innerHTML +=
                        `<div class="animation-border"></div>
                        <div class="animation-background"></div>
                        <div class="btn-animation"></div>`
                }
                if (!$.cookie('day_night_' + itemId)) {
                    document.getElementById('day-night-btn').innerHTML +=
                        `<div class="animation-border"></div>
                        <div class="animation-background"></div>
                        <div class="btn-animation"></div>`;
                }
                if (!$.cookie('object_' + itemId)) {
                    $.cookie('object_' + itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                }
                document.querySelectorAll('.search-logo, .logo').forEach(node => {
                    node.setAttribute('href', `${data.parentPoint}&lang=${cultureKey}`);
                })
                // check this for quselectoring
                document.querySelectorAll("meta[name='description'], meta[property='og:description']").forEach(node => 
                    node.setAttribute('content', data.description));
                document.querySelector("meta[name='keywords']").setAttribute('content', data.keywords);
                document.querySelectorAll("meta[property='og:image'], meta[property='og:image:secure_url'], meta[name='twitter:image']")
                    .forEach(node => 
                        node.setAttribute('content', data.image));
                document.querySelector("link[rel='image_src']").setAttribute('href', data.image);
                document.querySelector("link[rel='alternate']").setAttribute('hreflang', cultureKey);
                document.querySelector("link[rel='alternate']").setAttribute('href', window.location.href);
                document.querySelector("meta[property='og:url']").setAttribute('content', window.location.href);
                document.getElementById('home-btn').setAttribute('data-link', mainPanoLink);

                isVRModeRequested() ? accessWebVr() 
                    : firstLoad ? accessStdVr() 
                        : OnLoadPano(panoXml, getUrlVars()["s"]);
                
                // port this in future..
                let videoObjBtn = document.getElementById('video-object-btn');
                
                // if ((data.video != null || data.video != '' || data.video != undefined) && data.video)
                data.video ? videoObjBtn.setAttribute('data-code', data.video) : 
                    videoObjBtn.setAttribute('data-code', 0);

                let or = data.template == 3;
                let str = or ? `${data.longtitle}-${siteName}` : data.seoTitle;
                
                document.title = str; // true?
                document.querySelectorAll("meta[name='title'], meta[property='og:title']").forEach(node =>
                    node.setAttribute('content', str));

                panoLocation.innerHTML = or ?
                     `${translation.Thailand(cultureKey)}<br><span>${data.title}</span>` :
                     `${translation.Thailand(cultureKey)}<br><span>${data.location}<br>
                        ${data.longtitle + (data.isRealEstate == true ? ' ID: ' + data.id : '')}</span>`;

                if (data.isSample)
                    document.getElementById('tourDIV').innerHTML += 
                        '<div class="sample-info">' + translation.Sample_Tour(cultureKey) + '</div>'
            }

        })
        .then(() => {
            panoIsLoad = true;
            
            if(!firstLoad){
                // ga - NOT DEFINED
                ga('create', 'UA-90941148-2', 'auto', 'myAnalytics');
                ga('myAnalytics.send', 'pageview', location.pathname + location.search + location.hash);
                ga('myAnalytics.remove');

                if(parseInt(itemId) == 26 && isMobile.AndroidApp()){
                    setTimeout(() => {
                        var krpano = document.getElementById("krpanoSWFObject");
                        krpano.set('hotspot[spotpoint1590].visible', false);
                        krpano.set('hotspot[spotpoint1593].visible', false);
                        krpano.set('hotspot[spotpoint1594].visible', false);
                    }, 500);
                }
            } else firstLoad = false;
            
            // NOT DEFINED
            fbq('track', 'PageView');
            fbq('track','ViewContent',{value:3.50, currency:'USD', content_name: $('title').text()});

            fetchComplete();
        })
}

// загрузка категорий
function OnCategorySearch(category, categoryId, isFolder, title) {

    if (categoryId == 35) GetHotRealEstates();
    else {
        document.querySelector('.search-logo').innerHTML = '';
        document.querySelectorAll('.absolute, .filters, .filters-body').forEach(node => 
            node.style.dysplay = 'none');
        document.querySelector('.filters-body').classList.remove('active');
        
        let searchResults = document.querySelector('.site-search-results .search-content');
        let cultureKey = getUrlVars()["lang"] || 'en';

        let data = {
            parents: category,
            categoryId: categoryId,
            pagetitle: title,
            rand: getRandom()
        }
        let url = (!isFolder) ? `https://thai.hub360.info/api/objects?lang=${cultureKey}${getUrlString(data)}`
            : `https://thai.hub360.info/api/categories?lang=${cultureKey}${getUrlString(data)}`


        searchResults.innerHTML = preloader;
            
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let [items, parentId, parentCategory] = [data.items, data.parentId, data.parentCategory];

                searchResults.innerHTML = '';
                searchResults.style.display = 'none';

                document.getElementById('search').setAttribute('placeholder', translation.Search(cultureKey));

                let baseUrl = (cultureKey == 'en') ? '/' : `/${cultureKey}/`;

                setAttributes(document.querySelector('.back'),
                    {'data-id': parentId, 'data-search-id': parentCategory});

                if (categoryId != 1220)
                    document.querySelector('.absolute').style.dysplay = 'none';
                if (!isMobile.any()) {
                    document.querySelector('.search-panel-header').style.dysplay = '';
                    document.querySelector('.search-panel-body').style.top = '150px';
                }

                if (data.parentId) {
                    let searchLogo = document.querySelector('.search-logo')
                    searchLogo.innerHTML += 
                        `<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:${data.parentBorderColor};" 
                            xml:space="preserve">
                                <polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>
                                <g>
                                    <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3
                                        C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>
                                </g>
                                <g>
                                    <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>
                                    <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z
                                        M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>
                                </g>
                        </svg>
                        <i style="background-image: url(${data.parentIcon});"></i>`;

                    setAttributes(searchLogo, {
                        'data-id': categoryId, 
                        'data-category': category, 
                        'data-description': data.parentDescription, 
                        'data-url': data.parentUrl, 
                        'data-image': data.parentImage
                    });
                    searchLogo.style.backgroundImage = '';

                } else if (!isMobile.any())
                    document.querySelector('.search-panel-body').style.top = '150px';

                if (!isFolder) {
                    setAttributes(document.querySelector('.search-logo'), {'data-categoryid': category, 'data-isfolder': 0})

                    // creating 'container' element
                    var container = document.createElement('div');
                    container.className = 'category-list';

                    // check if data is array
                    container.innerHTML = items.reduce((acc, item) => {
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });

                        return acc += `<div class="sisea-result slide offset">
                            <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}" 
                                title="${item.title}" style="background-image: url(${item.image});" class="object" 
                                data-id="${item.itemId}">
                                    ${($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>')}
                                    <p>${item.titleWithLocation}</p>
                            </a>
                            ${(item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '')}</div>`
                    }, '');
                } else {
                    setAttributes(document.querySelector('.search-logo'), {'data-categoryid': category, 'data-isfolder': 1})

                    // creating 'container' element
                    var container = document.createElement('ul');
                    container.className = 'category-list';

                    container.innerHTML = items.reduce((acc, item) => {
                        return acc += `<li class="${item.catClass}">
                                <a data-id="${item.itemId}" data-search-id="${item.searchId}" title="${item.title}">
                                    <span>
                                        <i style="background-image: url(${(categoryId == 1220 ? item.icon : item.image)});"></i>
                                    </span>
                                    <p>${item.title}</p>
                                </a>
                            </li>`
                    }, '')
                }

                // appending element 'container'
                searchResults.appendChild(container);
                searchResults.style.display = '';
                
            })
            .then(() => fetchComplete())
    }
}

//Ajax загрузка и открытие окна информации о компании
function getAboutInfo(isContacts) {
    // document.getElementById('info-btn').classList.remove('open'); // node does not exist
    OnShowHideControls(true, false);
    var cultureKey = getUrlVars()["lang"] || 'en';
    
    // animation
    $('.about-modal-window').animate({
        left: 0
    }, 500);

    // redact this
    $('.about-modal-window').queue(function() {
        $('.close-modal-btn').fadeIn(500);
        $('.about-modal-window').dequeue();
    });

    // ---

    document.querySelector('.about-content').innerHTML += preloader;

    let url = `https://thai.hub360.info/api/get-about-info?lang=${cultureKey}&rand=${getRandom()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let [pages, news, counter] = [data.pages, data.news, 1];

            document.querySelector('.about-content svg').remove(); // check for existence

            if (!isContacts) {
                document.querySelector('.about-block.block-2 h3').setAttribute('data-count', data.newsCount);

                for (const page of pages) {
                    if (page.alias == 'project-news-i-updates') {
                        document.querySelector(`.about-block.block-${counter} h3`).textContent = page.title;
                        document.querySelector('.block-2 h3').innerHTML += 
                            '<span class="prev-new" data-offset="-3"></span><span class="next-new" data-offset="3"></span>';

                        document.querySelector('.block-2 .about-content-body').innerHTML += news.reduce((acc, itemNew) => {
                            return acc += `<div class="item-new" data-id="${itemNew.itemId}">
                                    <h4>${itemNew.title}</h4>
                                    <div class="new-image" style="background-image: url(${itemNew.imageUrl});"></div>
                                    <p>${itemNew.introtext}</p>
                                </div>`
                        }, '');
                        
                    } else {
                        document.querySelector(`.about-block.block-${counter} h3`).textContent = page.title;
                        document.querySelector(`.about-block.block-${counter} .about-content-body`).innerHTML = page.content;
                        if (counter == 3)
                            document.querySelector('.block-3 .about-content-body').innerHTML += 
                                `<div id="ourLocation">
                                    <iframe class="location-iframe" 
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2stest.thai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" 
                                        frameborder="0" style="border:0">
                                    </iframe>
                                <div>`;
                    }
                    counter++;
                }

                document.querySelector('.about-content').innerHTML += data.privacyPolicy;
                $('.about-content').fadeIn('500'); // animation
                
            } else {
                document.getElementById('about-body').innerHTML += pages.reduce((acc, page) => {
                    return page.alias !== 'we-are-located-at' ? acc : acc += `<div class="our-location">
                            <h3>${page.title}</h3>
                            <div class="about-content-body">${page.content}</div>
                            <div id="ourLocation">
                                <iframe class="location-iframe" 
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2stest.thai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" 
                                    frameborder="0" style="border:0">
                                </iframe>
                            <div>
                        </div>`;
                })
            }
        })
        .then(() => {
            panoIsLoad = false;
            loadMap = true;
            fetchComplete();
        })
}


// загрузка новостей объекта
function OnLoadNews(offset) {
    var cultureKey = getUrlVars()["lang"] || 'en';
    let url = `https://thai.hub360.info/api/loading-news?lang=${cultureKey}&offset=${offset}&rand=${getRandom()}`

    document.querySelector('.about-content').innerHTML += preloader;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.about-block.block-2 .about-content-body').innerHTML = '';
            document.querySelector('.about-content svg').remove();

            for (const itemNew of data) {
            	document.querySelector('.block-2 .about-content-body').innerHTML += `<div class="item-new" data-id="${itemNew.itemId}">
                        <h4>${itemNew.title}</h4>
                        <div class="new-image" style="background-image: url(${itemNew.imageUrl});"></div>
                        <p>${itemNew.introtext}</p>
                    </div>`;
            }

        })
        .then(() => {
            panoIsLoad = false
            fetchComplete()
        });
}

























// ---------------------- ф-ю ниже я НЕ ТЕСТИРОВАЛ - не триггерится ------------------------

// подгрузчик обектов(Изначально загружается 10 объектов при пролистывании запускается эта функция и подгружаются еще 10 объектов ну или сколько есть)
function OnLoadObjects(category, offset) {
    let cultureKey = getUrlVars()["lang"] || 'en',
    searchResults = document.querySelector('.site-search-results .search-content .category-list');
    searchResults.innerHTML += smallPreloader;

    let districts = getDistrictArray(),
        rentType = document.querySelector('.radio-btns .select-list input:checked') ?
        parseInt(document.querySelector('.radio-btns .select-list input:checked').value)
        : NaN;
    let categoryId = document.querySelector('#type-select .select-active').getAttribute('data-categoryId'),
        type = document.querySelector('.radio-btns input[name="type"]:checked').value,
        isFilter = parseInt(document.querySelector('.search-logo').getAttribute('data-isfilter'));
    let exclude = '';
    let url = 'https://thai.hub360.info/api/loading-objects';

    if (category == 35) {
        if (isFilter) {
            url = 'https://thai.hub360.info/api/get-real-estate-objects';
            offset = 0;
            exclude = GetExludeObjects(false);
        } else url = 'https://thai.hub360.info/api/get-all-real-estates';
    }
    if (category == 0) {
        url = 'https://thai.hub360.info/api/get-top-objects';
        offset = 10;
        exclude = GetExludeObjects(false);
    }

    let data = {
        category: category,
        offset: offset,
        categoryId: categoryId,
        type: type,
        rentType: rentType,
        currency: document.querySelector('#currency-select .select-active').getAttribute('data-currency'),
        bedroomsMin: $("#slider-beds").slider("values", 0),
        bedroomsMax: $("#slider-beds").slider("values", 1),
        districts: districts,
        exclude: exclude,
        rand: getRandom()
    }
    url += `?lang=${cultureKey}${getUrlString(data)}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let [items, count, priceNowMin, priceNowMax] = 
            [data.items, 0, $("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1)];

        if (category == 35) {
            if (isFilter) {
                if (type == 1) {
                    for (const item of items) {
                        let [a, b] = [parseInt(item.priceRentDaily), parseInt(item.priceRentMonthly)];
                        let obj = buildDOMObj(item, {'cultureKey': cultureKey});

                        if (rentType == 1 && categoryId != '327-land') {
                            if (a >= priceNowMin && a <= priceNowMax && a != 0 && (districts == 0 || districts.indexOf(item.district) >= 0)) {

                                searchResults.innerHTML += getInnerHTML(buildDOMObj(item, {'cultureKey': cultureKey}), [
                                    ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + 
                                        (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>'),
        
                                    (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : ''),
        
                                    (item.type == 3 ? `<p class="second-object-price"><i>Rent: </i>
                                            ${priceToString(item.priceRentDaily)}
                                            <b>${getPricesAndSymbol()}</b>
                                        </p>
                                        <p class="object-price"><i>Sale: </i>
                                            ${priceToString(item.priceSale)}
                                            <b>${getPricesAndSymbol()}</b>
                                        </p>` : 
                                        `<p class="object-price">
                                            ${priceToString(item.priceRentDaily)}
                                            <b>${getPricesAndSymbol()}</b>
                                        </p>`)
                                ]);
                                count++;
                            }
                        } else if (b >= priceNowMin && b <= priceNowMax && b != 0 && (districts == 0 || districts.indexOf(item.district) >= 0)) {

                            searchResults.innerHTML += getInnerHTML(buildDOMObj(item, {'cultureKey': cultureKey}), [
                                ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + 
                                    (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>'),

                                (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : ''),

                                (item.type == 3 ? obj[3].pPrice : `<p class="object-price">
                                        ${priceToString(item.priceRentMonthly)}
                                        <b>${getPricesAndSymbol()}</b><text> monthly+</text>
                                    </p>`)
                            ])
                            
                            count++;
                        }

                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                        
                    }
                } else {
                    for (const item of items) {
                        let a = parseInt(item.priceSale);

                        if (a >= priceNowMin && a <= priceNowMax && (districts == 0 || districts.indexOf(item.district) >= 0)) {
                            searchResults.innerHTML += getInnerHTML(buildDOMObj(item, {'cultureKey': cultureKey}), [
                                ($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + 
                                    (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>'),

                                (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : ''),

                                (item.type == 3 ? obj[3].pPrice : `<p class="object-price">
                                        ${priceToString(item.priceSale)}
                                        <b>${getPricesAndSymbol()}</b></p>`)
                            ])
                        }
                        count++;
                        
                        $.cookie('object_' + item.itemId, true, {
                            expires: 300,
                            path: '/'
                        });
                    }
                }
            } else {
                for (const item of items) {
                    searchResults.innerHTML += getInnerHTML(buildDOMObj(item, {'cultureKey': cultureKey}), [
                        ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + 
                            (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') 
                                : '<div class="new"></div>'),

                        (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>'),

                        (item.sold == 'true' ? '<p class="object-price">Sold<p>' 
                            : (obj[item.type] ? obj[item.type].pPrice : ''))
                    ]);

                    $.cookie('object_' + item.itemId, true, {
                        expires: 300,
                        path: '/'
                    });
                }
            }
        } else if (offset >= 10) {
            for (const item of items) {
                let obj = buildDOMObj(item, {'cultureKey': cultureKey});
                
                if (obj[item.type]) {
                    searchResults.innerHTML += obj.reusable.link + 
                        `${($.cookie('object_' + item.itemId) ? (obj[item.type] ? obj[item.type].divRent : '') : '<div class="new"></div>')}
                            <div class="object-id">Id: ${item.itemId}</div>
                            <p>${item.title}</p>
                            ${(item.sold == 'true' ? '<div class="sold"></div>' : '')}
                        </a>
                        <div class="object-description">
                            <p class="card-object-location"><i></i>${item.location}</p>
                            <p class="card-object-category"><i></i>${item.category}</p>
                            ${(item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>')}
                            <p class="card-area">${item.area} <span>sq. m.</span></p>
                            ${(item.sold == 'true' ? '<p class="object-price">Sold</p>' 
                                : (obj[item.type] ? obj[item.type].pPrice : ''))}
                        </div>
                    </div>`
                } else {
                    searchResults.innerHTML += `<div class="sisea-result slide offset">
                            <a ${(item.objectLink.length < 10 ? `href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${cultureKey}"` 
                                : 'href="' + item.objectLink + '" target="_blank"')} 
                                title="${item.title}" style="background-image: url(${item.image});" class="object" data-id="${item.itemId}">
                                    ${($.cookie('object_' + item.itemId) ? 
                                        (obj[item.type] ? obj[item.type].divRent : '') 
                                            : '<div class="new"></div>') + 
                                    (item.type == 3 || item.type == 2 || item.type == 1 ? `<p>${item.titleWithCategory}</p>` 
                                        : (category == 0 ? '<p class="big-title">' + item.titleWithLocation + '</p>' 
                                            : '<p>' + item.titleWithLocation + '</p>')) + 
                                    (item.sold == 'true' ? '<div class="sold"></div>' : '')}
                            </a>
                            ${(item.video != '0' ? '<button class="youtube-btn" data-code="' + item.video + '"></button>' : '')}
                        </div>`;
                }

                $.cookie('object_' + item.itemId, true, {
                    expires: 300,
                    path: '/'
                });
            }
        }

        isLoaded = items.length >= 1;
        searchResults.getElementsByTagName('svg')[0].remove(); // check

        function getInnerHTML (obj, arr) {
            return obj.link + arr[0] + obj.info + arr[1] + obj.addInfo + arr[2] + obj.contact;
        }
        
    })
    .then(() => fetchComplete())
    .catch(error => console.log(error));
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
        url: 'https://thai.hub360.info/api/get-object-by-category',
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
                $("meta[property='og:title']").attr('content', data.title + ' - ' + siteName);
                
                $("meta[name='description']").attr('content', data.description);
                $("meta[property='og:description']").attr('content', data.description);
                
                $("meta[property='og:image']").attr('content', data.image);
                $("meta[property='og:image:secure_url']").attr('content', data.image);
                $("meta[name='twitter:image']").attr('content', data.image);
                
                $("link[rel='image_src']").attr('href', data.image);
                $("link[rel='alternate']").attr('hreflang', cultureKey).attr('href', window.location.href);
                $("meta[property='og:url']").attr('content', window.location.href);
                $("meta[name='keywords']").attr('content', data.keywords);
                $('#home-btn').attr('data-link', mainPanoLink);
                
                isVRModeRequested() ? accessWebVr() : accessStdVr();

                $('#video-object-btn').attr('data-code', item.video || 0); // check

                if (data.template == 3) {
                    panoLocation.empty().html(translation.Thailand(cultureKey) + '<br><span>' + item.title + '</span>');
                } else {
                    panoLocation.empty().html(`${translation.Thailand(cultureKey)}<br><span>
                                ${item.location}<br>${item.longtitle + (item.isRealEstate == true ? ' ID: ' + item.id : '')}
                            </span>`);
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
        url: 'https://thai.hub360.info/api/get-about-object-info',
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
    var cultureKey = getUrlVars()["lang"] || 'en',
        innerContainer = document.querySelector('.inner-content'),
        itemId = this.getAttribute('data-id');
    
    $('.inner-content-close-btn, .inner-content').fadeIn(500);
    $('.inner-modal').animate({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    }, 500);

    let url =  `https://thai.hub360.info/api/get-default-object?lang=${cultureKey}&itemId=${itemId}&rand=${getRandom()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            innerContainer.innerHTML += (this.classList.contains('item-new')) ?
                (data.imageUrl ? `<h2>${data.title}</h2>
                <img src="${data.imageUrl}" class="main-new-img"/>
                <div class="main-new-body">${data.content}</div>`
                : `<h2>${data.title}</h2><div class="main-new-body">${data.content}</div>`)
                    : `<h2>${data.title}</h2><div>${data.content}</div>`
        })

        .then(() => {
            panoIsLoad = false
            fetchComplete();
        });   
}

//Ajax загрузка и открытие окна help
function getHelpInfo(dataId) {
    var cultureKey = getUrlVars()["lang"] || 'en';
    OnShowHideControls(true, false);
    var helpContainer = document.querySelector('.help-content');

    $('.help-content-close-btn, .help-content').fadeIn(500);
    $('.help-modal').animate({
        left: 0
    }, 500);

    let url = `https://thai.hub360.info/api/get-default-object?lang=${cultureKey}&itemId=${dataId}&rand=${getRandom()}`;
    helpContainer.innerHTML += preloader;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.help-content svg').remove();
            console.log(data.conetnt);
            helpContainer.innerHTML += `<h2>${data.title}</h2><div>${data.content}</div>`;
        })
        .then(() => {
            panoIsLoad = false
            fetchComplete();
        });    
}




//Функция по завершению ajax загрузки
function fetchComplete() {
    if (panoIsLoad) {
        xmlParser(panoVrXml);
        panoIsLoad = false;
    }
    if (loadGallery)
        setTimeout(function(){myCarouselInit();loadGallery = false;}, 100)
    if ($('#mobile-map-search-btn').hasClass('active'))
        initMap();

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
            title.length > 1 ? OnAjaxSearch(title, true, count, exclude)
                : OnLoadObjects(category, count);
        }
    });
};

//Получение координат панораммы из xml файла
function xmlParser(xmlUrl) {
    $.ajax({
        type: "GET",
        url: xmlUrl,
        dataType: "xml",
        success: function(xml) {
            var xmlLatitude = $(xml).find("scene").attr('latitude');
            var xmlLongitude = $(xml).find("scene").attr('longitude');
			      if(typeof xmlLatitude == 'undefined') xmlLatitude = 0;
			      if(typeof xmlLongitude == 'undefined') xmlLongitude = 0;
            $('#search-panel').attr('data-latitude', xmlLatitude).attr('data-longitude', xmlLongitude);
        }
    }).done(() => panoIsLoad = false);
}




function OnLoadPano(xmlname, sphere) {
	let panoWindow = document.getElementById("krpanoSWFObject");
    panoWindow.call("onout();loadpano(" + xmlname + ", startscene=" + sphere + ", MERGE, ZOOMBLEND(0.5, 8.0));");
	panoWindow.call("blendmode_prepareblendmode");
	panoWindow.call('stopallsounds');
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







// --- additional functions ---

function getElAttr(el, attr) {
    return document.querySelector(el).getAttribute(attr);
}

function getUrlString(data) {
    return Object.entries(data).reduce((acc, val) => {
                return acc += `&${val[0]}=${val[1]}` 
            }, '');
}

// setting multiple attributes at once
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// HTML building function
function buildDOMObj(item, obj) {
    return {
        1: {
            divRent: '<div class="rent"></div>',
            pPrice: `<p class="object-price">${item.priceRentMonthly ? priceToString(item.priceRentMonthly) : 0} <b>${getPricesAndSymbol()}</b></p>`
        },
        2: {
            divRent: '<div class="sale"></div>',
            pPrice: `<p class="object-price">${item.priceSale ? priceToString(item.priceSale) : 0} <b>${getPricesAndSymbol()}</b></p>`
        },
        3: {
            divRent: '<div class="sale-rent"></div>',
            pPrice: `<p class="second-object-price"><i>Rent: </i>
                        ${item.priceRentMonthly ? priceToString(item.priceRentMonthly) : 0} 
                        <b>${getPricesAndSymbol()}</b>
                     </p>
                     <p class="object-price"><i>Sale: </i>
                        ${item.priceSale ? priceToString(item.priceSale) : 0} 
                        <b>${getPricesAndSymbol()}</b>
                     </p>`
        },
        reusable: {
            link: `<div class="sisea-result estate offset">
                <a href="#!p=${item.itemId}-${item.alias}&s=pano${item.panoId}&lang=${obj.cultureKey}" title="${item.title}" 
                    style="background-image: url(${item.squareImg}?${randomHash});" class="object" data-id="${item.itemId}">`,
            info: `<div class="object-id">Id: ${item.itemId}</div>
                    <p>${item.title}</p>
                    ${(item.sold == 'true' ? '<div class="sold"></div>' : '')}
                </a>
                <div class="object-description">
                    <p class="card-object-location"><i></i>${item.location}</p>
                    <p class="card-object-category"><i></i>${item.category}</p>`,
            addInfo: `<p class="card-area">${item.area} <span>sq. m.</span></p>
                    <p class="object-sea-view">${(item.seaView == 'true' ? 'Sea view' : '')}</p>
                    ${(item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>')}`,
            contact: `</div>
                    <div class="contact-object-btn">
                        <img src="/assets/images/object_contact_icon.svg"/><span>${translation.Contact(obj.cultureKey)}</span>
                    </div>
                    <div class="favorite-object-btn">
                        <img src="/assets/images/favorites_icon.svg"/><span>${translation.Favorites(obj.cultureKey)}</span>
                    </div>
                </div>`
        }
    }
}