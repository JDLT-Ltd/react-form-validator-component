import React from 'react'
import PropTypes from 'prop-types'

import * as defaultRules from './rules'
export default class Validator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: props.fields,
      errors: Object.keys(props.fields).reduce((accumulator, currentValue) => {
        accumulator[currentValue] = []
        return accumulator
      }, {}),
      validation: {},
      isValid: false
    }
  }

  onPassValidation = (name, value) => {
    this.props.parent.setState({ [name]: value })
  }

  toArray = object => {
    return Object.entries(object).reduce((accumulator, [key, value]) => {
      return accumulator.concat({
        key,
        value
      })
    }, [])
  }

  // merge value with current property on state
  addToStateProperty = (target, value) => {
    this.setState({
      [this.state[target]]: Object.assign(this.state[target], value)
    })
  }

  removeError = (fieldName, errorMessage) => {
    const errorArray = this.state.errors[fieldName]
    const messagePosition = errorArray.indexOf(errorMessage)
    if (messagePosition > -1) errorArray.splice(messagePosition, 1)
    this.addToStateProperty('errors', { [fieldName]: errorArray })
  }

  updateErrors = (validation, fieldName, errorMessage) => {
    if (!validation) {
      this.addToStateProperty('errors', {
        [fieldName]: [...new Set([...(this.state.errors[fieldName] || []), errorMessage])]
      })
    } else this.removeError(fieldName, errorMessage)
  }

  validateField = (fieldName, fieldValue) => {
    const fieldRules = this.state.fields[fieldName].rules
    const isValid = fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)

      this.updateErrors(validation, fieldName, rule.error)

      return accumulator && validation
    }, true)

    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isValid })
    })
    return isValid
  }

  onChange = e => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    const onPassValidation = this.props.onPassValidation || this.onPassValidation

    if (this.validateField(fieldName, fieldValue)) {
      onPassValidation(fieldName, fieldValue)
    } else {
      this.props.parent.setState({ [fieldName]: undefined })
    }

    this.setState({
      isValid: Object.values(this.state.validation).every(value => value)
    })
  }

  render() {
    const { fields, errors, isValid } = this.state
    return this.props.children({
      isValid,
      fields: this.toArray(fields),
      onChange: this.onChange,
      errors
    })
  }
}

Validator.propTypes = {
  parent: PropTypes.object,
  children: PropTypes.func,
  onPassValidation: PropTypes.func,
  fields: PropTypes.object
}
