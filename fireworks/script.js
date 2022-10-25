// Create Initial References & declare variables
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
let clicked = false
let mouseX = 0,
  mouseY = 0
let particles = []
let particleSettings = {
  gravity: 0.05,
}

// Event Object
let events = {
  mouse: {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
  },
  touch: {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
  },
}

let deviceType = ''

// For using request animationFrame on all browser
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

// Function on window load
window.onload = () => {
  canvas.width = width
  canvas.height = height
  window.requestAnimationFrame(startFireWork)
}

// Detect Touch Device
const isTouchDevice = () => {
  try {
    // We try to create TouchEvent (it fails for desktops and throw error)
    document.createEvent('TouchEvent')
    deviceType = 'touch'
    return true
  } catch (e) {
    deviceType = 'mouse'
    return false
  }
}

isTouchDevice()
console.log(deviceType)

// Function on mousedown
canvas.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault()
  clicked = true
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY
  console.log(mouseX, mouseY)
})

// Function on mouseup
canvas.addEventListener(events[deviceType].up, (e) => {
  e.preventDefault()
  clicked = false
})

// Function to generate ronadom number between a given range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min
}

class Particle {
  constructor() {
    this.width = randomNumberGenerator(0.1, 0.9) * 5
    this.height = randomNumberGenerator(0.1, 0.9) * 5
    this.x = mouseX - this.width / 2
    this.y = mouseY - this.height / 2

    // Velocity of the particle(from -5 to 5)
    this.vx = (Math.random() - 0.5) * 10
    this.vy = (Math.random() - 0.5) * 10
  }
  move() {
    if (this.x >= canvas.width || this.y >= canvas.height) {
      return false
    }
    return true
  }
  draw() {
    this.x += this.vx
    this.y += this.vy
    this.vy += particleSettings.gravity
    context.save()
    context.beginPath()
    context.translate(this.x, this.y)
    context.arc(0, 0, this.width, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.closePath()
    context.fill()
    context.restore()
  }
}

function createFirework() {
  // Increase range for bigger fireworks
  let numberOfParticles = randomNumberGenerator(10, 50)
  let color = `rgb(${randomNumberGenerator(0, 255)},${randomNumberGenerator(
    0,
    255
  )},${randomNumberGenerator(0, 255)})`

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = new Particle()
    particle.color = color
    const vy = Math.sqrt(25 - particle.vx * particle.vx)
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy
    }
    particles.push(particle)
  }
}

// Function that begins the firework
function startFireWork() {
  let current = []
  // Control trail left by particles
  context.fillStyle = 'rgba(0,0,0,0.1)'
  context.fillRect(0, 0, width, height)
  if (clicked) {
    createFirework()
  }
  for (let i in particles) {
    particles[i].draw()
    if (particles[i].move()) {
      current.push(particles[i])
    }
  }
  particles = current
  window.requestAnimationFrame(startFireWork)
}
