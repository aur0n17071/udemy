/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';
 document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
          filmList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('.add');


    form.addEventListener('submit', (e) => {
        e.preventDefault();  
        
        const formInput = form.querySelector('input');

        const text = formInput.value.length > 21 ? formInput.value.trim().substr(21) + '...' : formInput.value.trim();
        if (text === '') return
        movieDB.movies.push(text);

        if (form.querySelector('[type=checkbox]').checked) console.log('Добавляем любимый фильм');

        filmListBuild(movieDB.movies, filmList);
        e.target.reset()
    })

    function removeAdv (arr) {
        arr.forEach(el => el.remove())
    }
    
    function posterEdit () {
        document.querySelector('.promo__genre').textContent = 'ДРАМА';
        document.querySelector('.promo__bg').style.background = 'url(./img/bg.jpg)';
    }

    function sortArr (arr) {
        return arr.sort();
    }

    function filmListBuild(films, parent){
        parent.innerHTML =``;

        sortArr(films).forEach((el, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${el.toLocaleUpperCase()}
                 <div class="delete"></div>
            </li>`
        })
        filmList.querySelectorAll('.delete').forEach( (btn,i) => {
            btn.addEventListener('click', () => {
                movieDB.movies.splice(i,1);
                filmListBuild(films, parent);
            })
        });
    }

    filmListBuild(movieDB.movies, filmList); 
    removeAdv(adv);
    posterEdit();
}) 

