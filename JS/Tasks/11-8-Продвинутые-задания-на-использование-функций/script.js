'use strict'

// Задачи:

// 1) Создайте функцию, которая принимает в себя целое число минут и возвращает время в нужном формате строки. (Смотри пример). Обратите внимание на окончание слова "час" - оно меняется в зависимости от цифры. Если вместо аргумента приходит не число, дробное или отрицательное число - функция возвращает строку "Ошибка, проверьте данные"

// Внимание! Давайте пока ограничимся максимум 600ю минутами (10 часов). Так как проверки на большие числа будут раздувать код (33 часа, 31 час, 11 часов и тд). Этого будет достаточно и код будет проверять именно этот промежуток (1 - 10 часов). Но вы можете реализовать и полный скрипт, он тоже должен проходить тесты.

// Пример:
// getTimeFromMinutes(50) => "Это 0 часов и 50 минут"
// getTimeFromMinutes(150) => "Это 2 часа и 30 минут"
// getTimeFromMinutes(0) => "Это 0 часов и 0 минут"
// getTimeFromMinutes(-150) => "Ошибка, проверьте данные"

// Место для первой задачи
function getTimeFromMinutes(time) {
    if (time < 0 || !Number.isInteger(time)) return "Ошибка, проверьте данные";
    const hours = Math.floor(time / 60),
          minutes = time - hours * 60,
          timeStamp = [hours%10, minutes % 10],
          minutesArr = ["минут", "минута", "минуты"],
          hoursArr = ["часов", "час", "часа"];

    return `Это ${hours} ${hoursArr[timeStamp[0] == 1 ? 1 : (timeStamp[0] >= 2 && timeStamp[0] <= 4) ? 2 : 0]} и ${minutes} ${minutesArr[timeStamp[1] == 1 ? 1 : (timeStamp[1] >= 2 && timeStamp <= 3) ? 2 : 0]}`
}

// console.log(getTimeFromMinutes(50))
// console.log(getTimeFromMinutes(151))
// console.log(getTimeFromMinutes(0))
// console.log(getTimeFromMinutes(-150))

// 2) Напишите функцию, которая принимает в себя 4 числа и возвращает самое большее из них. Если один из аргументов не является числом или их меньше 4 - возвращается 0. Дробные числа разрешены.
// Пример:
// findMaxNumber(1, 5, 6.6, 11); =>  11
// findMaxNumber(1, 5, '6', '10');  =>  0
// У этой задачи есть очень много вариантов решения, в том числе и встроенное в JS. Подходит любое :)

// Место для второй задачи
function findMaxNumber(a,b,c,d) {
    if ( isNaN(a * b * c * d) || typeof(a+b+c+d) == 'string') return 0;
    return Math.max(a,b,c,d)
}

// console.log(findMaxNumber(1, 5, 6.6, '10'));
// console.log(findMaxNumber(1, 5, 6.6, 11));