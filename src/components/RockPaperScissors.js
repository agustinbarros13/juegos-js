import '@styles/rock-paper-scissors.css'

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

  choices.forEach((choice) => {
    const button = document.createElement('button')
    button.classList.add('choice')
    button.dataset.choice = choice
    button.textContent = icons[choice]
    choicesContainer.appendChild(button)
  })

  const result = document.createElement('div')
  result.classList.add('result')

  const score = document.createElement('div')
  score.classList.add('score')

  let userWins = 0
  let computerWins = 0
  const rounds = 2

  function updateScore() {
    score.innerHTML = `
      <p>Victorias del Usuario: ${userWins}</p>
      <p>Victorias de la Computadora: ${computerWins}</p>
    `
  }

  function checkWinner() {
    if (userWins === rounds || computerWins === rounds) {
      const finalWinner =
        userWins === rounds ? '¡Ganaste el juego!' : 'Perdiste el juego...'
      result.innerHTML += `<p><strong>${finalWinner}</strong></p>`
      setTimeout(() => {
        userWins = 0
        computerWins = 0
        result.innerHTML = ''
        updateScore()
      }, 3000)
    }
  }

  choicesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('choice')) {
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
  })

  container.appendChild(title)
  container.appendChild(choicesContainer)
  container.appendChild(score)
  container.appendChild(result)

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
