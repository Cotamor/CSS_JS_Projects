// Toggle Side Menu
const hamMenu = document.getElementById('ham-menu')
const nav = document.querySelector('nav')
const myNav = document.getElementById('nav-bar')
const links = document.querySelectorAll('li')
const scrollTopBtn = document.getElementById('scroll-top-btn')
const progress = document.getElementById('progress')

hamMenu.addEventListener('click', () => {
  myNav.classList.toggle('active')
  hamMenu.classList.toggle('fa-times')
})

links.forEach((link) => {
  link.addEventListener('click', () => {
    myNav.classList.remove('active')
    hamMenu.classList.toggle('fa-times')
  })
})

window.onscroll = function () {
  /*--- Scroll Indicator ---*/
  let pos = document.documentElement.scrollTop

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  console.log(pos, calcHeight)
  let scroll = Math.floor((pos / calcHeight) * 100)
  console.log('scroll', scroll)
  progress.style.width = `${scroll}%`

  /*--- Scroll To Top Button ---*/
  if (pos > 300) {
    scrollTopBtn.style.display = 'block'
  } else {
    scrollTopBtn.style.display = 'none'
  }

  scrollTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
  })

  /*--- Sticy Navbar ---*/
  if (pos > 0) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}
