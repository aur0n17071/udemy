'use strict'

// Создайте функцию deepCount, которая будет считать количество всех элементов в массиве, включая и вложенные массивы. 
// Учтите, что сам вложенный массив тоже входит в счет. Чтобы понять задачу детальнее, давайте рассмотрим примеры:

// deepCount([1, 5, 3]) => 3

// deepCount(["1", 5, "3", ["10"]]) => 5 (Заметьте, что последний элемент был посчитан сам + его внутренность)

// deepCount([1, 2, [3, 4, [5]]]) => 7

// deepCount([]) => 0

// deepCount([[[[[[[[[]]]]]]]]]) => 8

function deepCount(a){
    let res = 0;
    for (let item of a){
        if (Array.isArray(item)) {
            res = res + deepCount(item);
        }
    res++
    }
    return res
}

console.log(deepCount([1, 2, [3, 4, [5]]]));

// Вариант с методом reduce
function deepCount(a){
    return a.reduce((s,e)=>s+(Array.isArray(e) ? deepCount(e) : 0),a.length);
}