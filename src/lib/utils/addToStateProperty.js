export default (target, value, context) => {
  context.setState(
    {
      [target]: Object.assign(context.state[target], value)
    },
    () => {
      if (target === 'validation')
        console.log(
          'addToStateProperty called on validation, checking isFormValid again with: ',
          context.state.validation
        )
      context.setState({
        isFormValid: Object.values(context.state.validation).every(value => value)
      })
    }
  )
}
