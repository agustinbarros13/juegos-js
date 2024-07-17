import '@styles/memory-game.css'

export default function MemoryGame() {
  const container = document.createElement('div')
  container.className = 'memory-game-container'

  const livesContainer = document.createElement('div')
  livesContainer.className = 'lives-container'

  const livesCounter = document.createElement('div')
  livesCounter.className = 'lives'
  let lives = 5
  livesCounter.textContent = `Vidas: ${lives}`
  livesContainer.appendChild(livesCounter)

  const gameBoardContainer = document.createElement('div')
  gameBoardContainer.className = 'game-board-container'

  const gameBoard = document.createElement('div')
  gameBoard.className = 'memory-game'

  const result = document.createElement('div')
  result.className = 'result'

  const images = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓']
  const cards = [...images, ...images]
  let flippedCards = []
  let matchedPairs = 0

  const shuffleCards = () => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
  }

  const updateBoard = () => {
    gameBoard.innerHTML = ''
    cards.forEach((image, index) => {
      const card = document.createElement('div')
      card.className = 'card'
      card.dataset.index = index
      card.addEventListener('click', () => flipCard(card))
      gameBoard.appendChild(card)
    })
  }

  const flipCard = (card) => {
    const index = card.dataset.index
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped')
      card.innerText = cards[index]
      flippedCards.push(card)

      if (flippedCards.length === 2) {
        checkMatch()
      }
    }
  }

  const checkMatch = () => {
    const [card1, card2] = flippedCards
    const index1 = card1.dataset.index
    const index2 = card2.dataset.index

    if (cards[index1] === cards[index2]) {
      matchedPairs++
      flippedCards = []

      if (matchedPairs === images.length) {
        result.innerHTML = `<p>¡Ganaste!</p>`
        setTimeout(resetGame, 3000)
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped')
        card1.innerText = ''
        card2.classList.remove('flipped')
        card2.innerText = ''
        flippedCards = []
        lives--
        livesCounter.textContent = `Vidas: ${lives}`
        if (lives === 0) {
          result.innerHTML = `<p>¡Perdiste!</p>`
          setTimeout(resetGame, 3000)
        }
      }, 1000)
    }
  }

  const resetGame = () => {
    shuffleCards()
    matchedPairs = 0
    flippedCards = []
    lives = 5
    livesCounter.textContent = `Vidas: ${lives}`
    result.innerHTML = ''
    updateBoard()
  }

  shuffleCards()
  updateBoard()

  container.appendChild(livesContainer)
  gameBoardContainer.appendChild(gameBoard)
  gameBoardContainer.appendChild(result)
  container.appendChild(gameBoardContainer)

  return container
}
