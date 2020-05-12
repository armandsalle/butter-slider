import initCursor from "./cursor";
import createSlider from "./slider";

const cursor = document.querySelector(".cursor");
const bar = document.querySelector(".bar");
const destroyBtn = document.querySelector(".js-destroy");
const initBtn = document.querySelector(".js-init");
const buttons = [...document.querySelectorAll("button")];

initCursor();

const mySlider = createSlider(".slider", {
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

mySlider.init();

buttons.forEach((e) => {
  e.addEventListener("mousemove", () => {
    cursor.classList.add("btn-hover");
  });

  e.addEventListener("mouseleave", () => {
    cursor.classList.remove("btn-hover");
  });
});

destroyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mySlider.destroy();
});

initBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mySlider.init();
});
