function cards (){
    class MenuCard {
        constructor(img, alt, title, text, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        render(){
            const card = document.createElement('div');
            if (this.classes.length == 0) {
                this.classes = 'menu__item';
                card.classList.add(this.classes);
            } else {
                this.classes.forEach(className => card.classList.add(className))
            }
            card.innerHTML = `
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parentSelector.append(card)
        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

    }

    //Reqiest for tabs create
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    // getResource('http://localhost:3000/menu1')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr,price}) => {
    //         new MenuCard(img, altimg, title, descr,price,'.menu .container').render();
    //     });

    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr,price}) => {
            new MenuCard(img, altimg, title, descr,price,'.menu .container').render();
        });
    });
}

module.exports = cards;