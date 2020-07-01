import { capitalizeDataset, isElement } from './utils'
import CreateSlider from './slider'
// eslint-disable-next-line no-unused-vars
import { Options } from './interfaces/options'

class AutoCreateSlider {
  sliders: CreateSlider[]
  initContainers: NodeListOf<HTMLElement>
  initSliders: NodeListOf<HTMLElement>
  initBars: NodeListOf<HTMLElement>

  constructor() {
    this.sliders = []
    this.initContainers = document.querySelectorAll('[data-butter-container]')
    this.initSliders = document.querySelectorAll('[data-butter-slidable]')
    this.initBars = document.querySelectorAll('[data-butter-progress]')

    this.init()
  }

  getOptions = (sliderName: string): object => {
    const optionsTag = <HTMLElement>(
      document.querySelector(`[data-butter-${sliderName}-options]`)
    )

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

      const options = optionsArr.reduce((acc, el) => {
        return {
          ...acc,
          [`${el.option}`]: el.value,
        }
      }, {})

      return options
    } else {
      return {}
    }
  }

  getProgressBar = (sliderName: string): Function | null => {
    const bar = Array.from(this.initBars).find(
      (el) => el.dataset.butterProgress === sliderName
    )

    if (isElement(bar)) {
      return (e) => {
        bar.style.willChange = 'width'
        bar.style.width = `${e}%`
      }
    } else {
      return null
    }
  }

  getSlider = (element: HTMLElement): Options => {
    const sliderName = element.dataset.butterContainer

    if (!sliderName) {
      throw new Error('You need to add a unique id on `data-butter-container`')
    }

    if (!isElement(element)) {
      throw new Error(`No container was found for this slider : ${sliderName}`)
    }

    const slider = Array.from(this.initSliders).find((el) => {
      return el.dataset.butterSlidable === sliderName
    })

    if (!isElement(slider)) {
      throw new Error(
        `No slidable element was found for this slider : ${sliderName}`
      )
    }

    return {
      container: element,
      slider: slider,
      ...this.getOptions(sliderName),
      getScrollPercent: this.getProgressBar(sliderName),
    }
  }

  init = (): void => {
    if (this.initContainers.length === 0 || this.initSliders.length === 0) {
      throw new Error('No container or slider selector.')
    }

    this.initContainers.forEach((e) => {
      const newSlider = this.getSlider(e)
      const newButterSlider = new CreateSlider(newSlider)

      this.sliders.push(newButterSlider)
    })
  }
}

const autoInit = (): CreateSlider[] => {
  const slidersList = new AutoCreateSlider()
  return slidersList.sliders
}

export default autoInit
