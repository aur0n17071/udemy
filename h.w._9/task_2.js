'use strict'
//мой метод
function isPangram(string){
    let alphabet = [];
    for (let i = 97; i<= 122; i++){
    alphabet.push(String.fromCharCode(i));
    }
    string = string.toLowerCase();
    let res = Array.from(new Set(string.split(''))).sort();
    for (let item of alphabet){
       return !res.includes(item) ? false : true
    }
}

console.log(isPangram('The quick brown fox jumps over the lazy dog'));
console.log(isPangram('Hello world'));

// метод номер 2

function isPangram(string){
    string = string.toLowerCase();
    let alphabet = [];
    for (let i = 97; i<= 122; i++){
    alphabet.push(String.fromCharCode(i));
    }
    return alphabet.every((i) => {return string.includes(i)})
}

console.log(isPangram('The quick brown fox jumps over the lazy dog'));
console.log(isPangram('Hello world'));