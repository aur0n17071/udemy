function modal(){
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
}

module.exports = modal;