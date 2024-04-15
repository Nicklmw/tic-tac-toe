import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
//const props = {value: 1}
// const {value} = props;
// destruction objects

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function winnerCheck(squares) {
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCases.length; i++) {
    // i = 0 => [0, 1, 2]
    const [x, y, z] = winCases[i]; //x = 0, y = 1, z = 2 // Day 11- destruct
    if (squares[x] && squares[x] === squares[y] && squares[y] === squares[z]) {
      return squares[x]; //there is a winner
    }
  }
  return null; //there is not winner yet
}
// state is not equal to variables
// const [value, setValue] = useState(null);
//console.log("props value:", value);
// function handleOnClick() {
//   if (value === "X") {
//     setValue("O");
//   } else {
//     setValue("X"); // value => X state change => re-rendering
//   }
// }
// <button className="square" onClick={() => handleOnClick(value)}>
//   {value}
// </button>
// }
function Board() {
  const [xTurn, setXTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    console.log("the table turns");
    //FETCH DATA
  }, [xTurn]);

  function handleClick(index) {
    const newSquares = squares.slice();
    if (squares[index] || winnerCheck(squares)) {
      return;
    }
    if (xTurn) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setSquares(newSquares);
    setXTurn(!xTurn);
    // setSquares(["X", null, null, null, null, null, null, null]);
    // newSquares[index] = "X";
    // setSquares(newSquares);
  }
  let message;
  // whose round is it?
  // or who is the winner?
  //["X","O","O",...]
  // initial state =
  const winner = winnerCheck(squares);
  if (winner) {
    //have winner
    message = `really congraduations! ${winner} has won the game`;
  } else {
    message = `next is your turn, ${xTurn ? "X" : "O"}`;
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <p>{message}</p>
    </>
  );
}

export default Board;
