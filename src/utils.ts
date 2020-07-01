export const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
}

export const isElement = (element: any): boolean => {
  return !!(<any>element instanceof Element || element instanceof HTMLDocument)
}

export const capitalizeDataset = (str: string): string => {
  const splitStr = str.toLowerCase().split('-')
  for (let i = 1; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join('')
}

export const getFloatNumber = (
  value: any,
  defaultValue: number,
  min: number,
  max: number
): number => {
  if (isNaN(+value)) {
    return +defaultValue.toFixed(3)
  }

  const v = parseFloat((+value).toFixed(3))

  return v > max ? +max.toFixed(3) : v < min ? +min.toFixed(3) : v
}

export const checkCallbackType = (option: any): boolean => {
  return !!(option && typeof option === 'function')
}

export const lerp = (start: number, end: number, alpha: number): number => {
  return start * (1 - alpha) + end * alpha
}

export const getEvent = (event: any): MouseEvent => {
  return event.targetTouches ? event.targetTouches[0] : event
}
