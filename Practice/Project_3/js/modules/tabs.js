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

export default tabs;