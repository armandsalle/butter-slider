# Butter Slider

[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com) [![Actions Status](https://github.com/armandsalle/Slider/workflows/Build/badge.svg)](https://github.com/armandsalle/Slider/actions) [![npm version](https://badge.fury.io/js/butter-slider.svg)](https://www.npmjs.com/package/butter-slider)

A [smooth, simple, lightweight, vanilla JS, no dependencies] drag and hold slider, made for easy setup.

Simple demo on [CodeSandbox](https://codesandbox.io/s/butter-slider-demo-rwxwi)

## News 📰

I'm currently working on the V1.2, with custom hooks and better performance. 👀
Follow me on Twitter to get the last news about Butter Slider: [@ArmandSalle](https://twitter.com/ArmandSalle) 🧈🧈🧈🧈

## Install

With NPM or Yarn

```
# With NPM
npm i --save butter-slider

# With Yarn
yarn add butter-slider
```

With a CDN

```html
<!-- For Webflow or no bundle project (ES5, no ES6 modules) -->
<script src="https://unpkg.com/butter-slider"></script>

<!-- ES6 with modules -->
<script src="https://unpkg.com/butter-slider@latest/dist/bundle.esm.js"></script>
```

Imports and init

```js
// With imports
import { CreateSlider, autoInit } from 'butter-slider'

const reallyCoolSlider = new CreateSlider(...)
const autoInitSlider = autoInit()
```

```js
// Without imports
const reallyCoolSlider = new butterSlider.CreateSlider(...)
const autoInitSlider = butterSlider.autoInit()
```

## Usage

There are 2 ways to use it. With pure javascript or with data-attributes directly on your HTML.

### With data-attributes and auto init

`autoButter` can be used only with data attributes and return an array with your sliders in it.

For auto init to works you need `data-butter-container` and `data-butter-slidable`. Value passed on the two data attributes need to be the same to works.

**Required**

```html
<div data-butter-container="myButterSliderName">
  <div data-butter-slidable="myButterSliderName">
    <slides />
  </div>
</div>

<!-- Scripts -->
<script src="https://unpkg.com/butter-slider@latest/dist/bundle.umd.js"></script>
<script>
  butterSlider.autoInit()
</script>
```

**Options with data attributes**

You can pass params with `data-butter-NAME-options`. You have access to 3 params : **smoothAmount**, **dragSpeed** and **hasTouchEvent**

```html
<div
  data-butter-myButterSliderName-options="smoothAmount:0.15,dragSpeed:2.5,hasTouchEvent:false"
></div>
```

**Progress bar**

If you want a simple progress bar add `data-butter-progress` on the element you want to anime with ease the width with the scroll amount.

```html
<div class="progress">
  <div class="bar" data-butter-progress="myButterSliderName"></div>
</div>
```

### Or with plain vanilla js

```js
// ES6 way
import { CreateSlider } from 'butter-slider'

const mySlider = new CreateSlider({
  container: '.slider-container', // Where to listen events
  slider: '.slider-items', // What to move
})

// No modules way
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
| setRelativePosition | function => value in pixel | -       | -        | If you want to use custom arrows to move the slider, this method is for you. But keep in mind, you need to code your own logic.          | -              |

**Functions**

If you want to use arrows, or move the slider by a specif distance, use setRelativePosition! 

```js
const myArrowTag = document.querySelector('.myArrow')
const mySlider = new butterSlider.CreateSlider({
  container: '.slider-container', // Where to listen events
  slider: '.slider-items', // What to move
})

// Each time the arrow is click, the slider will move to 500px
myArrowTag.addEventListener('click', () => {
  mySlider.setRelativePosition(500)
})
```

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
