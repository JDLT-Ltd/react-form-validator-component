export default (target, value, context) => {
  context.setState(
    {
      [target]: Object.assign(context.state[target], value)
    },
    () => {
      if (target === 'validation')
        this.setState({
          isFormValid: Object.values(this.state.validation).every(value => value)
        })
    }
  )
}
