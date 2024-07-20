import '@styles/tic-tac-toe.css'

export default function TicTacToe() {
  let board = Array(9).fill(null)
  let currentPlayer = 'X'
  let player1Wins = parseInt(localStorage.getItem('ticTacToePlayer1Wins')) || 0
  let player2Wins = parseInt(localStorage.getItem('ticTacToePlayer2Wins')) || 0
  const roundsToWin = 2

  const container = createElement('div', 'tic-tac-toe-container')
  const ticTacToe = createElement('div', 'tic-tac-toe')
  const scoreboard = createScoreboard()
  const resultDiv = createElement('div', 'result')
  const previousResultDiv = createElement('div', 'previous-result')

  function createElement(tag, className) {
    const element = document.createElement(tag)
    element.className = className
    return element
  }

  function createScoreboard() {
    const scoreboardElement = createElement('div', 'scoreboard')
    updateScoreboard(scoreboardElement)
    return scoreboardElement
  }

  function updateScoreboard(scoreboardElement) {
    scoreboardElement.innerHTML = ''
    scoreboardElement.appendChild(
      createElement('div', 'player1-score')
    ).textContent = `Jugador 1: ${player1Wins}`
    scoreboardElement.appendChild(
      createElement('div', 'player2-score')
    ).textContent = `Jugador 2: ${player2Wins}`
  }

  function updateBoard() {
    ticTacToe.innerHTML = ''
    board.forEach((cell, index) => {
      const cellElement = createElement('div', `cell ${cell || ''}`)
      cellElement.textContent = cell || ''
      cellElement.addEventListener('click', () => makeMove(index))
      ticTacToe.appendChild(cellElement)
    })
    container.innerHTML = ''
    container.appendChild(resultDiv)
    container.appendChild(scoreboard)
    container.appendChild(ticTacToe)
    updateScoreboard(scoreboard)
  }

  function makeMove(index) {
    if (!board[index] && !checkWinner()) {
      board[index] = currentPlayer
      updateBoard()
      if (!checkWinner()) currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
  }

  function checkWinner() {
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
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        highlightWinningCombination([a, b, c])
        displayWinner(board[a])
        updateScore(board[a])
        return true
      }
    }
    if (!board.includes(null)) {
      displayWinner('Draw')
      setTimeout(resetGame, 2000)
    }
    return false
  }

  function highlightWinningCombination(combination) {
    combination.forEach((index) => {
      ticTacToe
        .querySelector(`.cell:nth-child(${index + 1})`)
        .classList.add('highlight')
    })
  }

  function displayWinner(winner) {
    resultDiv.textContent =
      winner === 'Draw' ? '¡Es un empate! :/' : `${winner} gana esta ronda.`
    resultDiv.classList.add('visible')
    setTimeout(() => {
      resultDiv.classList.remove('visible')
      if (player1Wins === roundsToWin || player2Wins === roundsToWin)
        displayFinalWinner()
      else resetGame()
    }, 2000)
  }

  function updateScore(winner) {
    if (winner === 'X') player1Wins++
    else if (winner === 'O') player2Wins++
    localStorage.setItem('ticTacToePlayer1Wins', player1Wins)
    localStorage.setItem('ticTacToePlayer2Wins', player2Wins)
    updateScoreboard(scoreboard)
    localStorage.setItem(
      'ticTacToeLastResult',
      winner === 'Draw'
        ? 'Empate'
        : `Ganador: Jugador ${winner === 'X' ? '1' : '2'}`
    )
  }

  function displayFinalWinner() {
    resultDiv.textContent =
      player1Wins > player2Wins
        ? '¡Jugador 1 es el ganador del juego! :)'
        : '¡Jugador 2 es el ganador del juego! :)'
    resultDiv.classList.add('visible')
    setTimeout(() => {
      resultDiv.classList.remove('visible')
      resetGame(true)
    }, 2000)
  }

  function resetGame(resetScores = false) {
    board = Array(9).fill(null)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    if (resetScores) {
      player1Wins = 0
      player2Wins = 0
      localStorage.setItem('ticTacToePlayer1Wins', 0)
      localStorage.setItem('ticTacToePlayer2Wins', 0)
      resetShowPreviousResultFlag()
    }
    updateBoard()
    resultDiv.textContent = ''
    resultDiv.classList.remove('visible')
  }

  function showPreviousResult() {
    if (localStorage.getItem('shouldShowPreviousResult')) {
      const lastResult =
        localStorage.getItem('ticTacToeLastResult') ||
        'No hay resultados anteriores'
      previousResultDiv.textContent = `Último Ganador: ${lastResult}`
      previousResultDiv.className = 'previous-result small-text'
      container.appendChild(previousResultDiv)
      localStorage.removeItem('shouldShowPreviousResult')
      setTimeout(() => {
        previousResultDiv.remove()
        updateBoard()
      }, 4000)
    } else {
      updateBoard()
    }
  }

  function resetShowPreviousResultFlag() {
    localStorage.removeItem('shouldShowPreviousResult')
  }

  window.addEventListener('load', () => {
    localStorage.setItem('shouldShowPreviousResult', 'true')
    showPreviousResult()
  })

  return container
}
