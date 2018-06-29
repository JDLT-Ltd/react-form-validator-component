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
        emailAddresses: {
          rules: [
            "isEmailArray",
            {
              validator: data => {
                if (data) return true;
                return false;
              },
              error: "Please provide a value"
            },
            "isEmailArray2"
          ],
          label: 'Email addresses'
        }
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
        <Validator
          fields={this.state.fields}
          onChangeValue={this.onChangeValue}
        >
          {({ isValid, fields, onChange, errors }) => {
            console.log(errors)
            return (
              <Form>
                <Form.Field>
                  <label>Your Emails</label>
                  <Input name="emailAddresses" onChange={onChange} />
                  {errors.emailAddresses.map((error, i)=> {
                    return <Label key={i}>{error}</Label>
                  })}

                </Form.Field>
                {/* {fields.map(field => {
                  return(
                    <Form.Field key={field.label}>
                      <label>{field.value.label}</label>
                      <Input name={field.key} onChange={onChange}/>
                    </Form.Field>
                  )
                })} */}
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
