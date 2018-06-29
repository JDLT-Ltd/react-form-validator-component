import React from "react";

import * as rules from "./rules";

export default class Validator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields,
      errors: {},
      validation: {}
    };
  }

  TestErrorLabel = ({ name }) => {
    if (this.state[`${name}Error`])
      return <Label>error: {this.state[`${name}Error`]}</Label>;
  };

  validate = (fieldName, fieldValue, ruleNames) => {
    const isValid = ruleNames.reduce((accumulator, ruleName) =>{
      const validation = rules[ruleName].validator(fieldValue)
      if (!validation) this.setState({ errors: Object.assign(this.state.errors, {[fieldName]: [...new Set([...(this.state.errors[fieldName] || []), rules[ruleName].error ])]})})
      return accumulator && validation
    }, true);

    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isValid })
    });
    return isValid;
  };

  onChange = e => {
    const fieldName = e.target.name
    if (this.validate(fieldName, e.target.value, this.state.fields[fieldName])) {
      this.props.onChange(e);
    }
  };

  render() {
    const { fields, errors } = this.state;
    return this.props.children({ isValid: Object.values(this.state.validation).every(value => value), fields, onChange: this.onChange, errors });
  }
}
