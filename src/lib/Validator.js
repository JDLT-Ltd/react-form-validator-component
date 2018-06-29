import React from "react";

import * as defaultRules from "./rules";

export default class Validator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields,
      errors: {},
      validation: {},
      isValid: false
    };
  }

  // merge value with current property on state
  addToStateProperty = (target, value) => {
    this.setState({
      [this.state[target]]: Object.assign(this.state[target], value)
    });
  };

  removeError = (fieldName, errorMessage) => {
    const errorArray = this.state.errors[fieldName];
    const messagePosition = errorArray.indexOf(errorMessage);
    if (messagePosition > -1) errorArray.splice(messagePosition, 1);
    this.addToStateProperty("errors", { [fieldName]: errorArray });
  };

  updateErrors = (validation, fieldName, errorMessage) => {
    if (!validation) {
      this.addToStateProperty("errors", {
        [fieldName]: [
          ...new Set([...(this.state.errors[fieldName] || []), errorMessage])
        ]
      });
    } else this.removeError(fieldName, errorMessage);
  };

  validateField = (fieldName, fieldValue) => {
    const fieldRules = this.state.fields[fieldName];
    const isValid = fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule;
      const validation = rule.validator(fieldValue);

      this.updateErrors(validation, fieldName, rule.error);

      return accumulator && validation;
    }, true);

    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isValid })
    });
    return isValid;
  };

  onChange = e => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (this.validateField(fieldName, fieldValue)) this.props.onChangeValue(e);

    this.setState({
      isValid: Object.values(this.state.validation).every(value => value)
    });
  };

  render() {
    const { fields, errors, isValid } = this.state;
    return this.props.children({
      isValid,
      fields,
      onChange: this.onChange,
      errors
    });
  }
}
