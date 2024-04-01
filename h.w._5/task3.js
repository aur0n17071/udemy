"use strict"

const someString = 'This is some strange string';

function reverse(str) {
    if (typeof str !== 'string') return `Ошибка!`
    return str.split('').reverse().join('');
}


const baseCurrencies = ['USD', 'EUR'];
const additionalCurrencies = ['UAH', 'RUB', 'CNY'];
const allCurrencies = [...baseCurrencies, ...additionalCurrencies]


function availableCurr(arr, missingCurr) {
    if (arr.length === 0 || !Array.isArray(arr)) return `Нет доступных валют`;
    const findResult = arr.findIndex(item => item === missingCurr);
    if (findResult === -1) {
        return `Доступные валюты:\n${arr.join('\n')}\n`
    } else {
        arr.splice(findResult, 1);
        return `Доступные валюты:\n${arr.join('\n')}\n`
    }
}
console.log(availableCurr(allCurrencies, 'CNY')); 
console.log(availableCurr(allCurrencies, '')); 