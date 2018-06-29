const isRequired = {
  validator: data => {
    if (data) return true
    return false
  },
  error: 'Please provide a value'
}

const emailArrayRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/

const isEmailArray = {
  validator: data => {
    if (data.match(emailArrayRegex)) return true
    return false
  },
  error: 'Please provide a valid email address'
}

export { isRequired, isEmailArray }
