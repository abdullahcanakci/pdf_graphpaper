
var socket = io()

socket.on('redirect', (destination) => {
  window.location.href = `/pdf/${destination}`
})

var submit = document.getElementById('submit')

function processForm(e) {
  e.preventDefault()
  var pack = {
    color_primary: document.getElementById('color_primary').value,
    color_secondary: document.getElementById('color_secondary').value,
    grid_primary: document.getElementById('grid_size_primary').value,
    grid_secondary:document.getElementById('grid_size_secondary').value
  }
  socket.emit('props', pack)
}

submit.addEventListener('click', processForm, false)