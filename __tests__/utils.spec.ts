import {
  map,
  lerp,
  checkCallbackType,
  getFloatNumber,
  capitalizeDataset,
  isElement,
} from '../src/utils'

describe('Test utils.ts', () => {
  test('Should map a number', () => {
    const mapNumber = map(0.5, 0, 1, 0, 10)

    expect(mapNumber).toBe(5)
  })

  test('Should say if it is an HTML element or not', () => {
    const myElement = document.createElement('div')
    const truthyRes = isElement(myElement)
    const falsyRes = isElement('div')

    expect(truthyRes).toBeTruthy()
    expect(falsyRes).toBeFalsy()
  })

  test('Should output a capitalize dataset', () => {
    const dataAtt = capitalizeDataset('butter-slider-cool-dab')
    const string = capitalizeDataset('hello')

    expect(dataAtt).toBe('butterSliderCoolDab')
    expect(string).toBe('hello')
  })

  test('Should give a float number', () => {
    const getMaxValue = getFloatNumber(2, 0.15, 0, 1)
    const getMinValue = getFloatNumber(0, 1, 0.4567, 5)
    const getToFixedValue = getFloatNumber(0.2222222, 0.1, 0, 1)
    const getDefaultValue = getFloatNumber('hello', 1, 0, 10)

    expect(getMaxValue).toBe(1)
    expect(getToFixedValue).toBe(0.222)
    expect(getMinValue).toBe(0.457)
    expect(getDefaultValue).toBe(1)
  })

  test('Should say if it is a function or note', () => {
    const myFunc = function () {}
    const myNoFunc = 'This is not a function'
    const isFucntion = checkCallbackType(myFunc)
    const isNotFucntion = checkCallbackType(myNoFunc)

    expect(isFucntion).toBeTruthy()
    expect(isNotFucntion).toBeFalsy()
  })

  test('Should give a lerp distance', () => {
    expect(lerp(10, 1, 0)).toBe(10)
    expect(lerp(0, 1, 0.5)).toBe(0.5)
  })

  // Not sure how to test getEvent function
})
