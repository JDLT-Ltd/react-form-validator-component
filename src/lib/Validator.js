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
      validation: Object.keys(props.fields).reduce((accumulator, currentValue) => {
        //check for groups before adding fields to validation
        const fieldValue = props.fields[currentValue]
        if (fieldValue.required && typeof fieldValue.required === 'string') {
          accumulator[fieldValue.required] = false
          return accumulator
        } else {
          accumulator[currentValue] = fieldValue.rules && fieldValue.rules.length > 0 ? false : true
          return accumulator
        }
      }, {}),
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
      [target]: Object.assign(this.state[target], value)
    })
  }

  removeError = (fieldName, errorMessage) => {
    const errorArray = this.state.errors[fieldName]
    const messagePosition = errorArray.indexOf(errorMessage)
    if (messagePosition > -1) errorArray.splice(messagePosition, 1)
    this.addToStateProperty('errors', { [fieldName]: errorArray })
  }

  removeAllErrors = fieldName => {
    this.setState({ errors: Object.assign(this.state.errors, { [fieldName]: [] }) })
  }

  updateErrorsForField = (validation, fieldName, errorMessage) => {
    if (!validation) {
      this.addToStateProperty('errors', {
        [fieldName]: [...new Set([...(this.state.errors[fieldName] || []), errorMessage])]
      })
    } else this.removeError(fieldName, errorMessage)
  }

  validateRules = (fieldName, fieldValue, fieldRules) => {
    return fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)

      this.updateErrorsForField(validation, fieldName, rule.error)

      return accumulator && validation
    }, true)
  }

  validateField = (fieldName, fieldValue) => {
    if (!this.props.fields[fieldName].required && fieldValue.length === 0) {
      this.setState(
        {
          validation: Object.assign(this.state.validation, { [fieldName]: true })
        },
        () => this.removeAllErrors(fieldName)
      )
      return true
    }
    const fieldRules = this.state.fields[fieldName].rules
    const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)

    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isFieldValid })
    })
    return isFieldValid
  }

  checkGroupValid = (group, fieldName, fieldValue) =>
    group.some(
      field =>
        !!field.rules.reduce((accumulator, fieldRule) => {
          const rule = defaultRules[fieldRule] || fieldRule
          const validation = rule.validator(fieldValue)

          this.updateErrorsForField(validation, fieldName, rule.error)
          return accumulator && validation
        }, true)
    )

  validateFieldAndUpdateState(fieldName, fieldValue) {
    const onValidate = this.props.fields[fieldName].onValidate || this.props.onValidate || this.onValidate

    // if this field is a member of a group
    if (typeof this.props.fields[fieldName].required === 'string') {
      if (this.validateGroup(fieldName, fieldValue)) {
        onValidate(fieldName, fieldValue)
      } else {
        onValidate(fieldName, null)
      }
    } else {
      if (this.validateField(fieldName, fieldValue)) {
        onValidate(fieldName, fieldValue)
      } else {
        onValidate(fieldName, null)
      }
    }

    this.setState({
      isFormValid: Object.values(this.state.validation).every(value => value)
    })
  }

  validateFormAndUpdateState = () => {
    const fieldNames = Object.values(this.props.fields).map(field => field.name)
    fieldNames.forEach(fieldName => {
      let fieldValue =
        document.getElementsByName(fieldName)[0] && document.getElementsByName(fieldName)[0].value
          ? document.getElementsByName(fieldName)[0].value
          : ''

      this.validateFieldAndUpdateState(fieldName, fieldValue)
    })
  }

  onChange = e => {
    this.validateFieldAndUpdateState(e.target.name, e.target.value)
  }

  componentDidMount() {
    this.validateFormAndUpdateState()
    if (this.props.validateOnLoad) Object.values(this.props.fields).map(field => this.removeAllErrors(field.name))
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

Validator.defaultProps = {
  validateOnLoad: true
}
