import '@styles/tic-tac-toe.css'

export default function TicTacToe() {
  const container = document.createElement('div')
  container.className = 'tic-tac-toe-container'

  const ticTacToe = document.createElement('div')
  ticTacToe.className = 'tic-tac-toe'

  const scoreboard = document.createElement('div')
  scoreboard.className = 'scoreboard'
  const player1ScoreDiv = document.createElement('div')
  player1ScoreDiv.className = 'player1-score'
  player1ScoreDiv.textContent = 'Jugador 1: 0'
  const player2ScoreDiv = document.createElement('div')
  player2ScoreDiv.className = 'player2-score'
  player2ScoreDiv.textContent = 'Jugador 2: 0'
  scoreboard.appendChild(player1ScoreDiv)
  scoreboard.appendChild(player2ScoreDiv)

  const winnerDiv = document.createElement('div')
  winnerDiv.className = 'winner'

  const finalWinnerDiv = document.createElement('div')
  finalWinnerDiv.className = 'final-winner'

  // Función para limpiar los mensajes de ganador
  const clearWinnerDivs = () => {
    winnerDiv.textContent = ''
    finalWinnerDiv.textContent = ''
    winnerDiv.classList.remove('visible')
    finalWinnerDiv.classList.remove('visible')
  }

  let board = Array(9).fill(null)
  let currentPlayer = Math.random() < 0.5 ? 'X' : 'O'
  let player1Wins = 0
  let player2Wins = 0
  let gamesPlayed = 0

  const updateBoard = () => {
    ticTacToe.innerHTML = ''
    board.forEach((cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.className = `cell ${cell || ''}`
      cellElement.textContent = cell || ''
      cellElement.addEventListener('click', () => makeMove(index))
      ticTacToe.appendChild(cellElement)
    })
    container.innerHTML = ''
    container.appendChild(scoreboard)
    container.appendChild(ticTacToe)
    container.appendChild(winnerDiv)
    container.appendChild(finalWinnerDiv)
  }

  const makeMove = (index) => {
    if (!board[index] && gamesPlayed < 3) {
      board[index] = currentPlayer
      updateBoard()
      checkWinner()
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
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
        highlightWinningCombination(combination)
        displayWinner(board[a])
        updateScore(board[a])
        return
      }
    }

    if (!board.includes(null)) {
      displayWinner('Draw')
      setTimeout(resetGame, 2000)
    }
  }

  const highlightWinningCombination = (combination) => {
    combination.forEach((index) => {
      const cell = ticTacToe.querySelector(`.cell:nth-child(${index + 1})`)
      cell.classList.add('highlight')
    })
    setTimeout(resetGame, 2000)
  }

  const displayWinner = (winner) => {
    winnerDiv.textContent =
      winner === 'Draw' ? '¡Es un empate! :/' : `${winner} gana esta ronda.`
    winnerDiv.classList.add('visible')
    setTimeout(() => {
      winnerDiv.classList.remove('visible')
      resetGame() // Reiniciar el juego automáticamente después de mostrar el mensaje final
    }, 2000) // Desaparecer mensaje de ganador después de 2 segundos
  }

  const updateScore = (winner) => {
    if (winner === 'X') player1Wins++
    else if (winner === 'O') player2Wins++

    player1ScoreDiv.textContent = `Jugador 1: ${player1Wins}`
    player2ScoreDiv.textContent = `Jugador 2: ${player2Wins}`

    if (player1Wins === 2 || player2Wins === 2) {
      displayFinalWinner()
    }
  }

  const displayFinalWinner = () => {
    finalWinnerDiv.textContent =
      player1Wins > player2Wins
        ? '¡Jugador 1 es el ganador del juego! :)'
        : '¡Jugador 2 es el ganador del juego! :)'
    finalWinnerDiv.classList.add('visible')
    setTimeout(() => {
      finalWinnerDiv.classList.remove('visible')
      resetGame(true) // Reiniciar el juego y los puntajes después de mostrar el mensaje final
    }, 2000)
  }

  const resetGame = (resetScores = false) => {
    board = Array(9).fill(null)
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O' // Comienza aleatoriamente entre X y O
    gamesPlayed = 0 // Reiniciar contador de juegos jugados

    if (resetScores) {
      player1Wins = 0
      player2Wins = 0
      player1ScoreDiv.textContent = 'Jugador 1: 0'
      player2ScoreDiv.textContent = 'Jugador 2: 0'
    }

    updateBoard()
    clearWinnerDivs() // Limpia los mensajes de ganador al reiniciar el juego
  }

  // Iniciar el juego cuando se carga el componente
  updateBoard()

  return container
}
