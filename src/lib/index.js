// export everything from here

import React from 'react'

class Validator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.children()
  }
}

export { Validator }