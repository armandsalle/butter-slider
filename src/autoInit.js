import { capitalizeDataset, isElement } from './utils'
import { CreateSlider } from './slider'

const autoInit = () => {
  const sliders = []
  const initContainers = [
    ...document.querySelectorAll('[data-butter-container]'),
  ]
  const initSliders = [...document.querySelectorAll('[data-butter-slidable]')]
  const initBars = [...document.querySelectorAll('[data-butter-progress]')]

  if (initContainers.length === 0) return

  initContainers.forEach((e) => {
    const sliderContainer = e
    const sliderName = e.dataset.butterContainer

    if (!sliderName) {
      console.error('You need to add a unique id on `data-butter-container`')
      return
    }

    if (!isElement(e)) {
      console.error(`No container was found for this slider : ${sliderName}`)
      return
    }

    const slider = initSliders.find((el) => {
      return el.dataset.butterSlidable === sliderName
    })

    if (!isElement(slider)) {
      console.error(
        `No slidable element was found for this slider : ${sliderName}`
      )
      return
    }

    const optionsTag = document.querySelector(
      `[data-butter-${sliderName}-options]`
    )

    const bar = initBars.find((el) => el.dataset.butterProgress === sliderName)

    let options

    if (isElement(optionsTag)) {
      const optionsStr =
        optionsTag.dataset[capitalizeDataset(`butter-${sliderName}-options`)]

      // From text like this "option:vlaue" to array like that [{option: optionName, value: theVlaue}]
      const optionsArr = [...optionsStr.split(',')].reduce((acc, el) => {
        const newOption = {
          option: [...el.split(':')][0],
          value: [...el.split(':')][1],
        }

        return [...acc, { ...newOption }]
      }, [])

      options = optionsArr.reduce((acc, el) => {
        return {
          ...acc,
          [`${el.option}`]: `${el.value}`,
        }
      }, {})
    }

    // From array [{option: optionName, value: theVlaue}] to object {optionName: theValue, optionName: theValue, ...}

    const newButterSlider = new CreateSlider({
      container: sliderContainer,
      slider: slider,
      ...options,
      getScrollPercent: isElement(bar)
        ? (e) => {
            bar.style.width = `${e}%`
          }
        : null,
    })

    sliders.push(newButterSlider)
  })

  return sliders
}

export { autoInit }
