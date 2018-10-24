export default (target, value, context) => {
  console.log('args in addtoState', target, value, context)
  context.setState({
    [target]: Object.assign(context.state[target], value)
  })
}
