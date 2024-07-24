import ticTacToeImg from '@images/tres-r.jpg'
import memoryGameImg from '@images/memory.jpg'
import rockPaperScissorsImg from '@images/piedra.jpg'

export default function Body() {
  const bodyContainer = document.createElement('div')
  bodyContainer.id = 'game-selection'

  const games = [
    {
      name: 'Tres en Raya',
      image: ticTacToeImg,
      id: 'tic-tac-toe'
    },
    {
      name: 'Juego de Memoria',
      image: memoryGameImg,
      id: 'memory-game'
    },
    {
      name: 'Piedra, Papel o Tijera',
      image: rockPaperScissorsImg,
      id: 'rock-paper-scissors'
    }
  ]

  games.forEach((game) => {
    const gameContainer = document.createElement('div')
    gameContainer.className = 'game-container'

    const img = document.createElement('img')
    img.src = game.image
    img.alt = game.name
    img.addEventListener('click', () => showGame(game.id))

    const title = document.createElement('p')
    title.textContent = game.name
    title.className = 'game-title'

    gameContainer.appendChild(img)
    gameContainer.appendChild(title)
    bodyContainer.appendChild(gameContainer)
  })

  function showGame(gameId) {
    document.getElementById('game-selection').style.display = 'none'
    document.getElementById('tic-tac-toe').style.display = 'none'
    document.getElementById('memory-game').style.display = 'none'
    document.getElementById('rock-paper-scissors').style.display = 'none'
    document.getElementById(gameId).style.display = 'block'
  }

  return bodyContainer
}
