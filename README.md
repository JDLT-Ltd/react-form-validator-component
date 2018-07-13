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
`yarn add react-validator-component`

`import { Validator } from 'react-validator-component'`

### Clone

`git clone git@github.com:JDLT-Ltd/react-form-validator-component.git`

## Usage

### Example

```javascript
class ExampleForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        emailAddress: {
          rules: ['isEmail', 'isRequired']
        }
      }
    }
  }

  render() {
    return (
      <Validator fields={this.state.fields} parent={this}>
        {({ isFormValid, fields, onChange, errors }) => {
          return (
            <form>
              <label>Your Emails</label>
              <input name="emailAddress" onChange={onChange} />
              {errors.emailAddress.map((error, i) => {
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

`Validator` has one **required** props  
  * `fields` - an object with one property per input field  
The key to each property must match the `name` attribute of the input field it refers to, and its value is an object with one property: a `rules` array of any combination of strings referring to our predefined validation rules and user-defined custom rules.
  
#### Optional Props

It also has three **optional** props

 * `parent` -  a reference to the component whose state `Validator` should add validated form data to.   
  By default a property will be added to `parent`'s state with a key equal to the `name` attribute of its `input` and a value equal to the valid input.  
 *  `onValidate` - A handler defining what to do with validated input.   
 By default, `Validator` will set `parent.state[fieldName]` to be either  valid input or null if input is invalid.

 **You need to provide at least one of `parent` or `onValidate`**
 
  * `validateOnLoad` - a boolean  
  By defautl `Validator` will attempt to validate every field that is prepopulated on `componentDidMount`. (empty fields will not dsiplay errors - however they will prevent set isFormValid to false).  
  If you want to avoid validation running on load, simply set the value to false.
 
### Rules in RFVC

RFVC let's you use a mixture of predefined rules and your personal custom rules, just as it let's you provide your own functionality for `onPassValidation`.

#### Default Rules

```javascript
fields: {
  emailAddress: {
    rules: ['isEmail', 'isRequired']
  }
}
```

We are currently still working on creating a comprehensive list of default rules, please check `src/lib/rules.js` for now.

#### Custom Rules

```javascript
fields: {
  emailAddress: {
    rules: [
      'isEmail',
      {
        validator: data => {
          if (data) return true
          return false
        },
        error: 'Please provide a value'
      }
    ]
  }
}
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

An object with a property for each field which will be `true` if it's valid and `false` if it's not.


#### `fields`

An array of objects which can optionally be used in the render prop function to build your form using a map. Each object will contain within its `value` property all properties that were passed into `Validator`.

##### i.e.

```javascript
fields: {
        emailAddress: {
          rules: ['isEmail', 'isRequired'],
          label: 'email address'
        }
      }
```

##### becomes

```javascript
;[
  {
    key: 'emailAddress',
    value: {
      rules: ['isEmail', 'isRequired'],
      label: 'email address'
    }
  }
]
```

#### `onChange`

`onChange` will validate the input provided and then update the parent components state, adding any valid input and removing possible invalid input.

#### `errors`

`Validator` will also provide an `errors` object, which contains a key for each validated input, the value of which is an array containing all applicable errors.
These can be displayed as a group or be mapped in order to produce individual error labels.

### Other Options

#### Group Validation

RFVC supports group validation, where only one member of a group needs to pass it's validation in order for the whole group to be validated.  
In order to use group validation, simply replace the value of the required key on fields with the groupname.

i.e.

```javascript
fields = {
    emailAddresses: {
      name: 'emailAddresses',
      rules: ['isEmailArray'],
      required: 'test',
      label: 'Email addresses'
    },
    something: {
      name: 'something',
      rules: ['isPhoneNumber'],
      required: 'test',
      label: 'Something'
    }
}
```