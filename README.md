# Simple Draggable Slider

[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
![Build pass](https://github.com/armandsalle/Slider/workflows/build/badge.svg)

Example with touch event and JS init here [here](https://slider-drag.netlify.app/).
Example without touch event and data-attributes init here [here](https://slider-drag.netlify.app/example-1.html).

## Instalation

You need to copy or download the javascript file in the `dist` folder, and put it right before your app script file, or import it with ES6 modules.

## How To Use

Import `createSlider` function in your app and create a new slider. Or access the global variable `slider`

```javascript
// With imports
import { CreateSlider } from './slider.js"
const mySlider = new CreateSlider({})

// Without imports
const mySlider = new slider.CreateSlider({
  container: '.slider-container',
  slider: '.slider-slidable',
  noTouchEvent: /* Default : true. Passe any value you want to disable the sldier on touch screen*/,
  multiplicateur: /* Default : 1. Slider speed */,
  smoothAmount: /* Default : 0.15. How many percent of the distance is use in the LERP function */,
  mouseEnter: () => {
    // When the cursor enter the slider
  },
  mouseLeave: () => {
    // When the cursor leave the slider
  },
  mouseDown: () => {
    // When the user click on the slider
  },
  mouseUp: () => {
    // When the user unclick
  },
  scrollPercent: (e) => {
    // This function is triggered when the slider slide.
    // it return an number between 0 and 100, depending on the scroll position
  },
});
```

If you don't want to setup a javascript class and options, you can use data-attributes in your HTML.

```html
<div class="slider" data-slider-init="plop" data-slider-plop-container>
  <div
    class="slides"
    data-slider-plop-slidable
    data-slider-plop-options="smoothAmount:0.3,multiplicateur:2,noTouchEvent:true"
  >
    <div class="slide">
      <div class="logo"></div>
      <div class="divider"></div>
      <h5 class="title"><a href="https://google.fr">GOOGLE</a></h5>
      <p class="content">
        Gummies biscuit powder fruitcake bear claw cake cupcake danish apple
        pie. Cotton candy pudding jelly-o. Jujubes jelly pie tiramisu cake
        cookie gummies pie chocolate cake. Marzipan muffin jelly.
      </p>
    </div>
    ...
  </div>
</div>
<div class="progress">
  <div class="bar" data-slider-plop-progress></div>
</div>
```

```javascript
slider.autoInit()
```

First you need to init a new slider with an unique id with `data-slider-init="SLIDER_NAME"`. Then use `data-slider-SLIDER_NAME-container` on the container. Then use `data-slider-SLIDER_NAME-slidable` on the slidable element. You can pass options if you want (smoothAmount, multiplicateur and noTouchEvent) with `data-slider-SLIDER_NAME-options="smoothAmount:0.3,multiplicateur:2,noTouchEvent:true"`. And if you want tu use a custom progress bar, add `data-slider-SLIDER_NAME-progress` on the bar. It will change the width (between 0% and 100%) depending on the scroll position of the slider.

## How to setup localy

Clone the repo.

Then:

1. `npm run watch`
2. `cd example`
3. `npm run dev`

Entry point is in `src/index.js`. And demo site is in the `example` directory.
PR are most welcome! Feel free to improve it.

## Next

- [ ] Add an intersection observer to destroy the slider
- [ ] Optimisation
- [ ] Handle errors
- [ ] Better doc
- [ ] Create releases
- [ ] Put the code on a CDN
- [ ] Create a npm package
- [x] Destroy slider
- [x] Touch event listener
- [x] Destroy and init keep positions of previous slide poisiton
- [x] Add data attributes to control options (with Webflow)
- [x] Change scroll position to translate position
- [x] Make it more smooth

Inspired by [Basic Agency website](https://basicagency.com/).
