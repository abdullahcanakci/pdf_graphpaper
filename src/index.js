var express = require('express')
var app = express()
app.use(express.static('static'))
var http = require('http').createServer(app)
var io = require('socket.io')(http)

const PDFDocument = require('pdfkit')
const shortid = require('shortid')
const fs = require('fs')

const ids = []

const CreateGrid = (doc, props) => {
  doc.lineWidth(props.lineWidth)
  for(x = props.leftEdge; x <= props.rightEdge; x += props.interval * 2.83465){
    for(y = props.topEdge; y <= props.bottomEdge; y += props.interval * 2.83465){
      doc
        .moveTo(props.leftEdge, y)
        .lineTo(props.rightEdge, y)
    }
    doc
      .moveTo(x, props.topEdge)
      .lineTo(x, props.bottomEdge)
  }
  doc.stroke(props.color)
  doc.save()
}

const CreatePDF = (props) => {
  const page = props.pageinfo
  const grid = props.gridinfo

  console.log('PDF generation started')
  const doc = new PDFDocument({size: 'A4'})
  const filename = `${shortid.generate()}.pdf`
  doc.pipe(fs.createWriteStream(`./static/pdf/${filename}`))
  const leftEdge = (20 + (210 - 40) % grid.size) * 2.83465
  const rightEdge = 210*2.83465 - leftEdge
  const topEdge = (30 + (297/2 -60) % grid.size) * 2.83465
  const bottomEdge = 297 * 2.83465 - topEdge

  if(grid.subdivide){
    const interval = grid.size / grid.subdivide_number
    CreateGrid(
      doc, 
      {
        leftEdge: leftEdge, 
        rightEdge: rightEdge, 
        topEdge: topEdge, 
        bottomEdge: bottomEdge, 
        interval: interval, 
        color: grid.subdivide_color, 
        lineWidth: 0.3
      }
    )
  }

  CreateGrid(
    doc,
    {
      leftEdge: leftEdge, 
      rightEdge: rightEdge, 
      topEdge: topEdge, 
      bottomEdge: bottomEdge,
      interval: grid.size,
      color: grid.color,
      lineWidth: 0.5
    }
  )
  
  doc.end()
  console.log('PDF generation finished')
  return filename
}

io.on('connection', (socket) => {
  console.log('a user has connected')
  //User requests a graph creation
  socket.on('page_properties', (msg) => {
    console.log(msg)
    ids[socket.id] = msg
    setTimeout(() => {
      const filename = CreatePDF(msg)
      socket.emit('pdf', `/pdf/${filename}`)
    },1000)
  })

  socket.on('pdf', () => {
    console.log('PDF' + JSON.stringify(ids[socket.id]))
    socket.emit('message', "Goodbye" + JSON.stringify(ids[socket.id]))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected.')
  })
})

http.listen(3000, () => {
  console.log('listening on 3000')
})