'use strict'

// Задача:
// У вас есть список учеников, которые хотят поиграть в игру:
// const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];
// Но команд может быть только 3 по 3 человека. Напишите функцию sortStudentsByGroups, которая принимает в себя массив строк.
// Внутри она сначала сортирует имена по алфавиту. Затем распределяет учеников по 3 человека в 3 группы по алфавитному порядку. Эти группы должны быть массивами. Как итог, функция возвращает новый массив с тремя командами и строкой как 4й элемент.
// Пример:

// sortStudentsByGroups(students)  =>

// [
//   [ 'Andrew', 'Ann', 'Bernard' ],
//   [ 'Cris', 'Josh', 'Mark' ],
//   [ 'Peter', 'Sam', 'Sandra' ],
//   'Оставшиеся студенты: Takesi'
// ]
// Если убрать одно студента из списка, то результат будет:

// [
//   [ 'Andrew', 'Ann', 'Bernard' ],
//   [ 'Cris', 'Josh', 'Mark' ],
//   [ 'Peter', 'Sam', 'Sandra' ],
//   'Оставшиеся студенты: -'
// ]
// А если добавить одного, то:

// [
//   [ 'Andrew', 'Ann', 'Bernard' ],
//   [ 'Cris', 'Josh', 'Mark' ],
//   [ 'Peter', 'Sam', 'Sandra' ],
//   'Оставшиеся студенты: Takesi, Somebody'
// ]
// То есть, меняется содержимое строки. Все оставшиеся ученики попадают туда.

// const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];
// const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Sam', 'Takesi', 'Test' ];
const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Sam' ];

function sortStudentsByGroups(arr) {
    const res = [];
    arr.sort();
        for (let i = 0; i <= 8; i+=3){
            res.push(arr.slice(i, i + 3))
        }
        if (arr.length >= 9) {
            const str = arr.slice(9, arr.length).join(', ');
            res.push(`Оставшиеся студенты: ${str.length > 0 ? str : '-'}`)
        }
    return res;
}

console.log(sortStudentsByGroups(students));