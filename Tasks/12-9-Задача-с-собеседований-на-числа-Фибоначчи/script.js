'use strict'
function fib(num) {
    if (Number.isNaN(num) || num <= 0 || num % 1 != 0) return '';
    let str = '',
        a = 0,
        b = 0,
        c = 1;

    for (let i = 0; i < num; i++){
        if (b === 0) {str += `${b}`
        } else {
            str += ` ${b}`}
            a = b + c;
            b = c;
            c = a;
    }
    return str;
};

function secondFib(num) {
      let res = '',
      a = 0,
      b = 1;

  for (let i = 0; i < num; i++){
    res += ` ${a}`;
    [a, b] = [b, a + b]
  }
  
  return res;
}

