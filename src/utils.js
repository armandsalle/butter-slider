export const map = (value, x1, y1, x2, y2) => {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
}

export const isElement = (element) => {
  return element instanceof Element || element instanceof HTMLDocument
}

export const capitalizeDataset = (str) => {
  const splitStr = str.toLowerCase().split('-')
  for (let i = 1; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join('')
}
