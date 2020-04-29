import { roundToTwo, map } from "./utils";

const cursor = document.querySelector(".cursor");

/**
 *
 * @param {string} target CSS selector of the slider
 * @param {function} callback return a value between 0 and 100 (scroll amount)
 */
const createSLider = (target, callback) => {
  const slider = document.querySelector(target);
  let down = false;
  let startX = 0;
  let scrollLeft = 0;
  let isAnimating = false;
  let x = 0;
  let dist = 0;
  let scrollPercent = (slider.scrollLeft * 100) / slider.offsetWidth;
  let scrollAmount = 0;
  // let prevBar = 0;
  // let prevScroll = 0;

  if (slider === null) {
    console.error("Target element does not exist on the page. ", target);
    return;
  }

  slider.addEventListener("mousedown", (e) => {
    if (!isAnimating) {
      anime();
    }

    down = true;

    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    slider.classList.add("active");
    cursor.classList.add("active");
  });

  slider.addEventListener("mouseleave", (e) => {
    down = false;

    slider.classList.remove("active");
    cursor.classList.remove("hover");
    cursor.classList.remove("active");
  });

  slider.addEventListener("mouseup", (e) => {
    down = false;

    slider.classList.remove("active");
    cursor.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    e.preventDefault();
    cursor.classList.add("hover");

    if (!down) return;

    x = e.pageX - slider.offsetLeft;
    dist = scrollLeft - (x - startX) * 3;
  });

  const anime = () => {
    isAnimating = true;

    // LERP functions
    scrollAmount += (dist - scrollAmount) * 0.03;

    slider.scrollLeft = Math.max(0, scrollAmount);

    scrollPercent = map(
      slider.scrollLeft,
      0,
      slider.scrollWidth - slider.offsetWidth,
      0,
      100
    );

    callback(roundToTwo(scrollPercent));

    // if (scrollAmount === prevScroll && scrollPercent === prevBar) {
    //   isAnimating = false;
    //   prevBar = 1;
    //   prevScroll = 1;
    //   cancelAnimationFrame(anime);
    // } else {
    // prevBar = scrollPercent;
    // prevScroll = scrollAmount;
    // }
    requestAnimationFrame(anime);
  };

  return null;
};

export default createSLider;
