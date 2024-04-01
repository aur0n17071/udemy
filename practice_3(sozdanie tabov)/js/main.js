window.addEventListener('DOMContentLoaded' , () =>{
  //Tabs
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

    //Timer

    const deadLine = '2024-12-30';

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

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else return num;
    }

    function setClock(selector, endTime){
       const timer = document.querySelector(selector),
             days = document.querySelector('#days'),
             hours = document.querySelector('#hours'),
             minutes = document.querySelector('#minutes'),
             seconds = document.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);

        updateClock();

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
});