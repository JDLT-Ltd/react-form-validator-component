export default (target, value, context) => {
  console.log('target in addtoState', value)
  console.log('value in addtoState', value)
  console.log('context in addToState', context)
  context.setState({
    [target]: Object.assign(context.state[target], value)
  })
}
