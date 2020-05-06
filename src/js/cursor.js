const cursorTag = document.querySelector(".cursor");

let cursorX = 0;
let cursorY = 0;

let positionCursorX = 0;
let positionCursorY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.pageX;
  cursorY = e.pageY;
});

const initCursor = () => {
  positionCursorX += (cursorX - positionCursorX) * 0.15;
  positionCursorY += (cursorY - positionCursorY) * 0.15;

  cursorTag.setAttribute(
    "style",
    `top: ${Math.round(positionCursorY)}px; left: ${Math.round(
      positionCursorX
    )}px`
  );

  requestAnimationFrame(initCursor);
};

export default initCursor;
