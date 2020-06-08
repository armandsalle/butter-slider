import { capitalizeDataset, isElement } from './utils'
import { CreateSlider } from './slider'

const autoInit = () => {
  const sliders = []
  const sliderTags = [...document.querySelectorAll('[data-slider-init]')]

  if (sliderTags.length === 0) return

  sliderTags.forEach((e) => {
    const data = { ...e.dataset }
    const sliderName = data.sliderInit

    if (!sliderName) {
      console.error('You need to add a unique id on `data-slider-init`')
      return
    }

    const sliderContainer = document.querySelector(
      `[data-slider-${sliderName}-container]`
    )

    if (!isElement(sliderContainer)) {
      console.error(`No container was found for this slider : ${sliderName}`)
      return
    }

    const slider = document.querySelector(
      `[data-slider-${sliderName}-slidable]`
    )

    if (!isElement(slider)) {
      console.error(`No slider was found for this slider : ${sliderName}`)
      return
    }

    const optionsTag = document.querySelector(
      `[data-slider-${sliderName}-options]`
    )

    const bar = document.querySelector(`[data-slider-${sliderName}-progress]`)

    let options

    if (isElement(optionsTag)) {
      const optionsStr =
        optionsTag.dataset[capitalizeDataset(`slider-${sliderName}-options`)]

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
