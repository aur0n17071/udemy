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

export default modal;
export {modalClose};
export {modalOpen};