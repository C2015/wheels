import EventEmitter from './eventEmitter';
const eventEmitter = new EventEmitter();
const eventName = 'addToCart';
// on event
const sysbolGood = eventEmitter.on(eventName,function(){
    console.log('good count add one');
});
const sysbolStore = eventEmitter.on(eventName',function(){
    console.log('store count sub one');
});
const sysbolAnimation = eventEmitter.once(eventName',function(){
    console.log('animation show');
});
eventEmitter.emit(eventName);
eventEmitter.off(eventName,sysbolStore);
eventEmitter.emit(eventName);