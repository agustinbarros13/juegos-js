import '@styles/rock-paper-scissors.css'

function createButton(choice, icon, handleClick) {
  const button = document.createElement('button')
  button.classList.add('choice')
  button.dataset.choice = choice
  button.textContent = icon
  button.addEventListener('click', handleClick)
  return button
}

function createScoreBoard(userWins, computerWins) {
  const score = document.createElement('div')
  score.classList.add('score')
  score.innerHTML = `
    <p>Victorias del Usuario: ${userWins}</p>
    <p>Victorias de la Computadora: ${computerWins}</p>
  `
  return score
}

function createResult() {
  const result = document.createElement('div')
  result.classList.add('result')
  return result
}

function showPreviousResult(container, message) {
  const resultElement = document.createElement('div')
  resultElement.className = 'previous-score'
  resultElement.textContent = `Última partida ganada por: ${message}`
  container.appendChild(resultElement)
  setTimeout(() => {
    resultElement.remove()
  }, 3000)
}

export default function RockPaperScissors() {
  const container = document.createElement('div')
  container.classList.add('rock-paper-scissors')

  const title = document.createElement('h2')
  title.textContent = 'Piedra, Papel o Tijera'

  const choicesContainer = document.createElement('div')
  choicesContainer.classList.add('choices')

  const choices = ['rock', 'paper', 'scissors']
  const icons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  }

  let userWins = parseInt(localStorage.getItem('rpsUserWins')) || 0
  let computerWins = parseInt(localStorage.getItem('rpsComputerWins')) || 0
  const rounds = 2

  const updateScore = () => {
    const newScoreBoard = createScoreBoard(userWins, computerWins)
    container.replaceChild(newScoreBoard, container.querySelector('.score'))
    localStorage.setItem('rpsUserWins', userWins)
    localStorage.setItem('rpsComputerWins', computerWins)
  }

  const checkWinner = () => {
    if (userWins === rounds || computerWins === rounds) {
      const finalWinner =
        userWins === rounds ? 'Ganador: Jugador' : 'Ganador: Computadora'
      result.innerHTML = `<p>${finalWinner}</p>`
      saveGameResult(userWins === rounds ? 'Usuario' : 'Ordenador')
      setTimeout(() => {
        userWins = 0
        computerWins = 0
        updateScore()
        result.innerHTML = ''
        showPreviousResult(container, getGameResult())
      }, 3000)
    }
  }

  const saveGameResult = (winner) => {
    localStorage.setItem('rpsGameResult', winner)
  }

  const getGameResult = () => {
    return (
      localStorage.getItem('rpsGameResult') || 'No hay resultados anteriores'
    )
  }

  const handleClick = (e) => {
    const userChoice = e.target.dataset.choice
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    const winner = getWinner(userChoice, computerChoice)

    result.innerHTML = `
      <p>Tú: ${icons[userChoice]}</p>
      <p>Computadora: ${icons[computerChoice]}</p>
      <p>${winner}</p>
    `

    if (winner === '¡Ganaste!') {
      userWins++
    } else if (winner === 'Perdiste...') {
      computerWins++
    }

    updateScore()
    checkWinner()
  }

  choices.forEach((choice) => {
    const button = createButton(choice, icons[choice], handleClick)
    choicesContainer.appendChild(button)
  })

  const result = createResult()

  container.appendChild(title)
  container.appendChild(choicesContainer)
  container.appendChild(createScoreBoard(userWins, computerWins))
  container.appendChild(result)

  showPreviousResult(container, getGameResult())
  updateScore()
  return container
}

function getWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return '¡Empate!'
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return '¡Ganaste!'
  } else {
    return 'Perdiste...'
  }
}
