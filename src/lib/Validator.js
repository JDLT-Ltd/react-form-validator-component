import React from 'react'

import * as rules from './rules'

const onChangeValidate = (e, rule) => {
  if (rule.rule(e.target.value)) {
    console.log('valid input')
    this.setState({ [e.target.name]: e.target.value })
  }
  else {
    console.log(rule.error)
    this.setState({ [e.target.name]: false, [`${e.target.name}Error`]: rule.error })
  }
}


export default class Validator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isValid: false,
      data: this.toArray(this.props.data)
    }
  }

  toArray = data => {
    return Object.entries(data).reduce((accumulator, [key, value]) => {
      return accumulator.concat({
        key,
        value
      })
    }, [])
  }

  TestErrorLabel = ({ name }) => {
    if (this.state[`${name}Error`]) return (
      <Label>error: {this.state[`${name}Error`]}</Label>
    )
  }

  render() {
    const { isValid, data } = this.state
    console.log(data)
    return this.props.children({ isValid, data })
  }
}