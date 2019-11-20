/*
 * @Description: LazyLoad 图片懒加载类库
 * @Author: logic
 * @Email: c2018@foxmail.com
 * @Date: 2019-11-20 11:29:31
 * @LastEditTime: 2019-11-20 17:15:36
 */
class LazyLoad{
    constructor(options,callback = _ => {}){
        this.options = Object.assign( {
            useDebounce: false,
            delay: 250,
            top:0,
            bottom:0,
            left:0,
            right:0
        },options)
        this.init();
    }

    init(){
        this.getViewRect();
        this.bindEvent();
        this.render();
    }
    getViewRect(){
        const {top, bottom, left, right} = this.options;
        const height = window.innerHeight;
        const width = window.innerWidth;

        this.viewRect = {
            top: 0 - top,
            left: 0 - left,
            bottom: height + bottom,
            right: width + right
        }
    }
    bindEvent(){
        const {useDebounce, delay} = this.options;
        const render = useDebounce ? LazyLoad.debounce(this.render,delay) : LazyLoad.throttle(this.render,delay);

        const scrollHandle = (event) => {
            render.call(this, event);
        }
        const resizeHandle = (event) => {
            this.getViewRect();
            render.call(this, event);
        }
        this.event ={
            scroll: scrollHandle,
            resize: resizeHandle,
            load: scrollHandle
        }
        window.addEventListener('scroll',scrollHandle);
        window.addEventListener('resize',resizeHandle);
        window.addEventListener('load',scrollHandle)
    }
    unBindEvent(){
        window.removeEventListener('scroll', this.event.scroll)
        window.removeEventListener('resize', this.event.resize)
        window.removeEventListener('load', this.event.load)
    }
    render(){
        const viewRect = this.viewRect;
        const doms = document.querySelectorAll('[data-lazy-src],[data-lazy-background]');
        let domRect = {};
        for(const dom of doms){
            domRect = dom.getBoundingClientRect();
            if(domRect.left < viewRect.right && domRect.top < viewRect.bottom && domRect.right > viewRect.left && domRect.bottom > viewRect.top){
                const lazySrc = dom.getAttribute('data-lazy-src');
                if(lazySrc){
                    dom.src = lazySrc;
                    dom.removeAttribute('data-lazy-src');
                }else {
                    dom.style.backgroundImage = dom.getAttribute('data-lazy-background');
                    dom.removeAttribute('data-lazy-background');
                }
            }
        }
        if(doms.length === 0){
            this.unBindEvent();
        }
    }
    static throttle(func, wait){
        let timer;
        return function(){
            const context = this;
            const args = arguments;
            if(!!timer){
                return ;
            }
            timer = setTimeout(() => {
                func.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
    static debounce(func, wait){
        let timer;
        return function(){
            const context = this;
            const args = arguments;
            if(!!timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
}

export default LazyLoad;