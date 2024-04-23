'use strict'

const funds = [
    {amount: 1400},
    {amount: 2400},
    {amount: 1000},
    {amount: 500},
    {amount: 10400},
    {amount: 11400}
];

const getPositiveIncomeAmount = (data) => {
    return data.reduce((acc, item) => item.amount >= 0 ? acc += item.amount : acc ,0)
};

const getTotalIncomeAmount = (data) => {
    return data.some(item => item.amount < 0) ? data.reduce((acc, item) => acc += item.amount ,0) : getPositiveIncomeAmount(data);
};