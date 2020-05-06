import initCursor from "./cursor";
import createSlider from "./slider";

const cursor = document.querySelector(".cursor");
const bar = document.querySelector(".bar");

initCursor();

createSlider(".slider", {
  mouseEnter: () => {
    cursor.classList.add("hover");
  },
  mouseLeave: () => {
    cursor.classList.remove("hover");
    cursor.classList.remove("active");
  },
  mouseDown: () => {
    cursor.classList.add("active");
  },
  mouseUp: () => {
    cursor.classList.remove("active");
  },
  callback: (e) => {
    bar.style.width = e + "%";
  },
});
