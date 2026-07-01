'use strict'
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {modalOpen} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 10000);

    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal-btn]', '.modal', modalTimerId);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2028-06-20');
    slider({
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

