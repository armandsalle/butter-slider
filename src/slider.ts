import {
  map,
  isElement,
  getFloatNumber,
  checkCallbackType,
  lerp,
  getEvent,
} from './utils'
// eslint-disable-next-line no-unused-vars
import { Options } from './interfaces/options'

class CreateSlider {
  options: any
  containerTag: any
  sliderTag: any
  sliderTagLeft: number
  sliderTagRight: number
  dragSpeed: any
  smoothAmount: any
  down: boolean
  startX: number
  scrollLeft: number
  isAnimating: boolean
  x: number
  dist: number
  scrollAmount: number
  stopAnimation: boolean
  animationRef: any
  scrollWidth: number

  constructor(options: Options) {
    this.options = { ...options }

    if ((!this.options.container && !this.options.slider) || !this.options) {
      // console.error('No container and slider selector.')
      throw new Error('No container and slider selector.')
    } else {
      this.containerTag = isElement(this.options?.container)
        ? this.options?.container
        : document.querySelector(this.options?.container)
      this.sliderTag = isElement(this.options?.slider)
        ? this.options?.slider
        : document.querySelector(this.options?.slider)
    }

    if (this.sliderTag === null) {
      throw new Error(
        `Target element does not exist on the page. ${this.sliderTag}`
      )
    } else if (this.containerTag === null) {
      throw new Error(
        `Target element does not exist on the page. { this.containerTag}`
      )
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

    const leftMargin: string = window
      .getComputedStyle(this.sliderTag)
      .getPropertyValue('margin-left')
    const rightMargin: string = window
      .getComputedStyle(this.sliderTag)
      .getPropertyValue('margin-right')

    this.sliderTagLeft = parseInt(leftMargin)
    this.sliderTagRight = parseInt(rightMargin)

    this.dragSpeed = getFloatNumber(this.options?.dragSpeed, 1, 1, 100)
    this.smoothAmount = getFloatNumber(
      this.options?.smoothAmount,
      0.15,
      0.01,
      1
    )

    this.down = false
    this.startX = 0
    this.scrollLeft = 0
    this.isAnimating = false
    this.x = 0
    this.dist = 0
    this.scrollAmount = 0
    this.stopAnimation = false
    this.animationRef = null
    this.scrollWidth = this.getScrollWidth()

    this.init()
  }

  getScrollWidth = (): number => {
    return (
      this.sliderTag.scrollWidth -
      this.containerTag.offsetWidth +
      this.sliderTagLeft +
      this.sliderTagRight
    )
  }

  callCallback = (type: string, value: number): void => {
    switch (type) {
      case 'mousedown':
        if (checkCallbackType(this.options?.mouseDown)) {
          this.options.mouseDown()
        }
        break
      case 'mouseleave':
        if (checkCallbackType(this.options?.mouseLeave)) {
          this.options.mouseLeave()
        }
        break
      case 'mouseup':
        if (checkCallbackType(this.options?.mouseUp)) {
          this.options.mouseUp()
        }
        break
      case 'mousemove':
        if (checkCallbackType(this.options?.mouseEnter)) {
          this.options.mouseEnter()
        }
        break
      case 'getscrollpercent':
        if (checkCallbackType(this.options?.getScrollPercent)) {
          this.options.getScrollPercent(value)
        }
        break
      default:
        console.warn('No default callback')
        break
    }
  }

  mousedown = (e: Event): void => {
    if (!this.isAnimating) {
      this.anime()
    }

    const event = getEvent(e)

    this.down = true
    this.startX = event.pageX - this.sliderTag.offsetLeft
    this.scrollLeft = this.scrollAmount

    this.sliderTag.classList.add('active')
    this.callCallback('mousedown', null)
  }

  mouseleave = (): void => {
    this.down = false
    this.sliderTag.classList.remove('active')
    this.callCallback('mouseleave', null)
  }

  mouseup = (): void => {
    this.down = false
    this.sliderTag.classList.remove('active')
    this.callCallback('mouseup', null)
  }

  mousemove = (e: Event): void => {
    this.callCallback('mousemove', null)

    const event = getEvent(e)

    if (!this.down) return
    e.preventDefault()

    this.x = event.pageX - this.sliderTag.offsetLeft
    this.dist = this.scrollLeft - (this.x - this.startX) * this.dragSpeed
  }

  transformElement = (): void => {
    const amount = -this.scrollAmount.toFixed(3)
    this.sliderTag.style.transform = `translate3D(${amount}px, 0, 0)`
    this.sliderTag.style.webkitTransform = `translate3D(${amount}px, 0, 0)`
    this.sliderTag.style.msTransform = `translate3D(${amount}px, 0, 0)`
  }

  getScrollPercent = (): void => {
    const scrollPercent = map(
      this.scrollAmount,
      0,
      this.sliderTag.scrollWidth - this.sliderTag.offsetWidth,
      0,
      100
    )

    this.callCallback('getscrollpercent', +scrollPercent.toFixed(3))
  }

  anime = (): void => {
    this.isAnimating = true

    // Can't go over the slider
    if (this.dist + this.scrollAmount <= 0) {
      this.dist = 0
    } else if (this.dist >= this.scrollWidth) {
      this.dist = this.scrollWidth
    }

    // LERP functions
    this.scrollAmount = lerp(this.scrollAmount, this.dist, this.smoothAmount)
    this.transformElement()
    this.getScrollPercent()

    if (this.stopAnimation) {
      cancelAnimationFrame(this.animationRef)
    } else {
      this.animationRef = requestAnimationFrame(this.anime)
    }
  }

  // setRelativePosition = (x: number): void => {
  //   // Set new relative slider, moving it `x` distance
  //   this.x = this.sliderTag.offsetLeft - x
  //   this.startX = this.sliderTag.offsetLeft
  //   this.scrollLeft = this.scrollAmount
  //   this.dist = this.scrollLeft - (this.x - this.startX) * this.dragSpeed

  //   // Guards: Can't go over the slider
  //   if (this.dist + this.scrollAmount <= 0) return
  //   if (this.dist >= this.scrollWidth) return

  //   // Set slider active class
  //   this.sliderTag.classList.add('active')

  //   // Animate and transform
  //   this.anime()

  //   // Remove slider active class
  //   this.sliderTag.classList.remove('active')
  // }

  init = (): void => {
    this.isAnimating = false
    this.stopAnimation = false

    // For better performance
    this.sliderTag.style.willChange = 'transform'

    this.getScrollPercent()

    const isTouchScreen =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
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

  destroy = (): void => {
    this.stopAnimation = true
    this.containerTag.removeEventListener('mousedown', this.mousedown)
    this.containerTag.removeEventListener('mouseleave', this.mouseleave)
    this.containerTag.removeEventListener('mouseup', this.mouseup)
    this.containerTag.removeEventListener('mousemove', this.mousemove)

    this.containerTag.removeEventListener('touchstart', this.mousedown)
    this.containerTag.removeEventListener('touchleave', this.mouseleave)
    this.containerTag.removeEventListener('touchend', this.mouseup)
    this.containerTag.removeEventListener('touchmove', this.mousemove, false)
  }
}

export default CreateSlider
