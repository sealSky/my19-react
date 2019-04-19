import * as React from 'react'

import Square from './Square'

/* 接口 */
interface BoardProps {
  squares: Array<any>;
  onClick: any;
}

interface BoardState {
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props) {
    super(props);
    this.state = {}
    // 绑定静态方法
    this.renderSquare = this.renderSquare.bind(this);
  }

  public renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick = {(): any => this.props.onClick(i)}
      />
    )
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

export default Board;