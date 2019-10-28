var express = require('express')
var app = express()
app.use(express.static('static/site'))
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
  for(x = box.edgeLeft; x <= box.edgeRight+2; x += props.cellWidth){
    for(y = box.edgeTop; y <= box.edgeBottom+2; y += props.cellHeight){
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

const CalculateBoundingBox = ({paper, marginHorizontal, marginVertical, cellWidth, cellHeight}) => {
  const paperSize = SIZES[paper.toUpperCase()]

  const vertivalOffset = ((paperSize[1] - 2 * marginVertical) % cellHeight) / 2
  const horizontalOffset = ((paperSize[0] - 2 * marginHorizontal) % cellWidth) / 2

  const edgeTop = marginVertical + vertivalOffset
  const edgeBottom = paperSize[1] - marginVertical - vertivalOffset
  const edgeLeft = marginHorizontal + horizontalOffset
  const edgeRight = paperSize[0] - marginHorizontal - horizontalOffset

  return { edgeTop: edgeTop, edgeBottom: edgeBottom, edgeRight: edgeRight, edgeLeft: edgeLeft }
}

const CreatePDF = (props) => {
  const page = props.pageinfo
  const grid = props.gridinfo

  console.log('PDF generation started')
  const doc = new PDFDocument({size: page.page_size})
  const filename = `${shortid.generate()}.pdf`
  doc.pipe(fs.createWriteStream(`./static/pdf/${filename}`))

  const boundingBox = CalculateBoundingBox({
    paper: page.page_size,
    marginHorizontal: mmToPoints(page.page_margin_horizontal),
    marginVertical: mmToPoints(page.page_margin_vertical),
    cellWidth: mmToPoints(grid.cell_width),
    cellHeight: mmToPoints(grid.cell_height)
  })

  if(grid.secondary_division){
    const cellHeight = mmToPoints(grid.cell_height / grid.secondary_column_number)
    const cellWidth = mmToPoints(grid.cell_width / grid.secondary_row_number)
    CreateGrid(
      doc,
      boundingBox,
      {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        color: grid.secondary_color, 
        lineWidth: 0.5
      }
    )
  }

  CreateGrid(
    doc,
    boundingBox,
    {
      cellWidth: mmToPoints(grid.cell_width),
      cellHeight: mmToPoints(grid.cell_height),
      color: grid.cell_color,
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
  socket.on('pdf_generation_request', (msg) => {
    ids[socket.id] = msg
    setTimeout(() => {
      const filename = CreatePDF(msg)
      socket.emit('pdf_generation_finished', `/pdf/${filename}`)
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