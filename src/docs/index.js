import React from 'react'
import reactDOM from 'react-dom'
import { Form, Header, Label, Input, Container } from 'semantic-ui-react'

import { Validator } from '../lib/index'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: {name: 'Name', rule: 'isName'},
      emailAddress: { name: 'Email address', rule: 'isEmail' }
    }
  }
  render() {
    return (
      <Container>
        <Header as="h1">Hello</Header>
        <Validator
          data={this.state}
        >
          {({ isValid, data }) => {
            return (
              <Form>
                {
                  data.map(item => {
                    return (
                      <Form.Field key={item.key}>
                        <label>{item.value.name}</label>
                        <Input />
                      </Form.Field>
                    )
                  })
                }
              </Form>)
          }}

        </Validator>
      </Container>
    )
  }
}


reactDOM.render(<App />, document.getElementById('root'))