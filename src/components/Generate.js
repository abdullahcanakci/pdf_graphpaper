import React, { useState } from 'react'
import ButtonGroup from './ButtonGroup'
import networkService from './../services/connection'
import Dimension from './Dimension'
import Color from './Color'
import Toggleable from './Toggleable'

const Generate = () => {
  const [download, setDownload] = useState('')
  const optionPage = ["A4", "A5", "Letter"];
  const [pageState, setPageState] = useState(optionPage[0]);
  const optionOrientation = ["Portrait", "Landscape"];
  const [orientationState, setOrientationState] = useState(
    optionOrientation[0]
  );
  const [margin, setMargin] = useState({horizontal: 15, vertical: 20})


  const [cellSize, setCellSize] = useState({horizontal: 10, vertical: 10});
  const [cellColor, setCellColor] = useState('#404040')
  const [subdivide, setSubdivide] = useState(false)
  const [subdivideAmount, setSubdivideAmount] = useState({horizontal: 2, vertical: 2})
  const [subdivideColor, setSubdivideColor] = useState('#404040')

  const generate = (e) => {
   // e.preventDefault()

    setDownload('')
    const props = {
      pageinfo: {
        page_size: pageState,
        portrait: orientationState,
        page_margin_vertical: margin.vertical,
        page_margin_horizontal: margin.horizontal,
      },
      gridinfo: {
        primary_cell_width: cellSize.horizontal,
        primary_cell_height: cellSize.vertical,
        primary_cell_color: cellColor,
        secondary_division: subdivide,
        secondary_division_row: subdivideAmount.vertical,
        secondary_division_column: subdivideAmount.horizontal,
        secondary_color: subdivideColor
      }
    }
    networkService
      .getPDF(props)
      .then(result => {
        console.log(result)
        setDownload(result)
      })
      .catch(err => {
        console.log('Promise Error')
      })
  }

  return(
    <div className="columns is-tablet is-centered">
      <div className="column is-half">
        <h2 className="title">Page</h2>
        <ButtonGroup
          label="Page Size"
          buttons={optionPage}
          state={pageState}
          setState={setPageState}
        />
        <ButtonGroup
          label="Orientation"
          buttons={optionOrientation}
          state={orientationState}
          setState={setOrientationState}
        />
        <Dimension
          label="Margins"
          state={margin}
          setState={setMargin}
        />
        <h2 className="title">Grid</h2>
        <Dimension
          label="Size"
          state={cellSize}
          setState={setCellSize}
        />
        <Color
          label="Primary Color"
          state={cellColor}
          setState={setCellColor}
        />
        <Toggleable 
          label="Subdivide" 
          state={subdivide} 
          setState={setSubdivide}
        >
          <Dimension
            label="Subdivide Amount"
            state={subdivideAmount}
            setState={setSubdivideAmount}
          />
          <Color
            label="Subdivide Color"
            state={subdivideColor}
            setState={setSubdivideColor}
            />
        </Toggleable>

        <div className="buttons is-grouped is-centered">
          <button
            className="button is-primary"
            onClick={generate}
          >
            Generate
          </button>
          <a
            href={download}
            download="graphpaper.pdf">
              <button
                style={download === '' ? {display: 'none'} : {display: ''}}
                className="button is-success">
                  Donwload
                </button>
            </a>

        </div>
      </div>
    </div>
  )
}

export default Generate