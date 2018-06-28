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
      isValid: false
    }
  }

  TestErrorLabel = ({ name }) => {
    if (this.state[`${name}Error`]) return (
      <Label>error: {this.state[`${name}Error`]}</Label>
    )
  }

  // <Form>
  //   <Form.Input type='text' placeholder='input something' name='input' onChange={(e) => this.onChangeValidate(e, required)}></Form.Input>


  //   <Form.Input type='email' placeholder='input an email' name='testEmail' onChange={(e) => this.onChangeValidate(e, isAnEmail)}></Form.Input>
  //   <this.TestErrorLabel name='testEmail' />
  // </Form>

  render() {
    console.log(this.props)
    return this.props.children({ isValid: this.state.isValid,  })
  }
}