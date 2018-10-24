import React from 'react'
import PropTypes from 'prop-types'

import * as defaultRules from './rules'

import addToStateProperty from './utils/addToStateProperty'
export default class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: this.initialiseStateErrors(props.fields),
      groupValidation: this.initialiseStateGroupValidation(props.fields),
      validation: this.initialiseStateFieldValidation(props.fields),
      isFormValid: false,
      validatorInput: {} // only used if user sets returnInput
    }
  }

  componentDidMount() {
    this.validateFieldsProp()
    this.addRequiredRuleToFields()
    this.validateFormAndUpdateState()
    // TODO: only remove errors from empty fields
    if (this.props.validateOnLoad) this.props.fields.forEach(field => this.removeAllErrorMessages(field.name))
  }

  // each field gets an (empty) array for its errors
  initialiseStateErrors(fields) {
    return fields.map(field => field.name).reduce((accumulator, currentValue) => {
      accumulator[currentValue] = []
      return accumulator
    }, {})
  }

  initialiseStateGroupValidation(fields) {
    return fields.reduce((groupValidation, currentField) => {
      if (currentField.required && typeof currentField.required === 'string') {
        groupValidation[currentField.required] = Object.assign({}, groupValidation[currentField.required], {
          [currentField.name]:
            (currentField.rules && currentField.rules.length > 0) || currentField.required ? false : true
        })

        return groupValidation
      }
      return groupValidation
    }, {})
  }

  initialiseStateFieldValidation(fields) {
    return fields.reduce((accumulator, currentField) => {
      //if field is a member of a group, add that group to validation and add the field to validation.groupValidation
      if (currentField.required && typeof currentField.required === 'string') {
        accumulator[currentField.required] = false
        return accumulator
      } else {
        accumulator[currentField] =
          (currentField.rules && currentField.rules.length > 0) || currentField.required ? false : true
        return accumulator
      }
    }, {})
  }

  componentDidUpdate(prevProps) {
    const currentProps = this.props
    if (currentProps.fields !== prevProps.fields)
      this.setState({
        fields: currentProps.fields,
        errors: this.initialiseStateErrors(currentProps.fields),
        groupValidation: this.initialiseStateGroupValidation(currentProps.fields),
        validation: this.initialiseStateFieldValidation(currentProps.fields),
        isFormValid: false
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

  validateRules = (fieldName, fieldValue, fieldRules) =>{
    console.log('args in validateRules: ', fieldName, fieldValue, fieldRules)
    return fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)

      this.updateErrorsForField(validation, fieldName, rule.error)

      return accumulator && validation
    }, true)}

  validateGroup = (field, fieldValue, groupName) => {
    // check if any other member of the group is valid
    if (
      this.state.groupValidation[groupName] &&
      Object.entries(this.state.groupValidation[groupName])
        .filter(field => !field.includes(field.name))
        .some(member => member.includes(true))
    ) {
      const isFieldValid = this.validateRules(field.name, fieldValue, field.rules)

      const newGroupValidation = this.state.groupValidation

      newGroupValidation[groupName] = Object.assign({}, this.state.groupValidation[groupName], {
        [field.name]: isFieldValid
      })
      return this.setState({
        groupValidation: newGroupValidation
      })
    }
    // check if this field is valid
    const isFieldValid = this.validateRules(field.name, fieldValue, field.rules)

    const newGroupValidation = this.state.groupValidation

    newGroupValidation[groupName] = Object.assign({}, newGroupValidation[groupName], { [field.name]: isFieldValid })

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

  validateField = (field, fieldValue) => {
    // Check whether field is in a group
    const groupName = field.required && typeof field.required === 'string' ? field.required : undefined
    // ensure that empty non-required fields pass validation and don't throw errors
    if (!groupName && !field.required && fieldValue.length === 0) {
      addToStateProperty('validation', { [field.name]: true }, this)
      return true
    }
    if (groupName) {
      return this.validateGroup(field, fieldValue, groupName)
    }
    // standard validation
    const isFieldValid = this.validateRules(field.name, fieldValue, field.rules)
    this.setState({
      validation: Object.assign(this.state.validation, { [field.name]: isFieldValid })
    })
    return isFieldValid
  }

  validateFieldAndUpdateState(field, fieldValue) {
    const onValidate = field.onValidate || this.props.onValidate || this.onValidate

    if (this.validateField(field, fieldValue)) {
      onValidate(field.name, fieldValue)
    } else {
      onValidate(field.name, null)
    }

    this.setState({
      isFormValid: Object.values(this.state.validation).every(value => value)
    })

    // if the user provides the returnInput prop, we set the input to parent state regardless of whether it is valid in the validatorInput object
    if (this.props.returnInput) {
      addToStateProperty('validatorInput', { [field.name]: fieldValue }, this)
      this.props.parent.setState({ validatorInput: this.state.validatorInput })
    }
  }

  validateFormAndUpdateState = () => {
    this.props.fields.forEach(field => {
      const valueFromDom = document.getElementsByName(field.name)[0].value
      const fieldValue =
        field.defaultValue || (document.getElementsByName(field.name)[0] && valueFromDom ? valueFromDom : '')

      this.validateFieldAndUpdateState(field, fieldValue)
    })
  }

  onChange = (e, d) => {
    const changeEvent = d ? d : e.target
    this.validateFieldAndUpdateState(changeEvent.name, changeEvent.value)
  }

  validateFieldsProp = () => {
    this.props.fields.forEach(field => {
      if (!field.name) throw new Error(`Please provide a name value for all of your fields`)
      if (!field.rules)
        throw new Error(
          `Please provide a rules array for field ${field.name} (or an empty array for non-validated fields)`
        )
    })
  }
  // Add isRequired rule if field is required and not in a group
  addRequiredRuleToFields() {
    this.props.fields.forEach(field => {
      if (field.required === true) {
        const newFields = this.props.fields
        newFields.find(newField => newField.name === field.name).rules.push('isRequired')
        this.setState({ fields: newFields })
      }
    })
  }

  render() {
    const { errors, isFormValid, validation, groupValidation } = this.state
    return this.props.children({
      isFormValid,
      isFieldValid: Object.assign({}, validation, ...Object.values(groupValidation)), //we  spread in all values of group Validation to show grouped fields individually
      fields: this.props.fields,
      onChange: this.onChange,
      errors
    })
  }
}

Validator.propTypes = {
  parent: PropTypes.object,
  children: PropTypes.func,
  onValidate: PropTypes.func,
  fields: PropTypes.array,
  validateOnLoad: PropTypes.bool,
  returnInput: PropTypes.bool
}

Validator.defaultProps = {
  fields: [],
  validateOnLoad: true,
  returnInput: false
}
