const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Sam']; //, 'Takesi', 'vavavav' 

function sortStudentsByGroups(arr) {
    const cloneArr = Array.from(arr);
    cloneArr.sort();
    let result = [];
    let subArr =[];
    for (let i = 0; i < cloneArr.length;){
        if (result.length < 3) {
          result.push(cloneArr.slice(i , i + 3));
          i += 3;
          continue;
        }
        subArr.push(cloneArr[i]);
        i += 1;
    }
    result.push(`Оставшиеся студенты: ${subArr.length === 0 ? '-' : subArr.join(', ')}`)
    return result;
}
console.log(sortStudentsByGroups(students));