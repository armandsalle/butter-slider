import { CreateSlider } from '../../../../dist/bundle.esm'
import initCursor from './cursor'

const cursor = document.querySelector('.cursor')
const bar = document.querySelector('.bar')
const destroyBtn = document.querySelector('.js-destroy')
const initBtn = document.querySelector('.js-init')
const alertTag = document.querySelector('.js-alert')
const buttons = [...document.querySelectorAll('button')]

initCursor()

// //Init slider
const mySlider = new CreateSlider({
  container: '.slider',
  slider: '.slides',
  mouseEnter: () => {
    cursor.classList.add('hover')
  },
  mouseLeave: () => {
    cursor.classList.remove('hover')
    cursor.classList.remove('active')
  },
  mouseDown: () => {
    cursor.classList.add('active')
  },
  mouseUp: () => {
    cursor.classList.remove('active')
  },
  getScrollPercent: (e) => {
    bar.style.width = `${e}%`
  },
  dragSpeed: 3,
  smoothAmount: 0.2,
  hasTouchEvent: true,
})

const secondSlider = new CreateSlider({
  container: '.container-b',
  slider: '.slider-b',
})

secondSlider.smoothAmount = 0.2
secondSlider.dragSpeed = 2

destroyBtn.addEventListener('click', (e) => {
  e.preventDefault()
  mySlider.destroy()
})

initBtn.addEventListener('click', (e) => {
  e.preventDefault()
  mySlider.init()
})

// Events
buttons.forEach((e) => {
  e.addEventListener('mousemove', () => {
    cursor.classList.add('btn-hover')
  })

  e.addEventListener('mouseleave', () => {
    cursor.classList.remove('btn-hover')
  })
})

alertTag.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('clicked')
})
