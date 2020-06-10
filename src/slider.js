import { map, isElement, getFloatNumber } from './utils'

/** Class creating a butter slider. */
class CreateSlider {
  /**
   * Create a new slider with params.
   * @param {string|HTMLElement} container - Element where listeners will be add.
   * @param {string|HTMLElement} slider - Element that will move.
   * @param {boolean} [hasTouchEvent=false] - Add touch envents.
   * @param {number|string} [dragSpeed=1] - Speed of the drag and hold.
   * @param {number|string} [smoothAmount=0.15] - Smooth amount.
   * @param {function} [mouseEnter] - Callback call when mouse enter the container.
   * @param {function} [mouseLeave] - Callback call when mouse leave the container.
   * @param {function} [mouseUp] - Callback call when user release click on the container.
   * @param {function} [mouseDown] - Callback call when user press click on the container.
   * @param {function(int)} [getScrollPercent] - Callback call at each frames and return the scroll amount in percent between 0 and 100.
   */
  constructor(options) {
    this.options = { ...options }

    if ((!this.options.container && !this.options.slider) || !this.options) {
      console.error('No container and slider selector.')
      return
    } else {
      this.containerTag = isElement(this.options?.container)
        ? this.options?.container
        : document.querySelector(this.options?.container)
      this.sliderTag = isElement(this.options?.slider)
        ? this.options?.slider
        : document.querySelector(this.options?.slider)
    }

    if (this.sliderTag === null) {
      console.error(
        'Target element does not exist on the page.',
        this.sliderTag
      )
      return
    } else if (this.containerTag === null) {
      console.error(
        'Target element does not exist on the page.',
        this.containerTag
      )
      return
    }

    if (
      this.options?.hasTouchEvent === true &&
      this.options?.hasTouchEvent === 'true'
    ) {
      this.options.hasTouchEvent = true
    } else if (
      !this.options?.hasTouchEvent ||
      this.options?.hasTouchEvent === 'false'
    ) {
      this.options.hasTouchEvent = false
    }

    this.dragSpeed = getFloatNumber(this.options?.dragSpeed, 1)
    this.smoothAmount = getFloatNumber(this.options?.smoothAmount, 0.15)
    this.down = false
    this.startX = 0
    this.scrollLeft = 0
    this.isAnimating = false
    this.x = 0
    this.dist = 0
    this.scrollAmount = 0
    this.stopAnimation = false

    this.init()
  }

  checkCallbackType = (option) => !!(option && typeof option === 'function')

  callCallback = (type, value) => {
    switch (type) {
      case 'mousedown':
        if (this.checkCallbackType(this.options?.mouseDown)) {
          this.options.mouseDown()
        }
        break
      case 'mouseleave':
        if (this.checkCallbackType(this.options?.mouseLeave)) {
          this.options.mouseLeave()
        }
        break
      case 'mouseup':
        if (this.checkCallbackType(this.options?.mouseUp)) {
          this.options.mouseUp()
        }
        break
      case 'mousemove':
        if (this.checkCallbackType(this.options?.mouseEnter)) {
          this.options.mouseEnter()
        }
        break
      case 'getscrollpercent':
        if (this.checkCallbackType(this.options?.getScrollPercent)) {
          this.options.getScrollPercent(value)
        }
        break
      default:
        console.warn('No default callback')
        break
    }
  }

  getEvent = (event) => {
    return event.targetTouches ? event.targetTouches[0] : event
  }

  mousedown = (e) => {
    if (!this.isAnimating) {
      this.anime()
    }

    const event = this.getEvent(e)

    this.down = true
    this.startX = event.pageX - this.sliderTag.offsetLeft
    this.scrollLeft = this.scrollAmount

    this.sliderTag.classList.add('active')
    this.callCallback('mousedown')
  }

  mouseleave = () => {
    this.down = false
    this.sliderTag.classList.remove('active')
    this.callCallback('mouseleave')
  }

  mouseup = () => {
    this.down = false
    this.sliderTag.classList.remove('active')
    this.callCallback('mouseup')
  }

  mousemove = (e) => {
    this.callCallback('mousemove')

    const event = this.getEvent(e)

    if (!this.down) return

    this.x = event.pageX - this.sliderTag.offsetLeft
    this.dist = this.scrollLeft - (this.x - this.startX) * this.dragSpeed
  }

  getScrollPercent = () => {
    const scrollPercent = map(
      this.scrollAmount,
      0,
      this.sliderTag.scrollWidth - this.sliderTag.offsetWidth,
      0,
      100
    )

    this.callCallback('getscrollpercent', scrollPercent.toFixed(2))
  }

  anime = () => {
    this.isAnimating = true

    // Can't go over the slider
    if (this.dist + this.scrollAmount <= 0) {
      this.dist = 0
    }
    if (this.dist >= this.sliderTag.scrollWidth - this.sliderTag.offsetWidth) {
      this.dist = this.sliderTag.scrollWidth - this.sliderTag.offsetWidth
    }

    // LERP functions
    this.scrollAmount += (this.dist - this.scrollAmount) * this.smoothAmount

    this.sliderTag.style.transform = `translate3D(${-this.scrollAmount.toFixed(
      2
    )}px, 0, 0)`

    this.getScrollPercent()

    if (this.stopAnimation) {
      cancelAnimationFrame(this.anime)
    } else {
      requestAnimationFrame(this.anime)
    }
  }

  init = () => {
    this.isAnimating = false
    this.stopAnimation = false

    this.getScrollPercent()

    const isTouchScreen =
      'ontouchstart' in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0

    if (!isTouchScreen) {
      this.containerTag.addEventListener('mousedown', this.mousedown)
      this.containerTag.addEventListener('mouseleave', this.mouseleave)
      this.containerTag.addEventListener('mouseup', this.mouseup)
      this.containerTag.addEventListener('mousemove', this.mousemove)
    } else if (isTouchScreen && this.options.hasTouchEvent) {
      this.containerTag.addEventListener('touchstart', this.mousedown)
      this.containerTag.addEventListener('touchleave', this.mouseleave)
      this.containerTag.addEventListener('touchend', this.mouseup)
      this.containerTag.addEventListener('touchmove', this.mousemove)
    } else if (isTouchScreen && !this.options.hasTouchEvent) {
      this.containerTag.style.overflowX = 'scroll'
    }
  }

  destroy = () => {
    this.stopAnimation = true
    this.containerTag.removeEventListener('mousedown', this.mousedown)
    this.containerTag.removeEventListener('mouseleave', this.mouseleave)
    this.containerTag.removeEventListener('mouseup', this.mouseup)
    this.containerTag.removeEventListener('mousemove', this.mousemove)

    this.containerTag.removeEventListener('touchstart', this.mousedown)
    this.containerTag.removeEventListener('touchleave', this.mouseleave)
    this.containerTag.removeEventListener('touchend', this.mouseup)
    this.containerTag.removeEventListener('touchmove', this.mousemove)
  }
}

export default CreateSlider
