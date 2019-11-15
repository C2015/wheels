class ScrollToTop{
    constructor(dom, options = {
        showWhen: 100,
        speed: 100,
        fadeSpeed: 10
    }){
        this.dom = dom;
        this.options = options;
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
            if(y > this.options.showWhen){
                this.showElement();
            }else{
                this.hideElement();
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
        const dom = this.dom;
        let opacity = 100;
        let reqId;
        let setOpacity = ()=>{
            opacity-=this.options.fadeSpeed;
            this.dom.style.opacity = opacity/100;
            reqId = requestAnimationFrame(setOpacity)
            if(opacity <= 0){
                cancelAnimationFrame(reqId);
            }
            opacity-=this.options.fadeSpeed;
        }
        reqId =requestAnimationFrame(setOpacity);
    }
    showElement(){
        const dom = this.dom;
        let opacity = 0;
        let reqId;
        let setOpacity = ()=>{
            opacity += this.options.fadeSpeed;
            this.dom.style.opacity = opacity/100;
            reqId = requestAnimationFrame(setOpacity)
            if(opacity >= 100 ){
                cancelAnimationFrame(reqId);
            }
            opacity += this.options.fadeSpeed;
        }
        reqId = requestAnimationFrame(setOpacity);
    }
    setOpacity(){
        this.dom.style.opacity = opacity/100;
        
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