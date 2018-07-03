# React Form Validator

React Form Validator exposes a single React component which uses the render prop pattern to validate the input on its child form.

The render prop function will be passed `isFormValid`, `isFieldValid`, `errors`, `fields`, and `onChange` to use in the form itself.

## Installation

`yarn add react-validator-component`

`import { Validator } from 'react-validator-component'`

## Example

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

## Usage

### Props

`Validator` has one required prop, `fields`, which is an object with one property per input field.  
The key to each property must match the `name` attribute of the input field it refers to, and its value is an object with one property: a `rules` array of any combination of strings referring to our predefined validation rules and user-defined custom rules.

#### Using predefined rules

```javascript
fields: {
  emailAddress: {
    rules: ['isEmail', 'isRequired']
  }
}
```

#### Using custom rules

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

Where `validator` is a function returning a boolean and `error` is the desired error message.

You must also provide one of either `parent` or `onPassValidation`.  
`parent` is a reference to the component whose state `Validator` should add validated form data to. By default a property will be added to `parent`'s state with a key equal to the `name` attribute of its `input` and a value equal to the valid input.

Alternatively, you can provide an `onPassValidation` prop, which is a handler defining what to do with valid input (`Validator` will only return valid input).

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
