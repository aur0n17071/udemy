function slider({container, wrapper, slides, slideInner, counterWrapper, current, total, prewArrow, nextArrow}){
    // SLIDER
    const sliderCounter = document.querySelector(counterWrapper),
          sliderCurrent = sliderCounter.querySelector(current),
          sliderTotal = sliderCounter.querySelector(total),
          sliderPrev = sliderCounter.querySelector(prewArrow),
          sliderNext = sliderCounter.querySelector(nextArrow),
          sliderWrapper = document.querySelector(wrapper),
          sliderSlides = sliderWrapper.querySelectorAll(slides),
          sliderInner = sliderWrapper.querySelector(slideInner),
          slider = document.querySelector(container),
          width = parseInt(window.getComputedStyle(sliderWrapper).width);

    let slideIndex = 1,
        offset = 0,
        sliderDots = '';


    //SLIDER VER 2
    function slideStart () {
        sliderTotal.textContent = sliderSlides.length <= 9 ? `0${sliderSlides.length}` : sliderSlides.length;
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;

        sliderSlides.forEach(e => {
            e.style.width = width;
        })

        sliderWrapper.style.overflow = 'hidden';

        sliderInner.style.cssText = `
        display: flex;
        width: ${sliderSlides.length * 100}%;
        transition: all 0.5s ease;
        `;

        slider.style.position = 'relative';

    }

    const dotsContainer = document.createElement('ol'),
          dots = [];
    
    dotsContainer.classList.add('carousel-indicators');
    for (let i = 0; i < sliderSlides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if ( i == 0) {
            dot.style.opacity = 1;
        }
        dotsContainer.append(dot);
        dots.push(dot);
        
    }

    slider.append(dotsContainer);

    slideStart();

    sliderNext.addEventListener('click', () => {
        
        if (offset == width * (sliderSlides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += width;
            slideIndex++;
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;   
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    })

    sliderPrev.addEventListener('click', () => {
        
        if (offset == 0) {
            offset = width * (sliderSlides.length - 1);
            slideIndex = sliderSlides.length;
        } else {
            offset -= width;
            slideIndex--;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;   
        sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    })

    dots.forEach(el => {
        el.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = width * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;   
            sliderCurrent.textContent = slideIndex <= 9 ? `0${slideIndex}` : slideIndex;
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;