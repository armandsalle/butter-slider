import { roundToTwo, map } from "./utils";

/**
 *
 * @param {string} container CSS selector of the slider
 * @param {string} slidable CSS selector of the slider
 * @param {object} options callback options
 */
const createSLider = (container, slidable, options) => {
  const containerSlider = document.querySelector(container);
  const slider = document.querySelector(slidable);

  let down = false;
  let startX = 0;
  let scrollLeft = 0;
  let isAnimating = false;
  let x = 0;
  let dist = 0;
  let scrollAmount = 0;
  let stopAnimation = false;

  if (slider === null) {
    console.error("Target element does not exist on the page. ", target);
    return;
  }

  const mousedown = (e) => {
    if (!isAnimating) {
      anime();
    }

    down = true;

    startX = e.pageX - slider.offsetLeft;
    scrollLeft = scrollAmount;

    slider.classList.add("active");
    if (options?.mouseDown && typeof options?.mouseDown === "function") {
      options.mouseDown();
    }
  };

  const mouseleave = (e) => {
    down = false;

    slider.classList.remove("active");

    if (options?.mouseLeave && typeof options?.mouseLeave === "function") {
      options.mouseLeave();
    }
  };

  const mouseup = (e) => {
    down = false;

    slider.classList.remove("active");
    if (options?.mouseUp && typeof options?.mouseUp === "function") {
      options.mouseUp();
    }
  };

  const mousemove = (e) => {
    e.preventDefault();

    if (options?.mouseEnter && typeof options?.mouseEnter === "function") {
      options.mouseEnter();
    }

    if (!down) return;

    x = e.pageX - slider.offsetLeft;
    dist = scrollLeft - (x - startX) * 2;
  };

  const getScrollPercent = () => {
    const scrollPercent = map(
      scrollAmount,
      0,
      slider.scrollWidth - slider.offsetWidth,
      0,
      100
    );

    if (options?.callback && typeof options?.callback === "function") {
      options.callback(roundToTwo(scrollPercent));
    }
  };

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
    scrollAmount += (dist - scrollAmount) * 0.15;

    slider.style.transform = `translateX(${-scrollAmount.toFixed(2)}px)`;

    getScrollPercent();

    if (!stopAnimation) {
      requestAnimationFrame(anime);
    } else {
      cancelAnimationFrame(anime);
    }
  };

  const init = () => {
    down = false;
    startX = 0;
    scrollLeft = 0;
    isAnimating = false;
    x = 0;
    dist = 0;
    scrollAmount = 0;
    stopAnimation = false;

    slider.style.transform = "translateX(0px)";
    getScrollPercent();

    containerSlider.addEventListener("mousedown", mousedown);
    containerSlider.addEventListener("mouseleave", mouseleave);
    containerSlider.addEventListener("mouseup", mouseup);
    containerSlider.addEventListener("mousemove", mousemove);
  };

  const destroy = () => {
    stopAnimation = true;
    containerSlider.removeEventListener("mousedown", mousedown);
    containerSlider.removeEventListener("mouseleave", mouseleave);
    containerSlider.removeEventListener("mouseup", mouseup);
    containerSlider.removeEventListener("mousemove", mousemove);
  };

  return {
    init,
    destroy,
  };
};

export default createSLider;
