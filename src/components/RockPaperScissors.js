import '@styles/rock-paper-scissors.css'

export default function RockPaperScissors() {
  const container = document.createElement('div')
  container.className = 'rock-paper-scissors'

  const choices = ['Rock', 'Paper', 'Scissors']
  let userScore = 0
  let computerScore = 0

  const updateScores = () => {
    container.querySelector('.user-score').innerText = `User: ${userScore}`
    container.querySelector(
      '.computer-score'
    ).innerText = `Computer: ${computerScore}`
  }

  const playRound = (userChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    const result = determineWinner(userChoice, computerChoice)
    alert(`User: ${userChoice} | Computer: ${computerChoice} | ${result}`)
    updateScores()
  }

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "It's a draw!"
    if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      userScore++
      return 'User wins!'
    } else {
      computerScore++
      return 'Computer wins!'
    }
  }

  const createButton = (choice) => {
    const button = document.createElement('button')
    button.innerText = choice
    button.addEventListener('click', () => playRound(choice))
    return button
  }

  const scoreBoard = document.createElement('div')
  scoreBoard.className = 'score-board'
  scoreBoard.innerHTML = `
    <p class="user-score">User: ${userScore}</p>
    <p class="computer-score">Computer: ${computerScore}</p>
  `
  container.appendChild(scoreBoard)

  choices.forEach((choice) => {
    container.appendChild(createButton(choice))
  })

  return container
}
