import React, { Component } from 'react'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(i) {
    console.log('You clicked: ' + this.props.items[i]);
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, i) => {
          return (
            <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          )
        })}
      </div>
    );
  }
}

export default List;