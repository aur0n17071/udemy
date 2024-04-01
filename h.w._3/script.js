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
    let string = `${num}`;
    if (count === 'number' || count > 1) {
        for (let i = 2; i <= count; i++){
            string += `---${num * i}`
        }
        return string
    } 
    return +string;
}

console.log(getMathResult(2,1));