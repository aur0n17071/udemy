function fib(fiboNum) {
    let arr = [0];
    let string = '';
    if (!Number.isInteger(fiboNum)) return string
    for (let i = 0; i < fiboNum; i++){
    arr[i + 1] = arr[i] + arr[i - 1] || i;
    if (i === fiboNum - 1) return string += `${arr[i + 1]}`
    string += `${arr[i + 1]} `
    }
    return string
}

console.log(fib(7));

function fib2(num) {
    if (num <=0 || !Number.isInteger(num)) return '';

    let result ='';
    let first = 0;
    let second = 1;

    for (let i = 0; i < num; i++){
        if (i + 1 === num) {result += `${first}`}
        else {result += `${first} `};

        let third = first + second;
        first = second;
        second = third;
    }
    return result
}

console.log(fib2(7));