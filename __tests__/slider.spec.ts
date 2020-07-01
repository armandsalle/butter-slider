import CreateSlider from '../src/slider'

describe('Test slider.ts', () => {
  const container = document.createElement('div')
  const wrapper = document.createElement('div')

  test('Should create a basic slider', () => {
    const mySlider = new CreateSlider({
      container,
      slider: wrapper,
    })

    expect(mySlider).toBeTruthy()
  })

  test('Should not return a slider', () => {
    try {
      // eslint-disable-next-line no-new
      new CreateSlider({ container: '', slider: '' })
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
})
