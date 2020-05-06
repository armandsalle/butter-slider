export const map = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const roundToTwo = (num) => +(Math.round(num + "e+2") + "e-2");
