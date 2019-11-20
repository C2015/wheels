class ScrollToTop{
    constructor(dom, options){
        this.dom = dom;
        this.options = Object.assign({
            showWhen: 100,
            speed: 100,
            fadeSpeed: 5
        },options);
        this.showTopDom = false;
        this.init();
    }
    static get VERSION(){
        return '0.0.1';
    }
    init(){
        if(ScrollToTop.getOffset().y > this.options.showWhen){
            this.showElement();
        }else{
            this.hideElement();
        }
        this.bindScroll();
        this.bindScrollToTop();
    }
    bindScroll(){
        window.addEventListener('scroll',()=>{
            const y = ScrollToTop.getOffset().y;
            if(y > this.options.showWhen && !this.showTopDom){
                this.showTopDom = true;
                ScrollToTop.fadeIn(this.dom, this.options.fadeSpeed);
            }else if(y < this.options.showWhen && this.showTopDom){
                this.showTopDom = false;
                ScrollToTop.fadeOut(this.dom, this.options.fadeSpeed);
            }
        })
    }
    bindScrollToTop(){
        this.dom.addEventListener('click',()=>{
            this.scrollTopHandle(ScrollToTop.getOffset().y);
        })
    }
    scrollTopHandle(scrollTop){
        const animationId = window.requestAnimationFrame(()=>{
            if(scrollTop - this.options.speed <=0){
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                window.cancelAnimationFrame(animationId);
                return ;
            }
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop - this.options.speed;
            this.scrollTopHandle(scrollTop - this.options.speed)
        })
    }
    hideElement(){
        this.showTopDom = false;
        ScrollToTop.setOpacity(this.dom, 0);
    }
    showElement(){
        this.showTopDom = true;
        ScrollToTop.setOpacity(this.dom, 100);
    }
    static fadeIn(element, speed){
        let opacity = 0;
        let timer;
        function step(){
            opacity += speed;
            ScrollToTop.setOpacity(element, opacity)
            timer = requestAnimationFrame(step);
            if(opacity >= 100){
                cancelAnimationFrame(timer);
            }
        }
        requestAnimationFrame(step);
    }
    static fadeOut(element, speed){
        let opacity = 100;
        let timer;
        function step(){
            opacity -= speed;
            ScrollToTop.setOpacity(element, opacity)
            timer = requestAnimationFrame(step);
            if(opacity <= 0){
                cancelAnimationFrame(timer);
            }
        }
        requestAnimationFrame(step);
    }
    static setOpacity(element, opacity){
        element.style.opacity = opacity/100;
    }
    static getOffset(){
        const x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        const y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return {
            x,
            y
        }
    }
}

export default ScrollToTop;