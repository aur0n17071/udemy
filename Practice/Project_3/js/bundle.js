/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js"
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const calcResult = document.querySelector('.calculating__result span');

    let sex = localStorage.getItem('sex') ?? 'female',
        ratio = localStorage.getItem('ratio') ?? 1.375,
        height, weight, age;

    function calculatorInit(parentElement, activeClass){
        const elements = document.querySelectorAll(`${parentElement} div`);

        localStorage.setItem('sex', sex);
        localStorage.setItem('ratio', ratio);

        elements.forEach(el => {
            el.classList.remove(activeClass);

            if(el.getAttribute('id') === localStorage.getItem('sex')){
                el.classList.add(activeClass);
            }
            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                el.classList.add(activeClass)
            }
        })
    }

    calculatorInit('#gender','calculating__choose-item_active')
    calculatorInit('.calculating__choose_big','calculating__choose-item_active')

    function calculatorTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            calcResult.textContent = '____';
            return;
        } else {
            if (sex == 'female') {
                calcResult.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
            } else {
                calcResult.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio)
            }
        }
    }

    calculatorTotal();

    function calculatorStaticInfo(parentElement, activeClass){
        const elements = document.querySelectorAll(`${parentElement} div`);

        elements.forEach(el => {
            el.addEventListener('click', (e) => {
                if (parentElement == '#gender') {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                } else {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                
                e.target.classList.add(activeClass);

                calculatorTotal();
            });
        });

        
    }

    calculatorStaticInfo('#gender','calculating__choose-item_active')
    calculatorStaticInfo('.calculating__choose_big','calculating__choose-item_active')

    function calculatorDynamicInfo(){
        const element = document.querySelector('.calculating__choose_medium');



        element.addEventListener('input', (e) => {

            if (e.target.value.match(/\D/g)){
                e.target.style.border = '1px solid red'
            } else {
                e.target.style.border = 'none'
            }

            switch(e.target.getAttribute('id')) {
                case'height' :
                    height = +e.target.value;
                    break;
                case'weight' :
                    weight = +e.target.value;
                    break;
                case'age' :
                    age = +e.target.value;
                    break;
            }
            
            calculatorTotal();
        });
    }

    calculatorDynamicInfo();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ },

