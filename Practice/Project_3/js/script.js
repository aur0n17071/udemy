'use strict'

window.addEventListener('DOMContentLoaded', () => {
// TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsWrap = document.querySelector('.tabheader__items'),
          tabContent = document.querySelectorAll('.tabcontent')

function hideTabContent(){
    tabContent.forEach(el => {
        el.classList.add('hide');
        el.classList.remove('show', 'fade');
    });
    
    tabs.forEach(el => el.classList.remove('tabheader__item_active'));
}

function showTabContent (i = 0){
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show','fade');
    tabs[i].classList.add('tabheader__item_active', 'fade');
}

    tabsWrap.addEventListener('click', (e)=>{
        const target = e.target;
        if (target && target.matches('.tabheader__item')){
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

// TIMER

const deadline = '2028-06-20';

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

setClock('.timer' , deadline);

// MODAL

const modalBtn = document.querySelectorAll('[data-modal-btn]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = modal.querySelector('.modal__close'),
      modalTimerId = setTimeout(modalOpen, 2000);

    modalBtn.forEach(e => e.addEventListener('click', modalOpen));

    modal.addEventListener('click', e => {
        if (e.target == modal || e.target == modalCloseBtn) {
            modalClose();
        }
    })

    document.body.addEventListener('keydown', e => {
        if (e.key == 'Escape' && modal.classList.contains('show')){
            modalClose();
        }
        
    })

    function modalOpen(){
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function modalClose(){
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function modalShowByScroll(){
        //проверка что пользователь долистал до конца страницы (видимая часть + проскроленная равна полной высоте документа)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            modalOpen();
            window.removeEventListener('scroll', modalShowByScroll);
        }
    }

    window.addEventListener('scroll', modalShowByScroll);
})