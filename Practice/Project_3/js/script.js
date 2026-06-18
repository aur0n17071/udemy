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
      modal = document.querySelector('.modal');
    //   modalCloseBtn = modal.querySelector('.modal__close'); УДАЛИЛ
    //   modalTimerId = setTimeout(modalOpen, 2000);

    modalBtn.forEach(e => e.addEventListener('click', modalOpen));

    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClose();
        }
    })

    document.body.addEventListener('keydown', e => {
        if (e.key == 'Escape' && modal.classList.contains('show')){
            modalClose();
        }
        
    })

    function modalOpen(){
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }

    function modalClose(){
        modal.classList.remove('show');
        modal.classList.add('hide');
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


// CLASS CARD

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

    new MenuCard (
        "img/tabs/vegy.jpg","vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        25,
        '.menu .container',
        'menu__item', 
        'big'
    ).render();
    
        new MenuCard (
        "img/tabs/elite.jpg",
        "elite",'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container'
    ).render();

        new MenuCard (
        "img/tabs/post.jpg",
        "post",'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container',
        'menu__item'
    ).render();


    // SERVER SEND SCRIPT AND MODAL UPDATE
    const forms = document.querySelectorAll('form');

    const message = {
            loading: 'img/modal/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: "Произошла ошибка"
          }
    
    forms.forEach(el => postData(el));

    function postData(form) {
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

            const obj = {};
            formData.forEach((el,i) => obj[i] = el);
            
            fetch('server.php', {
                method: 'POST',
                headers : {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(data => {
                return data.text()
            })
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
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
        modalOpen();

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
            modalClose();
        }, 3000)
    }
    
})
