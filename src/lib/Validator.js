import React from 'react'

const required = {
  rule: (data) => {
    if (data) return true
    return false
  },
  error: 'Please provide a value'
}

const emailArrayRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/


const isAnEmail = {
  rule: (data) => {
    if (data.match(emailArrayRegex)) return true
    return false
  },
  error: 'Please provide a valid email address'
}

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