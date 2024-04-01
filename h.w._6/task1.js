const shoppingMallData = {
    shops: [
        {
            width: 10,
            length: 5
        },
        {
            width: 15,
            length: 7
        },
        {
            width: 20,
            length: 5
        },
        {
            width: 8,
            length: 10
        }
    ],
    height: 5,
    moneyPer1m3: 30,
    budget: 50000
}

function isBudgetEnough(data) {
    const totalSquare = data.shops.reduce((acc, item) => acc += item['width'] * item['length'],0)
    const volume = totalSquare * data['height'];
    return volume * data['moneyPer1m3'] <= data['budget'] ? 'Бюджета достаточно' : 'Бюджета недостаточно'
}
