// Место для первой задачи
function getTimeFromMinutes(minutes) {
    if (!Number.isInteger(minutes) || minutes < 0) return "Ошибка, проверьте данные";
    const result = Math.floor(minutes / 60);
    const resMinutes = minutes - result * 60;
    if (result === 0 || result > 5 && result < 10) return `Это ${result} часов и ${resMinutes} минут`;
    if (result === 1) return `Это ${result} час и ${resMinutes} минут`
    if (result > 0 && result < 5 ) return `Это ${result} часа и ${resMinutes} минут`;  
}

// Место для второй задачи
function findMaxNumber(num1, num2, num3, num4) {
    const res = num1 + num2 + num3 + num4;
    if (isNaN(res) || typeof res === 'string') return 0
    return Math.max(num1, num2, num3, num4)
}