'use strict';

const presonalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function() {
        presonalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    
        while(presonalMovieDB.count == '' || presonalMovieDB.count == null || isNaN(presonalMovieDB.count)){
            presonalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },

    rememberMyFilms: function (){
        for (let i = 0; i < 2; i++){
            let lastMovieName = prompt('Один из последних просмотренных фильмов?', '');
            let lastMovieRating = prompt('На сколько оцените его?', '');
        
            if (lastMovieName === null || lastMovieName.length === 0 || lastMovieName.length > 50){
                i--;
                continue;
            }
            if (lastMovieRating === null || lastMovieRating.length === 0){
                i--;
                continue;
            }
            presonalMovieDB.movies[lastMovieName] = lastMovieRating;
        }
    },

    detectPersonalLevel: function (){
        if (presonalMovieDB.count < 10){
            console.log("Просмотрено довольно мало фильмов");
        } else if (presonalMovieDB.count >= 10 && presonalMovieDB.count < 30){
            console.log("Вы классический зритель");
        } else if (presonalMovieDB.count >= 30){
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },

    showMyDB: function (){
        if (presonalMovieDB.privat === false){
            console.log(presonalMovieDB);
        }
    },

    writeYourGenres: function (){
        for (let i = 0; i < 1; i++){
            let question = prompt(`Ваши любимые жанры через запятую`);
            if (question === null || question === '' || !isNaN(question)){
                i--;
                continue;
            }
            presonalMovieDB.genres = question.toLowerCase().split(', ').sort();
        }
        presonalMovieDB.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        });
    },
    
    toggleVisibleMyDB: function (){
        presonalMovieDB.privat === true ? presonalMovieDB.privat = false : presonalMovieDB.privat = true
    },
};

// presonalMovieDB.start();

// presonalMovieDB.rememberMyFilms();

// presonalMovieDB.detectPersonalLevel();

// presonalMovieDB.writeYourGenres();

// presonalMovieDB.toggleVisibleMyDB();
// presonalMovieDB.showMyDB();
