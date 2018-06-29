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
        emailAddresses: ["isEmailArray", "required", "isEmailArray2"]
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
          {({ isValid, fields, onChange }) => {
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange}/>
                </Form.Field>
              </Form>
            );
          }}
        </Validator>
      </Container>
    );
  }
}

reactDOM.render(<App />, document.getElementById("root"));
