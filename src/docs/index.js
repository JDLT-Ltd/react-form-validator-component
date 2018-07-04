import React from 'react'
import reactDOM from 'react-dom'
import { Form, Header, Label, Input, Container } from 'semantic-ui-react'

import { Validator } from '../lib/index'

// const inputMap = {
//   input: props => <Input {...props} />,
//   textArea: props => <TextArea {...props} />
// }
const isRequired = {
  validator: data => {
    if (data) return true
    return false
  },
  error: 'Please provide a value'
}
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        emailAddresses: {
          name: 'emailAddresses',
          rules: ['isEmailArray', isRequired],
          label: 'Email addresses'
        },
        something: {
          name: 'something',
          label: 'Something'
        }
      }
    }
  }

  render() {
    return (
      <Container>
        <Header as="h1">Hello</Header>
        <Validator fields={this.state.fields} parent={this} validateOnLoad>
          {({ isValid, fields, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange} value="test" />
                  {errors.emailAddresses.map((error, i) => {
                    return <Label key={i}>{error}</Label>
                  })}
                </Form.Field>
                <Form.Field>
                  <label>Something</label>
                  <Input name="something" onChange={onChange} />
                  {errors.something.map((error, i) => {
                    return <Label key={i}>{error}</Label>
                  })}
                </Form.Field>
                {fields.map(field => {
                  return (
                    <Form.Field key={field.value.label}>
                      <label>{field.value.label}</label>
                      <Input name={field.key} onChange={onChange} />
                    </Form.Field>
                  )
                })}
                {isValid && <span>Form is valid</span>}
              </Form>
            )
          }}
        </Validator>
      </Container>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
