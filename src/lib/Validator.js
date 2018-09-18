import React from 'react'
import PropTypes from 'prop-types'

import * as defaultRules from './rules'
export default class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: this.initialiseErrors(props.fields),
      groupValidation: this.initialiseGroupValidation(props.fields),
      validation: this.initialiseFieldValidation(props.fields),
      isFormValid: false
    }
  }

  // each field gets an (empty) array for its errors
  initialiseErrors(fields) {
    return Object.keys(fields).reduce((accumulator, currentValue) => {
      accumulator[currentValue] = []
      return accumulator
    }, {})
  }

  initialiseGroupValidation(fields) {
    return Object.keys(fields).reduce((groupValidation, currentField) => {
      const field = fields[currentField]
      if (field.required && typeof field.required === 'string') {
        groupValidation[field.required] = Object.assign({}, groupValidation[field.required], {
          [currentField]: (field.rules && field.rules.length > 0) || field.required ? false : true
        })

        return groupValidation
      }
      return groupValidation
    }, {})
  }

  initialiseFieldValidation(fields) {
    return Object.keys(fields).reduce((accumulator, currentValue) => {
      const fieldValue = fields[currentValue]
      //if field is a member of a group, add that group to validation and add the field to validation.groupValidation
      if (fieldValue.required && typeof fieldValue.required === 'string') {
        accumulator[fieldValue.required] = false
        return accumulator
      } else {
        accumulator[currentValue] =
          (fieldValue.rules && fieldValue.rules.length > 0) || fieldValue.required ? false : true
        return accumulator
      }
    }, {})
  }

  componentDidUpdate(prevProps) {
    const currentProps = this.props
    if (currentProps.fields !== prevProps.fields)
      this.setState(
        {
          fields: currentProps.fields,
          errors: this.initialiseErrors(currentProps.fields),
          groupValidation: this.initialiseGroupValidation(currentProps.fields),
          validation: this.initialiseFieldValidation(currentProps.fields),
          isFormValid: false
        },
        () => console.log('fields has changed')
      )
  }

  // default behaviour for handling successfully validated input
  onValidate = (fieldName, fieldValue) => {
    this.props.parent.setState({ [fieldName]: fieldValue })
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

  removeAllErrorMessages = fieldName => {
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

  validateGroup = (fieldName, fieldValue, groupName) => {
    // check if any other member of the group is valid
    if (
      this.state.groupValidation[groupName] &&
      Object.entries(this.state.groupValidation[groupName])
        .filter(field => !field.includes(fieldName))
        .some(member => member.includes(true))
    ) {
      const fieldRules = this.props.fields[fieldName].rules
      const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)

      this.setState({
        groupValidation: Object.assign({}, this.state.groupValidation[groupName], { [fieldName]: isFieldValid })
      })
      return true
    }
    // check if this field is valid
    const fieldRules = this.props.fields[fieldName].rules
    const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)

    const newGroupValidation = this.state.groupValidation

    newGroupValidation[groupName] = Object.assign({}, newGroupValidation[groupName], { [fieldName]: isFieldValid })

    this.setState(
      {
        groupValidation: Object.assign({}, this.state.groupValidation, newGroupValidation)
      },
      () =>
        this.setState({
          validation: Object.assign(this.state.validation, {
            [groupName]: Object.values(this.state.groupValidation[groupName]).some(member => member === true)
          })
        })
    )
    return isFieldValid
  }

  validateField = (fieldName, fieldValue) => {
    // Check if field is in a group
    const groupName =
      this.props.fields[fieldName].required && typeof this.props.fields[fieldName].required === 'string'
        ? this.props.fields[fieldName].required
        : undefined
    // ensure that empty non-required fields pass validation and don't throw errors
    if (!groupName && !this.props.fields[fieldName].required && fieldValue.length === 0) {
      this.setState(
        {
          validation: Object.assign(this.state.validation, { [fieldName]: true })
        },
        () => this.removeAllErrorMessages(fieldName)
      )
      return true
    }
    if (groupName) {
      return this.validateGroup(fieldName, fieldValue, groupName)
    }
    // standard validation
    const fieldRules = this.props.fields[fieldName].rules
    const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)
    this.setState({
      validation: Object.assign(this.state.validation, { [fieldName]: isFieldValid })
    })
    return isFieldValid
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

    fieldNames.filter(field => field).forEach(fieldName => {
      let fieldValue =
        Object.values(this.props.fields).find(field => {
          return field.name === fieldName
        }).defaultValue ||
        (document.getElementsByName(fieldName)[0] && document.getElementsByName(fieldName)[0].value
          ? document.getElementsByName(fieldName)[0].value
          : '')
      this.validateFieldAndUpdateState(fieldName, fieldValue)
    })
  }

  onChange = (e, d) => {
    const changeEvent = d ? d : e.target
    this.validateFieldAndUpdateState(changeEvent.name, changeEvent.value)
  }

  validateFieldsInput = () => {
    Object.values(this.props.fields).forEach(field => {
      if (!field.name) throw new Error('Please provide a name value for all of your fields')
      if (!field.rules)
        throw new Error('Please provide a rules array for each field (or an empty array for non-validated fields)')
    })
  }

  componentDidMount() {
    this.validateFieldsInput()
    // Add isRequired rule is field is required and not in a group
    Object.values(this.props.fields).forEach(field => {
      if (field.required === true) {
        const newFields = this.props.fields
        newFields[field.name].rules.push('isRequired')
        this.setState({ fields: newFields })
      }
    })
    this.validateFormAndUpdateState()
    if (this.props.validateOnLoad)
      Object.values(this.props.fields).map(field => this.removeAllErrorMessages(field.name))
  }

  render() {
    const { errors, isFormValid, validation } = this.state
    return this.props.children({
      isFormValid,
      isFieldValid: validation,
      fields: this.toArray(this.props.fields || {}),
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
