class EventEmitter{
    constructor(){
        this.eventObj={};
    }
    static get VERSION(){
        return '0.0.1';
    }
    /**
     * add event 
     * @param {String} eventName 
     * @param {Function} listener 
     * @return {Symbol} unique 
     */
    on(eventName,listener){
        if(typeof listener !== 'function' && typeof listener.listener !== 'function'){
            throw new TypeError('listener must be function');
            return ;
        }
        if(!this.eventObj.hasOwnProperty(eventName)){
            this.eventObj[eventName] = []
        }
        const listenerSymbol = Symbol(listener.name);
        typeof listener === 'function' ? listener = {
            listener,
            id: listenerSymbol
        } : listener.id = listenerSymbol;  
        this.eventObj[eventName].push(listener);
        return listenerSymbol;
    }
    /**
     * delete event
     * @param {String} eventName 
     * @param {Symbol} listenerSymbol 
     */
    off(eventName,listenerSymbol){
        if(!this.eventObj.hasOwnProperty(eventName)){
            throw new Error('eventName not exist');
            return ;
        }
        if(listenerSymbol === undefined){
            this.eventObj[eventName] = [];
        }
        const listeners = this.eventObj[eventName];
        let index = 0;
        for(const listener of listeners){
            if(listener.id === listenerSymbol){
                this.eventObj[eventName].splice(index,1);
                return ;
            }
            index++;
        }
    }
    /**
     * add once event
     * @param {String} eventName 
     * @param {Function} listener 
     */
    once(eventName,listener){
        this.on(eventName,{
            listener,
            once: true
        })
    }
    /**
     * emit event
     * @param {String} eventName 
     * @param  {...any} args 
     */
    emit(eventName,...args){
        if(!this.eventObj.hasOwnProperty(eventName)){
            throw new Error('eventName not exist');
            return ;
        }
        const listeners = this.eventObj[eventName];
        for(const listener of listeners){
            listener.listener.apply(this,args);
            if(listener.once){
                this.off(eventName, listener.id);
            }
        }
        
    }
}

export default EventEmitter;