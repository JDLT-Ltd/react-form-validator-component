import React from 'react'
import PropTypes from 'prop-types'
import 'babel-polyfill'
import * as defaultRules from './rules'

import addToStateProperty from './utils/addToStateProperty'
import toArray from './utils/toArray'
export default class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: this.initialiseStateErrors(props.fields),
      groupValidation: this.initialiseStateGroupValidation(props.fields),
      validation: this.initialiseStateFieldValidation(props.fields),
      isFormValid: false,
      validatorInput: {}, // only used if user sets returnInput
      hasChanged: {}
    }
  }

  componentDidMount() {
    this.validateFieldsProp()
    this.addRequiredRuleToFields()
    this.initialValidation()
    // TODO: only remove errors from empty fields
    if (this.props.validateOnLoad)
      Object.values(this.props.fields).forEach(field => this.removeAllErrorMessages(field.name))
  }

  // each field gets an (empty) array for its errors
  initialiseStateErrors(fields) {
    return Object.keys(fields).reduce((accumulator, currentValue) => {
      accumulator[currentValue] = []
      return accumulator
    }, {})
  }

  initialiseStateGroupValidation(fields) {
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

  initialiseStateFieldValidation(fields) {
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
    if (JSON.stringify(currentProps.fields) !== JSON.stringify(prevProps.fields))
      this.setState({
        fields: currentProps.fields,
        errors: this.initialiseStateErrors(currentProps.fields),
        groupValidation: this.initialiseStateGroupValidation(currentProps.fields),
        validation: this.initialiseStateFieldValidation(currentProps.fields),
        isFormValid: Object.values(this.initialiseStateFieldValidation(currentProps.fields)).every(
          field => field === true
        )
      })
  }

  // default behaviour for handling successfully validated input
  onValidate = (fieldName, fieldValue) => {
    this.props.parent.setState({ [fieldName]: fieldValue })
  }

  removeError = (fieldName, errorMessage) => {
    const errorArray = this.state.errors[fieldName]
    const messagePosition = errorArray.indexOf(errorMessage)
    if (messagePosition > -1) errorArray.splice(messagePosition, 1)
    addToStateProperty('errors', { [fieldName]: errorArray }, this)
  }

  removeAllErrorMessages = fieldName => {
    this.setState({ errors: Object.assign(this.state.errors, { [fieldName]: [] }) })
  }

  updateErrorsForField = (validation, fieldName, errorMessage) => {
    if (!validation) {
      addToStateProperty(
        'errors',
        {
          [fieldName]: [...new Set([...(this.state.errors[fieldName] || []), errorMessage])]
        },
        this
      )
    } else this.removeError(fieldName, errorMessage)
  }

  validateRules = (fieldName, fieldValue, fieldRules) =>
    fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)

      this.updateErrorsForField(validation, fieldName, rule.error)

      return accumulator && validation
    }, true)

  validateGroup = (fieldName, fieldValue, groupName) => {
    // check if any other member of the group is valid
    const otherMemberValid =
      this.state.groupValidation[groupName] &&
      Object.entries(this.state.groupValidation[groupName])
        .filter(field => !field.includes(fieldName))
        .some(member => member.includes(true))
    // if another member is valid do this
    if (otherMemberValid) {
      const fieldRules = this.props.fields[fieldName].rules
      const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)

      const newGroupValidation = this.state.groupValidation

      // and if another member is valid and this field is empty or valid, all is well, otherwise set invalidValuePresent
      newGroupValidation[groupName] =
        !fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0) || isFieldValid
          ? Object.assign({}, this.state.groupValidation[groupName], {
              [fieldName]: isFieldValid,
              invalidValuePresent: false
            })
          : Object.assign({}, this.state.groupValidation[groupName], {
              [fieldName]: isFieldValid,
              invalidValuePresent: true
            })
      const newValidation = Object.assign({}, this.state.validation, {
        [groupName]:
          Object.values(
            Object.assign({}, newGroupValidation[groupName], { invalidValuePresent: false }) // "filter" out invalidValuesPresent
          ).some(member => member === true) && !newGroupValidation[groupName].invalidValuePresent
      })

      const newValidState = Object.values(newValidation).every(field => field === true)
      this.setState(
        {
          groupValidation: newGroupValidation
        },
        () =>
          this.setState({
            validation: newValidation,
            isFormValid: newValidState
          })
      )
      return isFieldValid
    }
    // if no other member is valid, or this field has a value, check if this field is valid
    const fieldRules = this.props.fields[fieldName].rules
    const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)

    const newGroupValidation = this.state.groupValidation

    newGroupValidation[groupName] = Object.assign({}, newGroupValidation[groupName], { [fieldName]: isFieldValid })

    const newValidation = Object.assign(this.state.validation, {
      [groupName]:
        Object.values(
          Object.assign({}, this.state.groupValidation[groupName], { invalidValuePresent: false }) // "filter" out invalidValuesPresent
        ).some(member => member === true) && !this.state.groupValidation[groupName].invalidValuePresent
    })

    const newFormValid = Object.values(newValidation).every(field => field === true)

    this.setState(
      {
        groupValidation: Object.assign({}, this.state.groupValidation, newGroupValidation)
      },
      () => {
        this.setState({
          validation: newValidation,
          isFormValid: newFormValid
        })
      }
    )
    return isFieldValid
  }

  validateField = (fieldName, fieldValue) => {
    const field = this.props.fields[fieldName]
    // Check whether field is in a group
    const groupName =
      this.props.fields[fieldName].required && typeof this.props.fields[fieldName].required === 'string'
        ? this.props.fields[fieldName].required
        : undefined
    // ensure that empty non-required fields pass validation and don't throw errors
    if (!groupName && !field.required && fieldValue.length === 0) {
      addToStateProperty('validation', { [fieldName]: true }, this)
      return true
    }
    if (groupName) {
      return this.validateGroup(fieldName, fieldValue, groupName)
    }
    // standard validation
    const fieldRules = field.rules
    const isFieldValid = this.validateRules(fieldName, fieldValue, fieldRules)
    addToStateProperty('validation', { [fieldName]: isFieldValid }, this)
    return isFieldValid
  }

  validateFieldAndUpdateState(fieldName, fieldValue) {
    const onValidate = this.props.fields[fieldName].onValidate || this.props.onValidate || this.onValidate

    if (this.validateField(fieldName, fieldValue)) {
      onValidate(fieldName, fieldValue)
      this.setState({
        isFormValid: Object.values(this.state.validation).every(field => field === true)
      })
    } else {
      if (this.state.validation[fieldName] === null) return null
      onValidate(fieldName, null)
      this.setState({
        isFormValid: Object.values(this.state.validation).every(field => field === true)
      })
    }

    // if the user provides the returnInput prop, we set the input to parent state regardless of whether it is valid in the validatorInput object
    if (this.props.returnInput) {
      addToStateProperty('validatorInput', { [fieldName]: fieldValue }, this)
      this.props.parent.setState({ validatorInput: this.state.validatorInput })
    }
  }

  initialValidation = async () => {
    const fields = Object.values(this.props.fields).filter(field => field)

    fields.forEach(field => {
      const fieldInDom = document.getElementsByName(field.name)[0]
      const valueFromDom = (fieldInDom || {}).value
      const fieldValue = field.defaultValue || valueFromDom || ''

      this.validateFieldAndUpdateState(field.name, fieldValue)
    })
  }

  onChange = (e, d) => {
    const changeEvent = d ? d : e.target
    this.setState({ hasChanged: { ...this.state.changeEvent, [changeEvent.name]: true } })
    this.validateFieldAndUpdateState(changeEvent.name, changeEvent.value)
  }

  validateFieldsProp = () => {
    Object.values(this.props.fields).forEach(field => {
      if (!field.name) throw new Error(`Please provide a name value for all of your fields`)
      if (!field.rules)
        throw new Error(
          `Please provide a rules array for field ${field.name} (or an empty array for non-validated fields)`
        )
    })
  }
  // Add isRequired rule if field is required or in a group
  addRequiredRuleToFields() {
    Object.values(this.props.fields).forEach(field => {
      if (field.required === true || typeof field.required === 'string') {
        const newFields = this.props.fields
        newFields[field.name].rules.push('isRequired')
        this.setState({ fields: newFields })
      }
    })
  }

  render() {
    const { errors, isFormValid, validation, groupValidation, hasChanged } = this.state
    return this.props.children({
      isFormValid,
      isFieldValid: Object.assign({}, validation, ...Object.values(groupValidation)), //we  spread in all values of group Validation to show grouped fields individually
      hasChanged,
      fields: toArray(this.props.fields || {}),
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
  validateOnLoad: PropTypes.bool,
  returnInput: PropTypes.bool
}

Validator.defaultProps = {
  validateOnLoad: true,
  returnInput: false
}
