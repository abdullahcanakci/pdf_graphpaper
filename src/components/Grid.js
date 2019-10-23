import React from "react";
import GridSettings from './GridSettings'
import PageSettings from './PageSettings'

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.socket = this.props.socket
    
    this.state = {
      downloadLink: '',
      pageinfo: {
        page_size: "",
        portrait: true,
        page_margin_vertical: 20,
        page_margin_horizontal: 15,
        multi_grid: false,
        multi_grid_number: 0,
      },
      gridinfo: {
        primary_cell_size: 10,
        primary_cell_color: "#54c384",
        primary_number_of_cells: [-1, -1], // -1 unlimited
        secondary_division: false,
        secondary_division_amount: 2,
        secondary_color: "#a341b7"
      }
    };
    this.updatePagePropState = this.updatePagePropState.bind(this)
    this.sendPageProps = this.sendPageProps.bind(this)
  }

  componentDidMount(){
    this.socket.on('pdf_generation_finished', data => this.setState({downloadLink: data}))
  }

  updatePagePropState(updatedState) {
    this.setState(updatedState)
  }

  sendPageProps(e) {
    e.preventDefault()
    console.log(this.state)
    this.socket.emit('pdf_generation_request', {pageinfo: this.state.pageinfo, gridinfo: this.state.gridinfo})
  }


  render(){
    const {pageinfo, gridinfo} = this.state
    const visible = {display: this.state.downloadLink == '' ? "none": ""}
    return (
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <form>
            <PageSettings state={pageinfo} setState={this.updatePagePropState} />
            <GridSettings state={gridinfo} setState={this.updatePagePropState} />
          </form>
          <div className="buttons is-centered">
          <button className="button is-primary"
            onClick={this.sendPageProps}>
            Generate
          </button>
          <button
            style={visible}
            type="submit"
            className="button is-success"
            onClick={`window.open${this.state.downloadLink}`}>
            Download
          </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Grid