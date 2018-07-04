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
      isFormValid: false
    }
  }

  onValidate = (name, value) => {
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
    const isFormValid = fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)

      this.updateErrors(validation, fieldName, rule.error)

      return accumulator && validation
    }, true)

    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isFormValid })
    })
    return isFormValid
  }

  validateFieldAndUpdateState(fieldName, fieldValue) {
    const onValidate = this.props.fields[fieldName].onValidate || this.props.onValidate || this.onValidate

    if (this.validateField(fieldName, fieldValue)) {
      onValidate(fieldName, fieldValue)
    } else {
      onValidate(fieldName, null)
    }

    this.setState({
      isFormValid: Object.values(this.state.validation).every(value => value)
    })
  }

  validateFormAndUpdateState = () => {
    const fieldNames = Object.values(this.props.fields).map(field => field.name)

    fieldNames.forEach(fieldName => {
      const fieldValue = document.getElementsByName(fieldName)[0] ? document.getElementsByName(fieldName)[0].value : ''

      if (fieldValue) this.validateFieldAndUpdateState(fieldName, fieldValue)
    })
  }

  onChange = e => {
    this.validateFieldAndUpdateState(e.target.name, e.target.value)
  }

  componentDidMount() {
    if (this.props.validateOnLoad) this.validateFormAndUpdateState()
  }

  render() {
    const { fields, errors, isFormValid, validation } = this.state
    return this.props.children({
      isFormValid,
      isFieldValid: validation,
      fields: this.toArray(fields),
      onChange: this.onChange,
      errors
    })
  }
}

Validator.propTypes = {
  parent: PropTypes.object,
  children: PropTypes.func,
  onValidate: PropTypes.func,
  fields: PropTypes.object,
  validateOnLoad: PropTypes.bool
}
