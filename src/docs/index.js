import React from "react";
import reactDOM from "react-dom";
import {
  Form,
  Header,
  Label,
  Input,
  Container,
  TextArea
} from "semantic-ui-react";

import { Validator } from "../lib/index";

const inputMap = {
  input: props => <Input {...props} />,
  textArea: props => <TextArea {...props} />
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        emailAddresses: ["isEmailArray", {
          validator: (data) => {
            if (data) return true
            return false
          },
          error: 'Please provide a value'
        }, "isEmailArray2"]
      }
    };
  }

  onChangeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Header as="h1">Hello</Header>
        <Validator fields={this.state.fields} onChangeValue={this.onChangeValue}>
          {({ isValid, fields, onChange, errors }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange}/>
                  {errors.emailAddresses && errors.emailAddresses.length > 0 && <span>{errors.emailAddresses}</span>}
                </Form.Field>
                {isValid && <span>Form is valid</span>}
              </Form>
            );
          }}
        </Validator>
      </Container>
    );
  }
}

reactDOM.render(<App />, document.getElementById("root"));
