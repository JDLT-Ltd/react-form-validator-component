import React from 'react'
import reactDOM from 'react-dom'
import { Form, Header, Label, Input } from 'semantic-ui-react'

import { Validator } from '../lib/index'


const App = () => {
  return (
    <React.Fragment>
      <Header as="h1">Hello</Header>
      <Validator>
        {() => {
          return (
            <Form>
              <Label>Testy test test</Label>
              <Input />
            </Form>)
        }}

      </Validator>
    </React.Fragment>
  )
}


reactDOM.render(<App />, document.getElementById('root'))