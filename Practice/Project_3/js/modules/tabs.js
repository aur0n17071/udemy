function tabs(){
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsWrap = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent');

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

};

module.exports = tabs;