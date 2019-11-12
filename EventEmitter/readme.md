# EventEmitter

> this is easy subscribe and publish, and use ES6 write;

## Installation

```javascript
import eventEmitter from 'path/eventEmitter.js'
```

## Usage example

```javascript
    import EventEmitter from './eventEmitter.js';
    const eventEmitter = new EventEmitter();
    const eventName = 'addToCart';
    // on event
    const symbolGood = eventEmitter.on(eventName,function(){
        console.log('good count add one');
    });
    const symbolStore = eventEmitter.on(eventName,function(){
        console.log('store count sub one');
    });
    const symbolAnimation = eventEmitter.once(eventName,function(){
        console.log('animation show');
    });
    eventEmitter.emit(eventName);// good count add one. store count sub one. animation show.
    eventEmitter.off(eventName, symbolStore);
    eventEmitter.emit(eventName);// good count add one.
```

## Release History

* 0.0.1
  *  program init

## Meta

logic – c2018@foxmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/C2015/github-link](https://github.com/C2015/)

