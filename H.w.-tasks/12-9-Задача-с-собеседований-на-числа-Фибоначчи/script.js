function fib(num){
  if (Number.isNaN(num) || num <= 0 || num % 1 != 0) return '';
  // let a = 0,
  //     b = 1,
  //     c = 0,
  //     res = '0';
  // for(let i = 1 ; i < num; i++) {
  //   res += ` ${b}`;
  //   c = a + b;
  //   a = b;
  //   b = c;
  // }
  let res = '',
      a = 0,
      b = 1;

  for (let i = 0; i < num; i++){
    res += ` ${a}`;
    [a, b] = [b, a + b]
  }
  
  return res;
}

console.log(fib(3));
