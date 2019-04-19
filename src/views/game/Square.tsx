import React from 'react'

interface SquareProps {
  value: number | string;
  onClick: any;
}

interface SquareState {
  value?: number | null | string;
}

class Square extends React.Component<SquareProps, SquareState> {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

export default Square;