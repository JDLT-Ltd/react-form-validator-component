export default object => {
  return Object.entries(object).reduce((accumulator, [key, value]) => {
    return accumulator.concat({
      key,
      value
    })
  }, [])
}
