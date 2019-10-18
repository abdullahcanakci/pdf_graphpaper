import React  from 'react'

export default class FormInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {formInput: ''}
  }

  handleChange(e) {
    this.setState({formInput: e.target.value})
    this.props.onStateChange({label: this.state.formInput})
  }

  render() {
    const formInput = this.state.formInput

    return(
      <label>
        {this.props.label}
        <input value={formInput} onChange={this.handleChange} type={this.props.type}/>
      </label>
    )
  }
}
