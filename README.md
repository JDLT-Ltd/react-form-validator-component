# React Form Validator

React Form Validator exposes a single React component which uses the render prop pattern to validate the input on its child form.   
It is built as a pure React component, with no additional dependencies, making it efficient and cheap to add to any React project. Due to interacting with underlying basic HTML tags, it is compatible with popular design Frameworks like Semantic or Bootstrap out of the box.
<!-- 
The render prop function will be passed `isFormValid`, `isFieldValid`, `errors`, `fields`, and `onChange` to use in the form itself. -->

## Table of Contents


[**Installation**](#installation)
  * [**1.1 - Using NPM/YARN**](#npm/yarn)
  * [**1.2 - Clone the repo**](#clone)


  [**Usage**](#Usage)
  * [**2.1 - Example**](#example)
  * [**2.2 - Props in RFVC**](#props-in-rfvc)
    * [**2.2.1 - Required props**](#required-props)
    * [**2.2.2 - Optional props**](#optional-props)
  * [**2.3 - Rules in RFVC**](#rules-in-rfvc)
    * [**2.3.1 - Default rules**](#default-rules)
    * [**2.3.2 - Custom rules**](#custom-rules)
  * [**2.4 - Arguments in RFVC**](#arguments)
  * [**2.5 - Other options**](#other-options)
      * [**2.5.1 - Group Validation**](#group-validation)


[**Project Motivation**](#project-motivation)

**Additional Info**
  * [**Current Goals**](#current-goals)
  * [**Changelog**](#changelog)
  * [**License**](#license)

## Installation

### NPM/YARN
`yarn add react-form-validator-component`

`import { Validator } from 'react-form-validator-component'`

### Clone

`git clone git@github.com:JDLT-Ltd/react-form-validator-component.git`

**react-form-validator-component comes with a usage example that can be viewed by cloning the repo and running yarn start** 

## Usage

### Example

```javascript
class ExampleForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
       fields: [{
        name: 'emailAddresses',
        rules: ['isEmailArray'],
        required: true,
        label: 'Email addresses'
      }]
    }
  }

  render() {
    return (
      <Validator fields={this.state.fields} parent={this}>
        {({ isFormValid, fields, onChange, errors }) => {
          return (
            <form>
              <label>Your Emails</label>
              <input name="emailAddresses" onChange={onChange} />
              {errors.emailAddresses.map((error, i) => {
                return <span key={i}>{error}</span>
              })}
              {isFormValid && <button type="submit">Submit</button>}
            </form>
          )
        }}
      </Validator>
    )
  }
}
```

### Props in RFVC

#### Required props

`Validator` has two **required** props 
  * `fields` - an array with an Object for each field you want to validate 

    The structure of a field object is as follows 

    Required Keys
    * `rules` - Each object must have a `rules` array, containing any combination of strings referring to our predefined validation rules and user-defined custom rules. 
    * `name` - The second required key is `name` which names the field you are validating. This must correspond to the name of the input field you want to validate.

    Optional Keys
    * `required` - This key determines whether a field is required. If is is set to `true`, the field will only pass validation with a value. It can alternatively be set to a string which names the validation group it is a part of. [**See Group Validation**](#group-validation)
    * `defaultValue` - You can optionally provide a `defaultValue` property for each field. This is only required if you want to validate your form on load but are using form field components which don't correlate one-to-one with actual DOM nodes.
    * `onChange` - You can pass a custom onChange for each field, in case you have certain fields which need to be handled differently from the default.
    E.g. `semantic-ui-react`'s `DropDown` component (i.e. the matching `name` attribute cannot be found on a DOM node containing the value to be validated). In those cases, the Validator's default method of checking values on load will fail. However, validation on *change* will be unaffected. 
    * `label` - You can provide a label key, which will be returned from Validator in case you want to map over fields in order to build a form. 

  * `parent` - a reference to the component whose state `Validator` should add validated form data to.   
RFVC requires the parent components this context for several operations.
By default a property will be added to `parent`'s state with a key equal to the `name` attribute of its `input` and a value equal to the validated input. 
  
#### Optional Props

Validator also has three **optional** props
  
 *  `onValidate` - A handler defining what to do with validated input.   
 By default, `Validator` will set `parent.state[fieldName]` to be either  valid input or null if input is invalid.
 
  * `validateOnLoad` - a boolean  
  By default `Validator` will attempt to validate every field that is prepopulated on `componentDidMount`. (Empty required fields will not display errors - however they will set isFormValid to false).  
  If you want to avoid validation running on load, simply set the value to false.

  * `returnInput` - a boolean  
  By default `Validator` will only affect the parent components state when an inputs validation state changes. 
  That is, when input passes validation it is passed to the parents state and if it fails validation it is set to null.\
  If you pass the returnInput prop, RFVC will always update an Object on the parent's state which contains a key for each input and the corresponding value.

  
 
### Rules in RFVC

You can use a mixture of predefined rules and your personal custom rules, just as it let's you provide your own functionality for `onPassValidation`.

#### Default Rules

```javascript
const fields = [{
        name: 'emailAddresses',
        rules: ['isEmailArray'],
        required: true,
        label: 'Email addresses'
      }
  ]
```

We are currently still working on creating a comprehensive list of default rules, please check `src/lib/rules.js` for now.

#### Custom Rules

```javascript
const fields = [
  { name: 'emailAddresses',
    required: true,
    label: 'Email addresses',
    rules: [
      'isEmail',
      {
        validator: data => {
          if (data) return true
          return false
        },
        error: 'Please provide a value'
      }]
  }
]
```

You can write custom rules and simply use them inside the rules Array as long as they follow RFVC's format of
```javascript
{
  validator: {Your Code},
  error: {Your Error Message}  
}
```

Where `validator` is a function returning a boolean and `error` is the desired error message.


### Arguments

The following arguments are provided to the render prop function:

#### `isFormValid`

A boolean. `true` when all inputs are validated.

#### `isFieldValid`

An object with a property for each field. The key matches the `name` property of the field and the value will be `true` if that field is valid and `false` if it's not.

#### `fields`

An array of objects which can optionally be used in the render prop function to build your form using a map.

#### `onChange`

`onChange` will validate the input provided and then update the parent component's state, adding any valid input and removing possible invalid input.

#### `errors`

`Validator` will also provide an `errors` object, which contains a key for each validated input, the value of which is an array containing all applicable errors.
These can be displayed as a group or be mapped in order to produce individual error labels.

### Other Options

#### Group Validation

RFVC supports group validation, where only one member of a group needs to pass it's validation in order for the whole group to be validated.  
In order to use group validation, simply replace the value of the required key on fields with the groupname.

i.e.

```javascript
const fields = [
    {
      name: 'emailAddresses',
      rules: ['isEmailArray'],
      required: 'test',
      label: 'Email addresses'
    },
    {
      name: 'something',
      rules: ['isPhoneNumber'],
      required: 'test',
      label: 'Something'
    }
]
```