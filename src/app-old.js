import { useState } from 'react';

function Square({ value, color, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick} style={{backgroundColor: color}}>
      {value}
    </button>
  )
}

function Board({ xNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  let currBoard = generateBoard([]);
  if (winner) {
    status = "Winner: " + squares[winner[0]];
    currBoard = generateBoard(winner)
    if (winner === "full") {
      status = "Tie";
    }
  } else {
    status = "Next player: " + (xNext ? "X" : "O");
  }
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    let fill = xNext ? "X" : "O";
    const newSquares = squares.slice();
    newSquares[i] = fill;
    onPlay(newSquares, i);
  }

  function generateBoard(colorList) {
    let squaresList = [];
    const nums = [0, 1, 2]
    for (let i = 0; i < 3; i++) {
      squaresList.push(<div className="board-row" key={i}></div>)
      const row = nums.map(idx => 
        <Square
          key={3 + idx + i * 3}
          value={squares[idx + i * 3]}
          onSquareClick={() => handleClick(idx + i * 3)}
          color={idx + i * 3 === colorList[0] || idx + i * 3 === colorList[1] || idx + i * 3 === colorList[2] ? "green" : ""}
        />
      );
      squaresList.push(row);
    }
    return squaresList;
  }
  return (
    <>
    <div className='status'>{status}</div>
    {currBoard}
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove, setCurrMove] = useState(0);
  const currSquares = history[currMove];
  const xNext = currMove % 2 === 0;
  let moveIndex;
  function handlePlay(nextSquares, moveIdx) {
    const nextHistory = [...history.slice(0, currMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrMove(nextHistory.length - 1);
    // let moveCol = moveIdx % 3;
    // let moveRow = (moveIdx / 3); bruhhh what is floor division in JS
    // alert([moveRow])
  }
  function jumpTo(nextMove) {
    setCurrMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
      if (move === history.length - 1) {
        return (
          <div>You are at move #{move}</div>
        )
      }
    } else {
      description = "Go to game start.";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} style={{margin: "5px"}}>
          {description}
        </button>
      </li>
    )
  });

  return  (
    <div className="game">
      <div className="game-board">
        <Board xNext={xNext} squares={currSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i]
    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
      return patterns[i]
    }
  }
  if (squares.every(value => value != null)) {
    return "full";
  }
  return null;
}