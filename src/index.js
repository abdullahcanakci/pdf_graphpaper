var express = require('express')
var app = express()
app.use(express.static('static'))
var http = require('http').createServer(app)
var io = require('socket.io')(http)

const SIZES = {
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
};

const PDFDocument = require('pdfkit')
const shortid = require('shortid')
const fs = require('fs')

const ids = []

const CreateGrid = (doc, box, props) => {
  doc.lineWidth(props.lineWidth)
  for(x = box.edgeLeft; x <= box.edgeRight+2; x += props.interval){
    for(y = box.edgeTop; y <= box.edgeBottom+2; y += props.interval){
      doc
        .moveTo(box.edgeLeft, y)
        .lineTo(box.edgeRight, y)
    }
    doc
      .moveTo(x, box.edgeTop)
      .lineTo(x, box.edgeBottom)
  }
  doc.stroke(props.color)
  doc.save()
}

const mmToPoints = (mm) => {
  return mm * 2.83465
}

const CalculateBoundingBox = ({paper, marginTop, marginRight, marginBottom, marginLeft, interval}) => {
  const paperSize = SIZES[paper.toUpperCase()]

  const intervalPoint = mmToPoints(interval)

  const vertivalOffset = ((paperSize[1] - marginTop - marginBottom) % intervalPoint) / 2
  const horizontalOffset = ((paperSize[0] - marginLeft - marginRight) % intervalPoint) / 2

  const edgeTop = marginTop + vertivalOffset
  const edgeBottom = paperSize[1] - marginBottom - vertivalOffset
  const edgeLeft = marginLeft + horizontalOffset
  const edgeRight = paperSize[0] - marginRight - horizontalOffset

  return { edgeTop: edgeTop, edgeBottom: edgeBottom, edgeRight: edgeRight, edgeLeft: edgeLeft }
}

const CreatePDF = (props) => {
  const page = props.pageinfo
  const grid = props.gridinfo

  console.log('PDF generation started')
  const doc = new PDFDocument({size: 'A4'})
  const filename = `${shortid.generate()}.pdf`
  doc.pipe(fs.createWriteStream(`./static/pdf/${filename}`))

  const boundingBox = CalculateBoundingBox({
    paper: 'A4',
    marginTop: mmToPoints(20),
    marginRight: mmToPoints(15),
    marginBottom: mmToPoints(20),
    marginLeft: mmToPoints(15),
    interval: grid.size
  })

  console.log(boundingBox)

  if(grid.subdivide){
    const interval = mmToPoints(grid.size / grid.subdivide_number)
    CreateGrid(
      doc,
      boundingBox,
      {
        interval: interval, 
        color: grid.subdivide_color, 
        lineWidth: 0.6
      }
    )
  }

  CreateGrid(
    doc,
    boundingBox,
    {
      interval: mmToPoints(grid.size),
      color: grid.color,
      lineWidth: 1.2
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