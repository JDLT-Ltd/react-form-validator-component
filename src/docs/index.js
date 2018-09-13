import React from 'react'
import reactDOM from 'react-dom'
import { Form, Header, Label, Container, Button, Dropdown } from 'semantic-ui-react'

import { Validator } from '../lib/index'

//this is a custom rule
// const isRequired = {
//   validator: data => {
//     if (data) return true
//     return false
//   },
//   error: 'Please provide a value'
// }
const options = [
  {
    text: 'option 1',
    value: 1
  },
  {
    text: 'option 2',
    value: 2
  }
]
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  fields = {
    emailAddresses: {
      name: 'emailAddresses',
      rules: ['isEmailArray'],
      required: 'test',
      label: 'Email addresses'
    },
    something: {
      name: 'something',
      rules: ['isPhoneNumber'],
      required: 'test',
      label: 'Something'
    }
    // number: {
    //   name: 'number',
    //   rules: ['isNumeric'],
    //   required: 'group2',
    //   label: 'number'
    // },
    // name: {
    //   name: 'name',
    //   rules: ['isFullName'],
    //   required: 'group2',
    //   label: 'name'
    // // },
    // sources: {
    //   rules: [],
    //   name: 'sources',
    //   required: true,
    //   label: 'sources',
    //   defaultValue: [options[0].value]
    // }
  }

  renderErrors(errors) {
    return errors.map((error, i) => {
      return (
        <Label color="red" key={i}>
          {error}
        </Label>
      )
    })
  }

  render() {
    return (
      <Container>
        <Header as="h1">Examples for using RFVC</Header>
        <Header as="h2">Basic Validation</Header>
        <Validator fields={this.fields} parent={this} validateOnLoad>
          {({ isFormValid, isFieldValid, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <input name="emailAddresses" onChange={onChange} />
                  {this.renderErrors(errors.emailAddresses)}
                </Form.Field>
                <Button onClick={() => alert('sure is')} disabled={!isFieldValid.emailAddresses}>
                  Thats an Email!
                </Button>
                <Form.Field>
                  <label>Something</label>
                  <input name="something" onChange={onChange} />
                  {this.renderErrors(errors.something)}
                </Form.Field>
                <Button onClick={() => alert('is it?')} disabled={!isFieldValid.something}>
                  Its not nothing
                </Button>
                {<span>Form is {isFormValid ? 'valid' : 'not valid'}</span>}
                <hr />
                <Button disabled={!isFormValid}>Test</Button>
              </Form>
            )
          }}
        </Validator>
        {/* <Header as={'h2'}>Basic Validation using fields to map (and no semantic-ui)</Header>
        <Validator fields={this.fields} parent={this}>
          {({ isFormValid, fields, onChange, errors }) => {
            return (
              <Form>
                {fields &&
                  fields.map((input, i) => {
                    return (
                      <div key={i}>
                        <label>{input.value.label}</label>
                        <input name={input.value.name} onChange={onChange} />
                        {this.renderErrors(errors[input.value.name])}
                      </div>
                    )
                  })}
                {<span>Form is {isFormValid ? 'valid' : 'not valid'}</span>}
                <hr />
                <button disabled={!isFormValid}>Test</button>
              </Form>
            )
          }}
        </Validator>
        <Header as="h2">Validation using isFieldValid</Header>
        <Validator fields={this.fields} parent={this}>
          {({ isFormValid, isFieldValid, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange} />
                  {this.renderErrors(errors.emailAddresses)}
                </Form.Field>
                <Button onClick={() => alert('sure is')} disabled={!isFieldValid.emailAddresses}>
                  Thats an Email!
                </Button>
                <Form.Field>
                  <label>Something</label>
                  <Input name="something" onChange={onChange} />
                  {this.renderErrors(errors.something)}
                </Form.Field>
                <Button onClick={() => alert('is it?')} disabled={!isFieldValid.something}>
                  Its not nothing
                </Button>
                {<span>Form is {isFormValid ? 'valid' : 'not valid'}</span>}
                <hr />
                <button disabled={!isFormValid}>Test</button>
              </Form>
            )
          }}
        </Validator>
        <Header as="h2">Validation using validateOnLoad and isFieldValid</Header>
        <Validator fields={this.fields} parent={this} validateOnLoad>
          {({ isFormValid, isFieldValid, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange} value={'I_DONT_WORK'} />
                  {this.renderErrors(errors.emailAddresses)}
                </Form.Field>
                <Button onClick={() => alert('sure is')} disabled={!isFieldValid.emailAddresses}>
                  Thats an Email!
                </Button>
                <Form.Field>
                  <label>Something</label>
                  <Input name="something" onChange={onChange} defaultValue={''} />
                  {this.renderErrors(errors.something)}
                </Form.Field>
                <Button onClick={() => alert('is it?')} disabled={!isFieldValid.something}>
                  Its not nothing
                </Button>
                {<span>Form is {isFormValid ? 'valid' : 'not valid'}</span>}
                <hr />
                <button disabled={!isFormValid}>Test</button>
              </Form>
            )
          }}
        </Validator>
        <Header as="h2">Validation using a custom onValidate handler</Header>
        <Validator
          fields={this.fields}
          onValidate={(fieldName, fieldValue) => this.setState({ hidden: fieldValue })}
          validateOnLoad
        >
          {({ isFormValid, isFieldValid, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange} />
                  {this.renderErrors(errors.emailAddresses)}
                </Form.Field>
                <Button onClick={() => alert('sure is')} disabled={!isFieldValid.emailAddresses}>
                  Thats an Email!
                </Button>
                <Form.Field>
                  <label>Something</label>
                  <Input name="something" onChange={onChange} />
                  {this.renderErrors(errors.something)}
                </Form.Field>
                <Button onClick={() => alert('is it?')} disabled={!isFieldValid.something}>
                  Its not nothing
                </Button>
                {<span>Form is {isFormValid ? 'valid' : 'not valid'}</span>}
                <hr />
                <button disabled={!isFormValid}>Test</button>
              </Form>
            )
          }}
        </Validator> */}
      </Container>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
