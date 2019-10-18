import React from 'react'

export default class  Collapsible extends React.Component {
  constructor(props) {
    super(props)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.state = {collapsed: true}
  }

  toggleCollapse(e) {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {

     

    return (
      <div>
        <div>
          <input type="checkbox" value={checked} onChange={ this.toggleCollapse } />
          {this.props.label}
        </div>
        <div style={collapse} >
          {this.props.children}
        </div>
      </div>
    )
  }
}