import React from 'react'
import PropTypes from 'prop-types'

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>Hello组件的</h3>
        <div>传入的name: {this.props.name}</div>
        <br/>
      </div>
    )
  }
}

Hello.defaultProps = {
  name: 'Jack'
}

Hello.propTypes = {
  name: PropTypes.string
}

export default Hello