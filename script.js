const projects = [
  { name: 'record_player' },
  { name: 'meditation_website' },
  { name: 'cook_smart' },
  { name: 'fireworks' },
]
const list = document.getElementById('list')

projects.forEach(({ name }, idx) => {
  // console.log(name)
  const listItem = document.createElement('li')
  listItem.innerHTML = `
    <a href="./${name}/index.html" >
      <img src="./${name}/desktop-design.png" alt="${name}" />
    </a>
    <div class="content">
      <h3>${idx + 1}. ${formatTitle(name)}</h3>
      <a href="/${name}"><button>View Live</button></a>
    </div>
  `
  list.appendChild(listItem)
})

function formatTitle(title) {
  return title
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
