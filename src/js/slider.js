import { roundToTwo, map } from "./utils";

/**
 *
 * @param {string} target CSS selector of the slider
 * @param {object} options callback options
 */
const createSLider = (target, options) => {
  const slider = document.querySelector(target);
  let down = false;
  let startX = 0;
  let scrollLeft = 0;
  let isAnimating = false;
  let x = 0;
  let dist = 0;
  let scrollPercent = (slider.scrollLeft * 100) / slider.offsetWidth;
  let scrollAmount = 0;

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
    if (options?.mouseDown && typeof options?.mouseDown === "function") {
      options.mouseDown();
    }
  });

  slider.addEventListener("mouseleave", (e) => {
    down = false;

    slider.classList.remove("active");

    if (options?.mouseLeave && typeof options?.mouseLeave === "function") {
      options.mouseLeave();
    }
  });

  slider.addEventListener("mouseup", (e) => {
    down = false;

    slider.classList.remove("active");
    if (options?.mouseUp && typeof options?.mouseUp === "function") {
      options.mouseUp();
    }
  });

  slider.addEventListener("mousemove", (e) => {
    e.preventDefault();

    if (options?.mouseEnter && typeof options?.mouseEnter === "function") {
      options.mouseEnter();
    }

    if (!down) return;

    x = e.pageX - slider.offsetLeft;
    dist = scrollLeft - (x - startX) * 3;
  });

  const anime = () => {
    isAnimating = true;

    // Can't go over the slider
    if (dist + scrollAmount <= 0) {
      dist = 0;
    }
    if (dist >= slider.scrollWidth - slider.offsetWidth) {
      dist = slider.scrollWidth - slider.offsetWidth;
    }

    // LERP functions
    scrollAmount += (dist - scrollAmount) * 0.06;

    slider.scrollLeft = scrollAmount;

    scrollPercent = map(
      slider.scrollLeft,
      0,
      slider.scrollWidth - slider.offsetWidth,
      0,
      100
    );

    if (options?.callback && typeof options?.callback === "function") {
      options.callback(roundToTwo(scrollPercent));
    }

    requestAnimationFrame(anime);
  };

  return null;
};

export default createSLider;
