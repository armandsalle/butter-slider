# Simple Draggable Slider

The slider is live [here](https://slider-drag.netlify.app/)

## Installation

Clone the repo.

Then:

1. Run: `npm run watch`
2. Run: `cd example`
3. Run: `npm run dev`

Entry point is in `src/index.js`. And demo site is in the `example` directory.

## How To Use

Import `createSlider` function in your app and create a new slider.

```javascript
createSlider(".slider", {
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
  multiplicateur: /* Integer : Slider speed */,
  smoothAmount: /* Integer : How many percent of the distance is use in the LERP function */,
});
```

PR are most welcome! Feel free to improve it.

## Next

- [x] Destroy slider
- [ ] Touch event listener
- [ ] Add an intersection observer to destroy the slider
- [x] Destroy and init keep positions of previous slide poisiton
- [ ] Add data attributes to control options (with Webflow)
- [x] Change scroll position to translate position
- [x] Make it more smooth
- [ ] Optimisation

Inspired by [Basic Agency website](https://basicagency.com/).
