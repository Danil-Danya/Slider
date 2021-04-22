class SLIDER {
    constructor (slid){
        this.container = document.querySelector('.container'); // подключение к контейнеру
        this.slider = document.querySelector(slid.slider); // подключение к слайдеру
        this.sliderChilder = document.querySelectorAll(slid.sliderItems); //страницы слайдера
        this.btnPrev = document.querySelector('.slider__prev'); //кнопки
        this.btnNext = document.querySelector('.slider__next');


        this.timer = slid.time != undefined ? slid.time : 1000; // проверка на существование ключа тайм в обьекте, в плохом случае подставляется число по умолчанию
        this.interval = slid.interval != undefined ? slid.interval : this.timer; // тоже самое только для сет интервала
        this.pos = slid.position.toUpperCase() == 'X' ? 'X' : 'Y'; // переводит значение ключа позишн к заглавным буквам (делается чтоб подставить как transformX)
        this.width = this.container.clientWidth;//указываем ширину
        this.height = this.slider.clientHeight;// длину
        this.sliderTransform = this.pos === this.width ? this.width : this.height; // проверка на х, у
        this.autoplay = slid.autoplay;


        this.activeSlide = 0;


        this.slider.style = `position:relative; 
                             width: 1110px; 
                             height: 720px;
                             overflow:hidden;`;// стили высота указана для наследования этой высоты и айтемов и картинок, ширина наследуется от контейнера.

        
        this.btnPrev.addEventListener('click', ()=> this.sliderActive(this.btnPrev));// вызов функции при нажатии кнопки вперед 
        this.btnNext.addEventListener('click', ()=> this.sliderActive(this.btnNext));// вызов функции при нажатии кнопки назад

        for (let i = 0; i < this.sliderChilder.length; i++) {
            let sliderObject = this.sliderChilder[i];

            // в цикле подключаемся ко всем айтемам для того что бы манипулировать над всеми

            sliderObject.style = `position: absolute;
                                  width: ${this.width}px;
                                  height: ${this.height}px;`;
            
            i != this.activeSlide ? sliderObject.style.transform = `translate${this.pos}(${this.sliderTransform}px)` : '';  // выставляет в ряд айтемы
            i === this.sliderChilder.length -1 ? `translate${this.pos}(${-this.sliderTransform}px)` : '';  // если пользователь раньше времени нажмет назад, то последний айтем вернется на -1 позицию и вернется к нулю        
        }
        

        

        this.slider.addEventListener('mouseenter', ()=> this.autoplayer());
        this.slider.addEventListener('mouseleave', ()=> clearInterval(this.intervalEbent));
    }


    sliderActive(btn){
        this.buttonOnOff();

        let btnLeftOrRight = btn == this.btnNext ? this.sliderTransform * -1 : this.sliderTransform; // делается для скрола в лево


        for (let i = 0; i < this.sliderChilder.length; i++) {
            let sliderObject = this.sliderChilder[i];

            sliderObject.style.transition =`0ms`;

            i != this.activeSlide ? sliderObject.style.transform = `translate${this.pos}(${btnLeftOrRight * -1}px)` : ''; // реализция переменой btnLeftOrRight
        }


        this.sliderChilder[this.activeSlide].style.transform = `translate${this.pos}(${btnLeftOrRight}px)`; // двигатель
        this.sliderChilder[this.activeSlide].style.transition = this.timer + `ms`; // плавность
        

        if (btn == this.btnNext) {
            this.activeSlide++;
            this.activeSlide == this.sliderChilder.length ? this.activeSlide = 0 : '';
        }else if (btn == this.btnPrev) {
            this.activeSlide--;
            this.activeSlide < 0 ? this.activeSlide = this.sliderChilder.length -1: ''; // это условие реализовывает движение по стронам, а так же высчитавает куда перейдет -1 айтем и 0
        }


        this.sliderChilder[this.activeSlide].style.transform = `translate${this.pos}(0px)`; // возвращает айтем на середину
        this.sliderChilder[this.activeSlide].style.transition = this.timer + `ms`;// плавность
    }

    autoplayer () { this.autoplay === true ? this.intervalEbent = setInterval(()=> this.sliderActive(this.btnNext), this.interval) : '' } // автоплей сделал методом так как мне он легче читается


    buttonOnOff () {
        this.btnNext.disabled = true;
        this.btnPrev.disabled = true;
        setTimeout(() => {
            this.btnNext.disabled = false;
            this.btnPrev.disabled = false;
        }, this.timer);
    }// Этот метод задает отключение кнопкок, по умолчанию они вкдючены, но при вызове функции они отлючаются, и тразишеном выполнения метода сладера
}

let slider = new SLIDER({
    slider: '.slider',
    sliderItems: '.slider__item',
    position: 'x',
    time: 1200,
    interval: 3000,
    autoplay: true
})