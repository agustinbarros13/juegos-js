import '@styles/tic-tac-toe.css'

export default function TicTacToe() {
  const container = document.createElement('div')
  container.className = 'tic-tac-toe'

  const board = Array(9).fill(null)
  let currentPlayer = 'X'

  const updateBoard = () => {
    container.innerHTML = ''
    board.forEach((cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.className = 'cell'
      cellElement.innerText = cell || ''
      cellElement.addEventListener('click', () => makeMove(index))
      container.appendChild(cellElement)
    })
  }

  const makeMove = (index) => {
    if (!board[index]) {
      board[index] = currentPlayer
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      updateBoard()
      checkWinner()
    }
  }

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(`${board[a]} wins!`)
        resetGame()
        return
      }
    }

    if (!board.includes(null)) {
      alert("It's a draw!")
      resetGame()
    }
  }

  const resetGame = () => {
    board.fill(null)
    currentPlayer = 'X'
    updateBoard()
  }

  updateBoard()
  return container
}
