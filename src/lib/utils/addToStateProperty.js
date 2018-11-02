export default (target, value, context) => {
  context.setState(
    {
      [target]: Object.assign(context.state[target], value)
    },
    () => {
      if (target === 'validation') {
        context.setState({ isFormValid: Object.values(context.state.validation).every(field => field === true) })
      }
    }
  )
}
