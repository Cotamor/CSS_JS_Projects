console.log('running script')
let state = false
const btn = document.querySelector('.btn')
const record = document.querySelector('.record')
const toneArm = document.querySelector('.tone-arm')
const song = document.querySelector('.my-song')
const vol = document.getElementById('vol')

btn.addEventListener('click', () => {
  if (state === false) {
    record.classList.add('on')
    toneArm.classList.add('play')
    setTimeout(() => {
      song.play()
    }, 1000)
  } else {
    record.classList.remove('on')
    toneArm.classList.remove('play')
    song.pause()
  }
  state = !state
})

vol.addEventListener('input', (e) => {
  console.log('volume', e.target.value)
  song.volume = Number(e.target.value)
})
