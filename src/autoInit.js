import { capitalizeDataset } from './utils'
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
    const slider = document.querySelector(
      `[data-slider-${sliderName}-slidable]`
    )
    const optionsTag = document.querySelector(
      `[data-slider-${sliderName}-options]`
    )
    const bar = document.querySelector(`[data-slider-${sliderName}-progress]`)

    let optionsArr = {}

    if (optionsTag) {
      const optionsStr =
        optionsTag.dataset[capitalizeDataset(`slider-${sliderName}-options`)]

      // From text like this "option:vlaue" to array like that [{option: optionName, value: theVlaue}]
      optionsArr = [...optionsStr.split(',')].reduce((acc, el) => {
        const newOption = {
          option: [...el.split(':')][0],
          value: [...el.split(':')][1],
        }

        return [...acc, { ...newOption }]
      }, [])
    }

    // From array [{option: optionName, value: theVlaue}] to object {optionName: theValue, optionName: theValue, ...}
    const options = optionsArr.reduce((acc, el) => {
      return {
        ...acc,
        [`${el.option}`]: `${el.value}`,
      }
    }, {})

    const mySLide = new CreateSlider({
      container: sliderContainer,
      slider: slider,
      ...options,
      scrollPercent: bar
        ? (e) => {
            bar.style.width = `${e}%`
          }
        : null,
    })

    sliders.push(mySLide)
  })

  return sliders
}

export { autoInit }
