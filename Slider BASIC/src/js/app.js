import initCursor from "./cursor";
import createSlider from "./slider";

initCursor();
const bar = document.querySelector(".bar");
createSlider(".slider", (e) => {
  bar.style.width = e + "%";
});
