export default (target, value, context) => {
  context.setState({
    [target]: Object.assign(context.state[target], value)
  })
}
