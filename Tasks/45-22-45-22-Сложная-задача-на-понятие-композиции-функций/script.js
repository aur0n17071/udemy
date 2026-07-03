// Задание:

// 1) В математике есть такое понятие, как композиция функций. В программирование этот прием тоже перекочевал и является весьма удобным в части ситуаций. Приведу наглядный пример из этой статьи. (Пока её можно открыть только в начале, так как там вы найдете начало решения 🙂)
// Допустим, у вас есть отдельные функции, которые в итоге вычисляют скидку:
// const multiply20 = (price) => price * 20;
// const divide100 = (price) => price / 100;
// const normalizePrice = (price) => price.toFixed(2);
// В итоге мы получим результат, но эта цепочка не совсем удобна. А если действий там будет много? Можно запустить её вот так:
// // result = a(b(c(x)))
// const discount = normalizePrice(divide100(multiply20(200)));
// Но при увеличении количества функций это превратиться в нечитаемый ад. И вот задача состоит в том, чтобы написать функцию compose, которая будет принимать все эти функции и делать тоже самое. То есть, организовывать композицию функций. Обратите внимание на порядок записи функций - последняя записанная запускается первой и дальше справа налево. Возможно вам понадобится это.
// const discount = compose(normalizePrice, divide100, multiply20);
// discount(200.0);
// Функций может быть сколько угодно и они могут принимать только один начальный аргумент. Так что вариант:
// const compose = (a, b, c) => (x) => a(b(c(x)));
// Не подходит, так как работает только с 3мя функциями.


// 2)Усложненное задание!
// Справились с первой частью? Хорошо, давайте усложним 🙂
// А теперь напишите функцию композиции composeWithArgs, которая принимает сколько угодно аргументов в начале. Пример:
//     const add1 = function(a){return a + 1}
//     const addAll3 = function(a,b,c){return a + b + c}
//     composeWithArgs(add1,addAll3)(1,2,3)  => Вернет 7

const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);

const compose = (...arg) => {
    return function (x) {
        return arg.reduceRight((ac,fun) => ac = fun(ac), x)
    }
};

const discount = compose(normalizePrice, divide100, multiply20);

console.log(discount(300));
console.log(normalizePrice(divide100(multiply20(300))));

const add1 = function(a){return a + 1}
const addAll3 = function(a,b,c){return a + b + c}

const composeWithArgs = (...arg) => {
    return function (...x) {
        return arg.reduceRight((ac,fun) => [fun(...ac)], x)[0]
    }
};

const discount = composeWithArgs(add1,addAll3)
console.log(discount(1,2,3));

// Короткий и правильный вариант решения reduceRight возвращает функцию в виде результата в переменную
// const composeWithArgs = (...fns) => fns.reduceRight((ac, fn) => (...args) => fn(ac(...args)));

// const add1 = (x) => x + 1;
// const double = (x) => x * 2;
// const addAll3 = (a, b, c) => a + b + c;
// в переменной будет собрана последовательность из функций discount = (...args) => add1(double(addAll3(...args)))