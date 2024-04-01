"use strict"

const personalPlanPeter = {
    name: "Peter",
    age: "29",
    skills: {
        languages: ['ru', 'eng'],
        programmingLangs: {
            js: '20%',
            php: '10%'
        },
        exp: '1 month'
    },
    showAgeAndLangs: function(obj){
        return `Мне ${obj.age} и я владею языками: ${obj.skills.languages.join(' ').toUpperCase()}`
    }
};

function showExperience(plan) {
    const {exp} = plan.skills;
    return exp;
}

function showProgrammingLangs(plan) {
    let str = '';
    for (let key in plan.skills.programmingLangs){
        str += `Язык ${key} изучен на ${plan.skills.programmingLangs[key]}\n`
    }
    return str;
}