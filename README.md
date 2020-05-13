# Simple Draggable Slider

The slider is live [here](https://slider-drag.netlify.app/)

## Installation

Clone the repo and install `parcel` globally. You need npm on your machine.

Then:

1. Run: `parcel index.html`.

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
  callback: (e) => {
    // This function is triggered when the slider slide.
    // it return an number between 0 and 100, depending on the scroll position
  },
});
```

PR are most welcome! Feel free to improve it.

## Next

- [x] Destroy slider
- [ ] Touch event listener
- [ ] Add an intersection observer to destroy the slider
- [ ] Destroy and init keep positions of previous slide poisiton
- [ ] Add data attributes to control options (with Webflow)
- [ ] Optimisation
- [ ] Make it more smooth

Inspired by [Basic Agency website](https://basicagency.com/).