/***/ "./js/modules/cards.js"
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards (){
    class MenuCard {
        constructor(img, alt, title, text, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        render(){
            const card = document.createElement('div');
            if (this.classes.length == 0) {
                this.classes = 'menu__item';
                card.classList.add(this.classes);
            } else {
                this.classes.forEach(className => card.classList.add(className))
            }
            card.innerHTML = `
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parentSelector.append(card)
        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

    }

    //Reqiest for tabs create

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr,price}) => {
            new MenuCard(img, altimg, title, descr,price,'.menu .container').render();
        });
    })

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr,price}) => {
    //         new MenuCard(img, altimg, title, descr,price,'.menu .container').render();
    //     });
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ },

/***/ "./js/modules/forms.js"
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId){
    // SERVER SEND SCRIPT AND MODAL UPDATE
    const forms = document.querySelectorAll(formSelector);

    const message = {
            loading: 'img/modal/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: "Произошла ошибка"
          }
    
    forms.forEach(el => bindPostData(el));



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.parentElement.append(statusMessage);
            
            const formData = new FormData(form);
            console.log(formData);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch((er) => {
                console.log(er);
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();

            })


        })
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
        }, 3000)
    }
   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./js/modules/modal.js"
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalClose: () => (/* binding */ modalClose),
/* harmony export */   modalOpen: () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId){
    modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
}

function modalClose(modalSelector){
    modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){

    const modalBtn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    modalBtn.forEach(e => e.addEventListener('click', () => modalOpen(modalSelector, modalTimerId)));

    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClose(modalSelector);
        }
    })

    document.body.addEventListener('keydown', e => {
        if (e.key == 'Escape' && modal.classList.contains('show')){
            modalClose(modalSelector);
        }
        
    })

    function modalShowByScroll(){
        //проверка что пользователь долистал до конца страницы (видимая часть + проскроленная равна полной высоте документа)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', modalShowByScroll);
        }
    }

    window.addEventListener('scroll', modalShowByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ },

/***/ "./js/modules/slider.js"
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, wrapper, slides, slideInner, counterWrapper, current, total, prewArrow, nextArrow}){
    // SLIDER
    const sliderCounter = document.querySelector(counterWrapper),
          sliderCurrent = sliderCounter.querySelector(current),
          sliderTotal = sliderCounter.querySelector(total),
          sliderPrev = sliderCounter.querySelector(prewArrow),
          sliderNext = sliderCounter.querySelector(nextArrow),
          sliderWrapper = document.querySelector(wrapper),
          sliderSlides = sliderWrapper.querySelectorAll(slides),
          sliderInner = sliderWrapper.querySelector(slideInner),
          slider = document.querySelector(container),
          width = parseInt(window.getComputedStyle(sliderWrapper).width);

    let slideIndex = 1,
        offset = 0,
        sliderDots = '';


    //SLIDER VER 2
    function slideStart () {
        sliderTotal.textContent = sliderSlides.length <= 9 ? `0${sliderSlides.length}` : sliderSlides.length;
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;

        sliderSlides.forEach(e => {
            e.style.width = width;
        })

        sliderWrapper.style.overflow = 'hidden';

        sliderInner.style.cssText = `
        display: flex;
        width: ${sliderSlides.length * 100}%;
        transition: all 0.5s ease;
        `;

        slider.style.position = 'relative';

    }

    const dotsContainer = document.createElement('ol'),
          dots = [];
    
    dotsContainer.classList.add('carousel-indicators');
    for (let i = 0; i < sliderSlides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if ( i == 0) {
            dot.style.opacity = 1;
        }
        dotsContainer.append(dot);
        dots.push(dot);
        
    }

    slider.append(dotsContainer);

    slideStart();

    sliderNext.addEventListener('click', () => {
        
        if (offset == width * (sliderSlides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += width;
            slideIndex++;
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;   
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    })

    sliderPrev.addEventListener('click', () => {
        
        if (offset == 0) {
            offset = width * (sliderSlides.length - 1);
            slideIndex = sliderSlides.length;
        } else {
            offset -= width;
            slideIndex--;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;   
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    })

    dots.forEach(el => {
        el.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = width * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;   
            sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./js/modules/tabs.js"
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass){
    const tabs = document.querySelectorAll(tabsSelector),
        tabsWrap = document.querySelector(tabsParentSelector),
        tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent(){
        tabContent.forEach(el => {
            el.classList.add('hide');
            el.classList.remove('show', 'fade');
        });
        
        tabs.forEach(el => el.classList.remove(tabsActiveClass));
    }

    function showTabContent (i = 0){
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show','fade');
        tabs[i].classList.add(tabsActiveClass, 'fade');
    }

        tabsWrap.addEventListener('click', (e)=>{
            const target = e.target;
            
            if (target && target.classList.contains(tabsSelector.slice(1))){
                tabs.forEach((el,i) => {
                    if (target == el) {
                        hideTabContent();
                        showTabContent(i);
                    };
                })
            }
        });

    hideTabContent();
    showTabContent();

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./js/modules/timer.js"
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline){

    function getTimeRemaining(endTime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / 1000 * 60 * 60) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        }
    }

    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();

        function updateClock(){
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id , deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ },

/***/ "./js/services/services.js"
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers : {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}




/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

;








window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpen)('.modal', modalTimerId), 10000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal-btn]', '.modal', modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2028-06-20');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        slides: '.offer__slide',
        slideInner: '.offer__slider-inner',
        counterWrapper: '.offer__slider-counter',
        current: '#current',
        total: '#total',
        prewArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next'
    });
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map