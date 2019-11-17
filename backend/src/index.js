var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const path = require('path')
app.use(express.static('site'))
app.use(express.static('static'))
app.use(bodyParser.json())
var http = require('http').createServer(app)

const SIZES = {
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  LETTER: [612.0, 792.0],
};

const PDFDocument = require('pdfkit')
const shortid = require('shortid')
const fs = require('fs')

const CreateGrid = (doc, box, props) => {
  doc.lineWidth(props.lineWidth)
  for(x = box.edgeLeft; x <= box.edgeRight+2; x += mmToPoints(props.cellWidth)){
    for(y = box.edgeTop; y <= box.edgeBottom+2; y += mmToPoints(props.cellHeight)){
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

  const marginVerticalPoints = mmToPoints(marginVertical)
  const marginHorizontalPoints = mmToPoints(marginHorizontal)

  const vertivalOffset = ((paperSize[1] - 2 * marginVerticalPoints) % mmToPoints(cellHeight)) / 2
  const horizontalOffset = ((paperSize[0] - 2 * marginHorizontalPoints) % mmToPoints(cellWidth)) / 2
  
  const edgeTop = marginVerticalPoints + vertivalOffset
  const edgeLeft = marginHorizontalPoints + horizontalOffset
  const edgeRight = paperSize[0] - marginHorizontalPoints - horizontalOffset
  const edgeBottom = paperSize[1] - marginVerticalPoints - vertivalOffset

  return { edgeTop: edgeTop, edgeBottom: edgeBottom, edgeRight: edgeRight, edgeLeft: edgeLeft }
}

async function CreatePDF(props){
  const page = props.pageinfo
  const grid = props.gridinfo

  console.log('PDF generation started')
  const doc = new PDFDocument({size: page.page_size})
  const filename = `${shortid.generate()}.pdf`
  doc.pipe(fs.createWriteStream(`./static/pdf/${filename}`))

  const boundingBox = CalculateBoundingBox({
    paper: page.page_size,
    marginHorizontal: page.page_margin_horizontal,
    marginVertical: page.page_margin_vertical,
    cellWidth: grid.primary_cell_width,
    cellHeight: grid.primary_cell_height
  })
  console.log(boundingBox)

  if(grid.secondary_division){
    const cellHeight = grid.primary_cell_height / grid.secondary_division_column
    const cellWidth = grid.primary_cell_width / grid.secondary_division_row
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
      cellWidth: grid.primary_cell_width,
      cellHeight: grid.primary_cell_height,
      color: grid.primary_cell_color,
      lineWidth: 1.0
    }
  )
  
  doc.end()
  console.log('PDF generation finished')
  return filename
}

app.post('/api', (req, res, next) => {
  try{
    CreatePDF(req.body)
      .then(link => {
        res
          .status(201)
          .send('/pdf/' + link)
      })
      .catch(e => {
        console.log('an error occured\n' + e)
      })
  }
  catch(e) {
    next(e)
  }
})

http.listen(3000, () => {
  console.log('listening on 3000')
})
