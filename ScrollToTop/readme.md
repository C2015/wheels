# EventEmitter

> Es6 implementation back to the top of the library；

## Installation

```javascript
import ScrollToTOP from 'path/ScrollToTop.js'
```

## Usage example

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>test scrollToTop</title>
        <style>
            body{
                height: 2000px;
            }
            .top{
                position: fixed;
                bottom: 40px;
                right: 40px;
                width: 30px;
                height: 30px;
                background: greenyellow;
                cursor: pointer;
                opacity: 0;
            }
        </style>
    </head>
    <body>
        <div class="top"></div>
        <script type="module">
            import ScrollToTop from './scrollToTop.js'
            new ScrollToTop(document.querySelector('.top'),{
                speed: 100,
                fadeSpeed: 10,
                showWhen: 100
            });
        </script>
    </body>
    </html>
```

## API

### 初始化

```javascript
var toTop = new ScrollToTop("selector", options);
```

### options

**1.showWhen**

默认值为 100，表示滚动条向下滑动 100px 时，出现回到顶部按钮

**2.speed**

回到顶部的速度。默认值为 100，数值越大，速度越快。

100 表示浏览器每次重绘，scrollTop 就减去 100px。

**3.fadeSpeed**

元素淡入和淡出的速度。默认值为 10，数值越大，速度越快。

10 表示浏览器每次重绘，元素透明度以 10% 递增或者递减。

## Release History

* 0.0.1
  *  program init

## Meta

logic – c2018@foxmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/C2015/github-link](https://github.com/C2015/)

