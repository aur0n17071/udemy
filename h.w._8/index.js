function factorial(num) {
    if (!Number.isInteger(num)){
        return `${num} не целое число`;
    }
    if (num <= 0 ) {
        return 1;
    }
    return num * factorial(num - 1);
}

console.log(factorial(1));