'use strict';

const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    moviesList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    addCheckbox = addForm.querySelector('input[type=checkbox]');


addForm.addEventListener('submit', addNewFilm);


const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const deleteAdv = (arr) => {
    arr.forEach((item)=>{
        item.remove();
    })
}

const makeChanges = () => {
    genre.textContent = 'драма';
    poster.style.backgroundImage = "url('img/bg.jpg')";
}

const sortArr = (arr) => {
    arr.sort();
}

sortArr(movieDB.movies);

function createMovieList(films, parent){
    parent.innerHTML = '';
    sortArr(films);

    films.forEach((item, i) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${item}
            <div class="delete"></div>
        </li>`
    });
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            
            createMovieList(films, parent);
        })
    })
};

deleteAdv(adv);
makeChanges();
createMovieList(movieDB.movies, moviesList);


function addNewFilm (event){
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = addCheckbox.checked;

    if (newFilm){
        if (newFilm.length > 21){
            newFilm = `${newFilm.substring(0, 22)}...`;
        }

    if (favorite) {
        console.log('Добавляем любимый фильм')
    }

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
                
        createMovieList(movieDB.movies, moviesList);
    }

    event.target.reset();


    // event.preventDefault();
    // let item = addInput.value.trim();
    // if (addCheckbox.checked){
    //     console.log(`Добавляем любимый фильм`);
    // }
    // if (item.length >= 21){
    //     item = `${item.slice(0, 20)}…`;
    // }
    // movieDB.movies.push(item);
    // addForm.reset();
    // createMovieList(moviesList, movieDB.movies);
    // addListnerForDelete();
}

// function addListnerForDelete(){
//     const deleteFilmIcon = document.querySelectorAll('.delete');
//     deleteFilmIcon.forEach((item) => {
//         item.addEventListener('click', deleteFilm);
//     })
// }
// addListnerForDelete();

// function deleteFilm (event){
//     console.log(event.target.parentElement.textContent);
//     let findIndex;
//     movieDB.movies.find((item,index) => {
//        if(event.target.parentElement.textContent.includes(item)) {
//         findIndex = index;
//         return true
//        }
//     });
//     movieDB.movies.splice(findIndex,1);
//     console.log(movieDB);
//     createMovieList(moviesList, movieDB.movies);
//     addListnerForDelete();
// }