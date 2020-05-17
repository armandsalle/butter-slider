class CreateSLider {
  constructor(container, slider, options) {
    this.containerTag = document.querySelector(container)
    this.sliderTag = document.querySelector(slider)

    if (this.sliderTag === null) {
      console.error(
        'Target element does not exist on the page. ',
        this.sliderTag
      )
      return
    } else if (this.containerTag === null) {
      console.error(
        'Target element does not exist on the page. ',
        this.containerTag
      )
      return
    }

    this.options = { ...options }
    this.multiplicateur = parseInt(this.options?.multiplicateur) || 1
    this.smoothAmount =
      parseFloat(this.options?.smoothAmount).toFixed(2) || 0.15
    if (this.options?.noTouchEvent) {
      this.options.noTouchEvent = true
    } else {
      this.options.noTouchEvent = false
    }

    this.down = false
    this.startX = 0
    this.scrollLeft = 0
    this.isAnimating = false
    this.x = 0
    this.dist = 0
    this.scrollAmount = 0
    this.stopAnimation = false
  }

  map = (value, x1, y1, x2, y2) => {
    return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
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
      case 'scrollpercent':
        if (
          this.options?.scrollPercent &&
          typeof this.options?.scrollPercent === 'function'
        ) {
          this.options.scrollPercent(value)
        }
      default:
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

    e.preventDefault()
    const event = this.getEvent(e)

    if (!this.down) return

    this.x = event.pageX - this.sliderTag.offsetLeft
    this.dist = this.scrollLeft - (this.x - this.startX) * this.multiplicateur
  }

  getScrollPercent = () => {
    const scrollPercent = this.map(
      this.scrollAmount,
      0,
      this.sliderTag.scrollWidth - this.sliderTag.offsetWidth,
      0,
      100
    )

    this.callCallback('scrollpercent', scrollPercent.toFixed(2))
  }

  anime = () => {
    console.log('running')
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
    } else if (isTouchScreen && this.options.noTouchEvent === false) {
      this.containerTag.addEventListener('touchstart', this.mousedown)
      this.containerTag.addEventListener('touchleave', this.mouseleave)
      this.containerTag.addEventListener('touchend', this.mouseup)
      this.containerTag.addEventListener('touchmove', this.mousemove)
    } else if (isTouchScreen && this.options.noTouchEvent === true) {
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

export default CreateSLider
