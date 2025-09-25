'use strict'
/*адача:

У вас есть список учеников, которые хотят поиграть в игру:

const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];
Но команд может быть только 3 по 3 человека. Напишите функцию sortStudentsByGroups, которая принимает в себя массив строк.

Внутри она сначала сортирует имена по алфавиту. Затем распределяет учеников по 3 человека в 3 группы по алфавитному порядку. Эти группы должны быть массивами. Как итог, функция возвращает новый массив с тремя командами и строкой как 4й элемент.

Пример:

sortStudentsByGroups(students)  =>

[
  [ 'Andrew', 'Ann', 'Bernard' ],
  [ 'Cris', 'Josh', 'Mark' ],
  [ 'Peter', 'Sam', 'Sandra' ],
  'Оставшиеся студенты: Takesi'
]
Если убрать одно студента из списка, то результат будет:

[
  [ 'Andrew', 'Ann', 'Bernard' ],
  [ 'Cris', 'Josh', 'Mark' ],
  [ 'Peter', 'Sam', 'Sandra' ],
  'Оставшиеся студенты: -'
]
А если добавить одного, то:

[
  [ 'Andrew', 'Ann', 'Bernard' ],
  [ 'Cris', 'Josh', 'Mark' ],
  [ 'Peter', 'Sam', 'Sandra' ],
  'Оставшиеся студенты: Takesi, Somebody'
]
То есть, меняется содержимое строки. Все оставшиеся ученики попадают туда. */

// function sortStudentsByGroups(arr) {
//     const cloneArr = Array.from(arr);
//     cloneArr.sort();
//     let result = [];
//     let subArr =[];
//     for (let i = 0; i < cloneArr.length;){
//         if (result.length < 3) {
//           result.push(cloneArr.slice(i , i + 3));
//           i += 3;
//           continue;
//         }
//         subArr.push(cloneArr[i]);
//         i += 1;
//     }
//     result.push(`Оставшиеся студенты: ${subArr.length === 0 ? '-' : subArr.join(', ')}`)
//     return result;
// }

const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];

function sortStudentsByGroups(arr) {
  arr.sort();
  let res = [];

  for(let i = 0; i < 3; i++){
    res.push(arr.splice(0 , 3))
  };

  res.push(`Оставшиеся студенты: ${arr.join(', ') || '-'}`);
  return res
}
console.log(sortStudentsByGroups(students));
