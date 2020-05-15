import initCursor from "./cursor";
import createSlider from "./slider";

const cursor = document.querySelector(".cursor");
const bar = document.querySelector(".bar");
const destroyBtn = document.querySelector(".js-destroy");
const initBtn = document.querySelector(".js-init");
const alertTag = document.querySelector(".js-alert");
const buttons = [...document.querySelectorAll("button")];

const mySlider = createSlider(".slider", ".slides", {
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

// Init if it's not a touch screen
if (
  !("ontouchstart" in window) ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0
) {
  mySlider.init();
  initCursor();

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
}

alertTag.addEventListener("click", (e) => {
  e.preventDefault();
  alert("It works");
});