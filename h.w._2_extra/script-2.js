const lines = 2;
let result = '';


for (let i = 0; i < lines; i++){
    for (let q = 0; q < lines - i; q++){
        result += ' ';
    }
    for (let j = 0; j < 2 * i + 1; j++) {
        result += "*";
    }
    result += '\n';
}

console.log(result);