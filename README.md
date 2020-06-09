# Butter Slider

[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

[![Actions Status](https://github.com/armandsalle/Slider/workflows/Build/badge.svg)](https://github.com/armandsalle/Slider/actions)

A [smooth, simple, lightweight, vanilla JS, no dependencies] drag and hold slider, made for easy setup.

## Install

With NPM or Yarn

```
# With NPM
npm i --save butter-slider

# With Yarn
yarn add butter-slider
```

With a CDN

````html
<!-- For Webflow or no bundle project (ES5, no ES6 modules) -->
<srcipt
  src="https://unpkg.com/butter-slider@latest/dist/bundle.umd.js"
></srcipt>

<!-- ES6 with modules -->
<srcipt
  src="https://unpkg.com/butter-slider@latest/dist/bundle.esm.js"
></srcipt>

** Imports and init ** 

```js
# With imports
import { CreateSlider, autoInit } from 'butter-slider'
const reallyCoolSlider = new CreateSlider(...)
const autoInitSliders = autoInit()
```

```js
# Without imports
const reallyCoolSlider = new butterSlider.CreateSlider(...)
const autoInitSliders = butterSlider.autoInit()
```

## Usage

There is 2 ways to use it. With pure javascript or with data-attributes directly on yout HTML.

### With data-attributes and auto init

`autoButter` can be used only with data attributes and return an array with your sliders in it.

```html
<body data-slider-init="toast">
  <div class="slider-container" data-slider-toast-container>
    <div class="slider-items" data-slider-toast-slidable>
      <div class="slide">
        <p>
          Hello,
        </p>
      </div>
      <div class="slide">
        <p>
          Is it me
        </p>
      </div>
      <div class="slide">
        you're looking for
      </div>
      ...
    </div>
  </div>

  <srcipt src="unpkg.com/butter-slider@latest/bundle.umd.js"></srcipt>
  <script>
    butterSlider.autoInit()
  </script>
</body>
```

**Options with data attributes**

You can pass params with `data-slider-toast-options`

```html
<div
  class="slider-container"
  data-slider-toast-container
  data-slider-toast-options="smoothAmount:0.15,dragSpeed:2.5,hasTouchEvent:false"
></div>
```

**Bonus**

If you want a simple progress bar add `data-slider-toast-progress` on the element you want to anime with ease the width with the scroll amount.

```html
<div class="progress">
  <div class="bar" data-slider-toast-progress></div>
</div>
```

### Or with plain vanilla js

```js
# ES6 way
import { CreateSlider } from 'butter-slider'

const mySlider = new CreateSlider({
  container: '.slider-container', // Where to listen events
  slider: '.slider-items', // What to move
})

# No modules way
const mySlider = new butterSlider.CreateSlider({
  container: '.slider-container', // Where to listen events
  slider: '.slider-items', // What to move
})
```

## Options

**Params**

| Name             | Type                         | Default | Required | Description                                                                                                             | Data-atributes |
| ---------------- | ---------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | -------------- |
| container        | string, DOM element          | -       | YES      | Where to listen events                                                                                                  | YES            |
| slider           | string, DOM element          | -       | YES      | What to move                                                                                                            | YES            |
| dragSpeed        | number, string               | 1.00    | -        | Amount of speed. Can be a float number                                                                                  | YES            |
| smoothAmount     | number, string               | 0.15    | -        | Amount of smooth. Can be a float number                                                                                 | YES            |
| hasTouchEvent    | bool                         | False   | -        | Touch devices have already a hold and drag slider built-in.<br /> But if you want to use Butter Slider instead you can. | YES            |
| mouseEnter       | function                     | -       | -        | Call when mouse enter the container. Usefull for cursor effect.                                                         | -              |
| mouseDown        | function                     | -       | -        | Call when click in the container. Usefull for cursor effect.                                                            | -              |
| mouseUp          | function                     | -       | -        | Call when release the click in the container. Usefull for cursor effect.                                                | -              |
| getScrollPercent | function => value in percent | -       | -        | Call on every frame with the amount of scroll in percent (between 0 and 100). Usefull for custom progress bar.          | -              |

**Functions**

If you want to destroy your slider you can cann `destroy()`methods like this

```js
const mySlider = new butterSlider.CreateSlider({
  container: '.slider-container', // Where to listen events
  slider: '.slider-items', // What to move
})

mySlider.destroy()
```

And if you want to init it again you can call `init()`like this

```js
mySlider.init()
```

It works also with autoInit

```js
const sliders = butterSlider.autoInit() // return an array of instances of sliders
sldiers.forEach((el) => {
  el.destroy()
  // or
  el.init()
})
```
