window.addEventListener('DOMContentLoaded', () => {

     const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            sliddesWrapper = document.querySelector('.offer__slider-wrapper'),
            width = window.getComputedStyle(sliddesWrapper).width,
            slidesField = document.querySelector('.offer__slider-inner'),
            slider = document.querySelector('.offer__slider'),
            // dark mode
            darkMode = document.querySelector('.dark-btn'),
            lightMode = document.querySelector('.light-btn');


            darkMode.addEventListener('click', () => {
                document.body.classList.toggle('dark')
            })

            lightMode.addEventListener('click', () => {
                document.body.classList.remove('dark')
            })


            // 5 
            let offset = 0 ;
            let slideIndex = 1;

            if (slides.length < 10){
                total.textContent = `0${slides.length}`;
                current.textContent = `0${slideIndex}`;

            } else {
                total.textContent = slides.length;
                current.textContent = slideIndex;
            }


            //2 
            slidesField.style.width = 100 * slides.length + '%';

            // 4 
            slidesField.style.display = 'flex'
            slidesField.style.transition = '0.5s all'
            sliddesWrapper.style.overflow = 'hidden'

            // 3 
            slides.forEach(slide => {
                slide.style.width = width;
            } )


        //////// 10
        slider.style.position = 'relative';
         let  dots = []
        let indicator = document.createElement('ol');
        indicator.style.cssText =`
            position: absolute;
            right: 0;
            bottom: 40px;
            left: 0;
            z-index: 15;
            display:flex;
            justify-content:center;
            margin-left:15%;
            margin-right:15%;
            list-style:none;
        `
        slider.append(indicator)

        for (let i = 0 ; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing:content-box;
                flex: 0 1 auto;
                width: 40px;
                height: 6px;
                margin-left: 3px;
                margin-right: 3px;
                cursor:pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `
            if (i == 0){
            dot.style.opacity = 1;
            }
            indicator.append(dot)
            dots.push(dot);
        }

            next.addEventListener('click', () => {
                if (offset == (width.slice(0, width.length - 2) * (slides.length - 1 ))){
                    offset = 0
                    console.log(offset);
                } else {
                    offset += +width.slice(0, width.length - 2);
                }

                slidesField.style.transform = `translateX(-${offset}px)`;

                // 8 
                if (slideIndex == slides.length) {
                    slideIndex = 1;
                } else {
                    slideIndex++;
                }

                if (slides.lenght < 10) {
                    current.textContent = `0${slideIndex}`;
                }  else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.4')
                dots[slideIndex - 1].style.opacity = 1 ;

            })

            ///// 11 

            dots.forEach(dot => {
                dot.addEventListener('click',e => {
                    const slideTo = e.target.getAttribute('data-slide-to');
                    slideIndex = slideTo;
                    offset = (+width.slice(0 , width.length - 2) * (slideTo - 1))

                    slidesField.style.transform = `translateX (-${offset}px)`

                    if (slides.length < 10) {
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
                    }
                    dots.forEach(dot => dot.style.opacity = '.4')
                    dots[slideIndex - 1].style.opacity = 1 ;
                })
            })


            //7 
            prev.addEventListener('click', () => {
                if (offset == 0 ){offset = +width.slice(0, width.length - 2) * (slides.length - 1);
                } else {
                    offset -= +width.slice(0, width.length - 2);
                }

                slidesField.style.transform = `translateX(-${offset}px)`;

                // 9
                if (slideIndex == 1 ){
                    slideIndex = slides.length;
                }  else {
                    slideIndex--;
                }

                if (slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }
            })
            



})