import { map, isElement } from './utils'

class ButterSlider {
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

    this.dragSpeed =
      parseFloat(this.options?.dragSpeed).toFixed(2) === 'NaN'
        ? 1
        : parseFloat(this.options?.dragSpeed).toFixed(2)
    this.smoothAmount =
      parseFloat(this.options?.smoothAmount).toFixed(2) === 'NaN'
        ? 0.15
        : parseFloat(this.options?.smoothAmount).toFixed(2)
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

  callCallback = (type, value) => {
    switch (type) {
      case 'mousedown':
        if (
          this.options?.mouseDown &&
          typeof this.options?.mouseDown === 'function'
        ) {
          this.options.mouseDown()
        }
        break
      case 'mouseleave':
        if (
          this.options?.mouseLeave &&
          typeof this.options?.mouseLeave === 'function'
        ) {
          this.options.mouseLeave()
        }
        break
      case 'mouseup':
        if (
          this.options?.mouseUp &&
          typeof this.options?.mouseUp === 'function'
        ) {
          this.options.mouseUp()
        }
        break
      case 'mousemove':
        if (
          this.options.mouseEnter &&
          typeof this.options.mouseEnter === 'function'
        ) {
          this.options.mouseEnter()
        }
        break
      case 'getscrollpercent':
        if (
          this.options?.getScrollPercent &&
          typeof this.options?.getScrollPercent === 'function'
        ) {
          this.options.getScrollPercent(value)
        }
        break
      default:
        console.warn('No default case for switch callback')
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

export { ButterSlider }
