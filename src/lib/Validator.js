import React from 'react'

export default class Validator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValid: false
    }
  }

  render() {
    return this.props.children()
  }
}