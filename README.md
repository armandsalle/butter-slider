# Simple Draggable Slider

Here is a demo
![Demo gif](./demo.gif)

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

Inspired by [Basic Agency website](https://basicagency.com/).
