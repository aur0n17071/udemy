function calc(){
    const calcResult = document.querySelector('.calculating__result span');

    let sex = localStorage.getItem('sex') ?? 'female',
        ratio = localStorage.getItem('ratio') ?? 1.375,
        height, weight, age;

    function calculatorInit(parentElement, activeClass){
        const elements = document.querySelectorAll(`${parentElement} div`);

        localStorage.setItem('sex', sex);
        localStorage.setItem('ratio', ratio);

        elements.forEach(el => {
            el.classList.remove(activeClass);

            if(el.getAttribute('id') === localStorage.getItem('sex')){
                el.classList.add(activeClass);
            }
            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                el.classList.add(activeClass)
            }
        })
    }

    calculatorInit('#gender','calculating__choose-item_active')
    calculatorInit('.calculating__choose_big','calculating__choose-item_active')

    function calculatorTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            calcResult.textContent = '____';
            return;
        } else {
            if (sex == 'female') {
                calcResult.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
            } else {
                calcResult.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio)
            }
        }
    }

    calculatorTotal();

    function calculatorStaticInfo(parentElement, activeClass){
        const elements = document.querySelectorAll(`${parentElement} div`);

        elements.forEach(el => {
            el.addEventListener('click', (e) => {
                if (parentElement == '#gender') {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                } else {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                
                e.target.classList.add(activeClass);

                calculatorTotal();
            });
        });

        
    }

    calculatorStaticInfo('#gender','calculating__choose-item_active')
    calculatorStaticInfo('.calculating__choose_big','calculating__choose-item_active')

    function calculatorDynamicInfo(){
        const element = document.querySelector('.calculating__choose_medium');



        element.addEventListener('input', (e) => {

            if (e.target.value.match(/\D/g)){
                e.target.style.border = '1px solid red'
            } else {
                e.target.style.border = 'none'
            }

            switch(e.target.getAttribute('id')) {
                case'height' :
                    height = +e.target.value;
                    break;
                case'weight' :
                    weight = +e.target.value;
                    break;
                case'age' :
                    age = +e.target.value;
                    break;
            }
            
            calculatorTotal();
        });
    }

    calculatorDynamicInfo();
}

export default calc;