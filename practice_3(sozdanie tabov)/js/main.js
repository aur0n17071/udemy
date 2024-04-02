window.addEventListener('DOMContentLoaded' , () =>{
  //Tabs ***
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

    //Timer ***

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

    //Modal ***
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-modal-close]');

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

    modalCloseBtn.addEventListener('click', modalClose);

    //закрытие модального окна при нажатии за пределами модалки
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
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
    const modalTimerId = setTimeout(modalOpen, 10000);

    function showModalByScroll () {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
          modalOpen();
          window.removeEventListener('scroll', showModalByScroll);
      }
  }
    window.addEventListener('scroll', showModalByScroll)
});