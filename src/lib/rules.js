const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailArrayRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
const phoneNumberRegex = /^[+]?(\d{1,3})\s?(\d{10})$/
const postcodeRegex = /^(([A-Za-z0-9]{2,4})\s?([A-Za-z0-9]{1,5})?)?$/

const isRequired = {
  validator: data => {
    if (data) return true
    return false
  },
  error: 'Please provide a value'
}

const isFullName = {
  validator: data => {
    if (data.match(nameRegex)) return true
    return false
  },
  error: 'Please provide a full name'
}

const isEmail = {
  validator: data => {
    if (data.match(emailRegex)) return true
    return false
  },
  error: 'Please provide a valid email address'
}

const isEmailArray = {
  validator: data => {
    if (data.match(emailArrayRegex)) return true
    return false
  },
  error: 'Please provide a valid email address, or several emails comma delimited'
}

const isPhoneNumber = {
  validator: data => {
    if (data.match(phoneNumberRegex)) return true
    return false
  },
  error: 'Please provide a valid UK phone number'
}

const isPostcode = {
  validator: data => {
    if (data.match(postcodeRegex)) return true
    return false
  },
  error: 'Please provide a valid UK postcode'
}

export { isRequired, isEmail, isEmailArray, isFullName }
