const burger = document.getElementById('burger-menu')
const navbar = document.getElementById('navbar')
const navLinks = document.querySelectorAll('li')
const toTopBtn = document.getElementById('scroll-top')
/* SideMenu Toggle */
burger.addEventListener('click', () => {
  burger.classList.toggle('fa-times')
  navbar.classList.toggle('active')
})
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active')
    burger.classList.toggle('fa-times')
  })
})

const header = document.querySelector('header')
window.onscroll = () => {
  let pos = document.documentElement.scrollTop
  /* Sticky Header */
  if (pos > 0) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }

  /* Scroll Top Button */
  if (pos > 300) {
    toTopBtn.style.display = 'block'
  } else {
    toTopBtn.style.display = 'none'
  }
  toTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
  })
}
