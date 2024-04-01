// Место для первой задачи
function calculateVolumeAndArea(qoubSideLength) {
    if (qoubSideLength <= 0 || !Number.isInteger(qoubSideLength)) return 'При вычислении произошла ошибка';
   const surfaceArea = 6 * Math.pow(qoubSideLength , 2);
   const cubeVolume = Math.pow(qoubSideLength , 3);
   return `Объем куба: ${cubeVolume}, площадь всей поверхности: ${surfaceArea}`;
}

// Место для второй задачи
function getCoupeNumber(placeNum) {
    if (!Number.isInteger(placeNum) || placeNum < 0) return `Ошибка. Проверьте правильность введенного номера места`;
    if (placeNum === 0 || placeNum > 36) return `Таких мест в вагоне не существует`;
    return Math.ceil(placeNum / 4);
}