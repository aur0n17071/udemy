import {modalClose, modalOpen} from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId){
    // SERVER SEND SCRIPT AND MODAL UPDATE
    const forms = document.querySelectorAll(formSelector);

    const message = {
            loading: 'img/modal/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: "Произошла ошибка"
          }
    
    forms.forEach(el => bindPostData(el));



    function bindPostData(form) {
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
            console.log(formData);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch((er) => {
                console.log(er);
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
        modalOpen('.modal', modalTimerId);

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
            modalClose('.modal');
        }, 3000)
    }
   
}

export default forms;