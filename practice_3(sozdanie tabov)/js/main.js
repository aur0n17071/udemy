window.addEventListener('DOMContentLoaded' , () =>{
    //Tabs ********************************************
    let tabsContent = document.querySelectorAll('.tabcontent'),
        tabParent =document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item');

        function hideTabContent(){
            tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
            });

            tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0){
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }
        hideTabContent();
        showTabContent();
        /*вешаем слушатель на родительский элемент и проверяем куда мы кликаем
        если мы попали на нужный элемент то позкываем контект привязанный к элементу
        */
        tabParent.addEventListener('click', (event) =>{
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i)=>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
                })
            }
        })

        //Timer ********************************************

        const deadLine = '2024-12-30';
        /*объявляем переменные и проверяем если дата прошла (Т отрицательная)
        тогда ставим 0, иначе просчитываем время по каждой переменной через остаток от деления
        выводим объект как результат выполнения функции
        */
        function getTimeRemaining(endTime){
            let days, hours, minutes, seconds;
            const t = Date.parse(endTime) - Date.parse(new Date);
                if (t <= 0){
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / (1000 * 60)) % 60),
                seconds = Math.floor((t / 1000) % 60);
                }
        return {
            'total' : t,
            days,
            hours,
            minutes,
            minutes,
            seconds,
        }
        }
        //добавляем 0 к однозначным числам
        function getZero(num){
            if (num >= 0 && num < 10){
                return `0${num}`;
            } else return num;
        }

        //выбираем элементы из страницы и меняем их значение через интервал
        function setClock(selector, endTime){
        const timer = document.querySelector(selector),
                days = document.querySelector('#days'),
                hours = document.querySelector('#hours'),
                minutes = document.querySelector('#minutes'),
                seconds = document.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock(); //вызываем функцию сразу для простановки чисел

        function updateClock(){
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total < 0){
                clearInterval(timeInterval);
            }
        }
        }

        setClock('.timer', deadLine);

        //Modal ********************************************
        const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');

        function modalOpen (){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden'; 
            clearInterval(modalTimerId) //запрещает прокрутку страницы когда модалка открыта
        }

        function modalClose(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modalTrigger.forEach((item) => {
        item.addEventListener('click', modalOpen)
        })

        //закрытие модального окна при нажатии за пределами модалки
        modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
            console.log(e.target);
            modalClose();
        }
        })

        //добавляем закрытие модалки при нажатии клавиши Esc, только когда модалка открыта
        document.addEventListener('keydown' , (e) =>{
        if (e.code === "Escape" && modal.classList.contains('show')) {      
            modalClose();
        }
        })

        //открытие модального окна по прошествию времени
        const modalTimerId = setTimeout(modalOpen, 15000);

        function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
        window.addEventListener('scroll', showModalByScroll);

        
        //Создание карточек при помощи классов*********************************************

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();  //вызов метода в конструкторе
        }

        changeToUAH(){
        this.price = this.price * this.transfer;
        }

        render(){
        const div = document.createElement('div');
        if (this.classes.length == 0) {
            this.classes = 'menu__item';
            div.classList.add(this.classes);
        } else {
            this.classes.forEach(className => div.classList.add(className));
        };

        div.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}"</h3>
        <div class="menu__item-descr">${this.title}" - ${this.descr}</div>
        <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>

        `;
        this.parent.append(div);
        }
    }

    //создаем экземпляр объекта который мы используем и он удаляется без привязки к элементу
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        ' - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        11,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное',
        ' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        10,
        '.menu .container',
        'menu__item'
    ).render();

    //Отправка данных из форм и модального окна на сервер *********************************************

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо!',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value,key) => {
                obj[key] = value;
            })
            console.log(obj);

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(data => data.text()
            ).then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(error => {
                showThanksModal(message.failure);
                console.log(error);
            }).finally(() => {
                form.reset();
            })
        })
    };

    //функционал отправки форм
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        modalOpen();

        const thanksModal =document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
        <div class="modal__content">
            <div class="modal__close" data-modal-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        }, 2000)
    };

    
});