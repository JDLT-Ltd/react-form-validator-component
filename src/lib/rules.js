const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailArrayRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
const phoneNumberRegex = /^[+]?(\d{1,3})\s?(\d{10})$/
const postCodeRegex = /^(([A-Za-z0-9]{2,4})\s?([A-Za-z0-9]{1,5})?)?$/
const sortCodeRegex = /^(\d{2}(\s|[-])\d{2}(\s|[-])\d{2}$)|\d{6}|^$/
const swiftCodeRegex = /^((([A-Za-z]{6}[0-9A-Za-z]{2})|([A-Za-z]{4}(\s|-)?[A-Za-z]{2}(\s|-)?[0-9A-Za-z]{2}))[0-9A-Za-z]{3}?$)|^$/
const ibanRegex = /^([0-9A-Za-z]{4}\s?){4,6}([0-9A-Za-z]{1,4}|[0-9A-Za-z]{4}\s?[0-9A-Za-z]{1|4})?$/
const vatNumberRegex = /^\d{8,15}$/
const alphaNumericRegex = /^[A-Z0-9a-z\-/\s]+$/i
const numericRegex = /^-?\d*[.]?\d+$/
const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g

const isRequired = {
  validator: data => {
    if (((data.isArray() && data.length > 0) || data) || data === false) return true
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

const isPostCode = {
  validator: data => {
    if (data.match(postCodeRegex)) return true
    return false
  },
  error: 'Please provide a valid UK postcode'
}

const isSortCode = {
  validator: data => {
    if (data.match(sortCodeRegex)) return true
    return false
  },
  error: 'Please provide a UK Sort Code'
}

const isSwiftCode = {
  validator: data => {
    if (data.match(swiftCodeRegex)) return true
    return false
  },
  error: 'Please provide a valid Swift Code'
}

const isIban = {
  validator: data => {
    if (data.match(ibanRegex)) return true
    return false
  },
  error: 'Please provide a valid Swift Code'
}

const isVatNumber = {
  validator: data => {
    if (data.match(vatNumberRegex)) return true
    return false
  },
  error: 'Please provide a valid UK VAT Number'
}

const isAlphaNumeric = {
  validator: data => {
    if (data.match(alphaNumericRegex)) return true
    return false
  },
  error: 'Please provide an alphanumeric input'
}

const isNumeric = {
  validator: data => {
    if (typeof data === 'number') {
      return true
    }
    if (data.match(numericRegex)) return true
    return false
  },
  error: 'Please provide an numeric input'
}

const isUrl = {
  validator: data => {
    if (data.match(urlRegex)) return true
    return false
  },
  error: 'Please provide a valid URL'
}

const isLength = {
  validator: (data, length) => {
    if (data.length === length) return true
    return false
  },
  error: `Please provide an input of exactly ${length} characters`
}

const maxLength = {
  validator: (data, length) => {
    if (data.length <= length) return true
    return false
  },
  error: `The maximum length of this input is ${length} characters`
}

const minLength = {
  validator: (data, length) => {
    if (data.length >= length) return true
    return false
  },
  error: `The minimum length of this input is ${length} characters`
}

export {
  isRequired,
  isEmail,
  isEmailArray,
  isFullName,
  isPhoneNumber,
  isPostCode,
  isSortCode,
  isSwiftCode,
  isIban,
  isVatNumber,
  isAlphaNumeric,
  isNumeric,
  isUrl,
  isLength,
  maxLength,
  minLength
}
