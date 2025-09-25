// Место для первой задачи
function sayHello(name) {
    return `Привет, ${name}!`
}

// Место для второй задачи
function returnNeighboringNumbers(number) {
    return [number - 1, number, number + 1]
}

// Место для третьей задачи
function getMathResult(num, count) {
  let res = `${num}`;
  if (typeof(count) === 'number' && count > 0){
    for (let i = 2; i <= count; i++){
      res += `---${num * i}`;
    }
    return res;
  }
  return +res;
}