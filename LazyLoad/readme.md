# EventEmitter

> Es6 实现的图片和背景图懒加载效果；

## Installation

```javascript
import LazyLoad from 'path/lazyLoad.js'
```

## Usage example

```html
        <img src="img/loading.gif" alt="" data-lazy-src="img/1.jpg">
        <div data-lazy-background="img/2.jpg"></div>
        <script type="module">
            import LazyLoad from '../lazyLoad.js'
            const lazy = new LazyLoad({
                delay: 2000,
                useDebounce: true
            },function(elem){
                console.log(elem)
            })
        </script>
```

## API

### 初始化

```javascript
const lazy = new LazyLoad(options,callback);
```

### options


**1.useDebounce**

是否使用 debounce 模式，默认值为 `false`，使用 throttle 模式处理滚动事件，当设置为 true 是，使用 debounce 模式处理滚动事件

**2.delay**

默认值为 `250`

当 useDebounce 为 false 的时候，delay 表示滚动时每隔 delay 毫秒时检查一次是否有图片要加载。

当 useDebounce 为 true 的时候，delay 表示停止滚动后 delay 毫秒检查一次是否有图片要加载。

**3.top**

距离顶部视口还有多少 px 的时候就开始加载，默认为 0

**4.bottom**

距离视口底部还有多少 px 的时候就开始加载，默认为 0，当从上往下滚动时，应该使用的是 bottom。

**5.left**

距离视口左边还有多少 px 的时候就开始加载，默认为 0

**6.right**

距离视口右边还有多少 px 的时候就开始加载，默认为 0

### callback

当通过懒加载加载完一张图片时触发，每张图片都会触发一次：

```js
new LazyLoad(options,function(elem){
        // elem 表示该图片元素
        console.log(elem)
        // 你可以通过 elem 操作图片元素
        elem.className = 'loaded';
    }
})
```

## Release History

* 0.0.1
  *  program init

## Meta

logic – c2018@foxmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/C2015/github-link](https://github.com/C2015/)

