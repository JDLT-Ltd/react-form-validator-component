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
        accumulator[currentValue] =
          props.fields[currentValue].rules && props.fields[currentValue].rules.length > 0 ? false : true
        return accumulator
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
    const field = this.state.fields[fieldName]
    let fieldRules = [...field.rules]
    console.log(`fieldRules for ${fieldName} at 62: ${fieldRules}`)
    // get 'required' value
    const isRequired = field.required
    // if false, make sure 'isRequired' isn't in rules, so that the required property always takes precedence
    if (isRequired === false) fieldRules = [...fieldRules.filter(r => r !== 'isRequired')]
    console.log(`fieldRules for ${fieldName} at 67: ${fieldRules}`)
    // if true, add 'isRequired' to rules, which will be fetched from defaultRules
    if (isRequired === true) fieldRules = [...fieldRules, 'isRequired']
    console.log(`fieldRules for ${fieldName} at 70: ${fieldRules}`)
    // if group, check whether the rest of the group are already valid
    if (typeof isRequired === 'string') {
      const group = field.required
      const groupFields = Object.values(this.state.fields).filter(
        f => typeof f.required === 'string' && f.required === group && f.name !== fieldName
      )
      console.log(groupFields)
      const othersValid = groupFields.reduce((accumulator, groupMember) => {
        const isGroupMemberValid = !!this.state.validation[groupMember]
        console.log(isGroupMemberValid)
        return accumulator && isGroupMemberValid
      }, true)
      // if any of the others aren't valid, this one needs to be
      if (!othersValid) fieldRules = [...fieldRules, 'isRequired']
      console.log(`fieldRules for ${fieldName} at 81: ${fieldRules}`)
    }

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

  validateGroup = (fieldName, fieldValue) => {
    const currentField = this.state.fields[fieldName]
    const group = this.state.fields.filter(
      field => typeof field.required === 'string' && field.required === currentField.required
    )

    const isCurrentFieldValid = fieldRules.reduce((accumulator, fieldRule) => {
      const rule = defaultRules[fieldRule] || fieldRule
      const validation = rule.validator(fieldValue)
      this.updateErrors(validation, fieldName, rule.error)
      return accumulator && validation
    }, true)
    console.log(group)
    if (isCurrentFieldValid)
      this.setState({ validation: Object.assign(this.state.validation, { [currentField.required]: true }) })
  }

  validateFieldAndUpdateState(fieldName, fieldValue) {
    const onValidate = this.props.fields[fieldName].onValidate || this.props.onValidate || this.onValidate

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
