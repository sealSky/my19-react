import React from 'react'

import Board from './Board'

// 引入样式
import "./game.css"

/* 接口 */
interface GameState {
  history: Array<object>;
  xIsNext: boolean;
  stepNumber: number;
}

function calculateWinner(arr) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return arr[a];
    }
  }
  return null;
}

class Game extends React.Component<{}, GameState> {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
    this.handleClick = this.handleClick.bind(this);

  }

  public handleClick(i) {
    const history = this.state.history;
    const current: any = history[history.length - 1];
    const arr = current.squares.slice();

    if (calculateWinner(arr) || arr[i]) {
      console.log('已有落子或者已经分出胜者')
      return
    }
    arr[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState((state) => ({
        history: history.concat([{
          squares: arr,
        }]),
        xIsNext: !state.xIsNext,
        stepNumber: history.length,
      }
    ))
  }

  public jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2),
    })
  }

  render() {
    const history = this.state.history;
    const current: any = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = '获胜者：' + winner;
    } else {
      status = `下一步: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      let desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={this.handleClick} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>

    )
  }
}

export default Game