import '@styles/memory-game.css'

export default function MemoryGame() {
  const container = document.createElement('div')
  container.className = 'memory-game'

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
    container.innerHTML = ''
    cards.forEach((image, index) => {
      const card = document.createElement('div')
      card.className = 'card'
      card.dataset.index = index
      card.addEventListener('click', () => flipCard(card))
      container.appendChild(card)
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
        alert('You won!')
        resetGame()
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped')
        card1.innerText = ''
        card2.classList.remove('flipped')
        card2.innerText = ''
        flippedCards = []
      }, 1000)
    }
  }

  const resetGame = () => {
    shuffleCards()
    matchedPairs = 0
    flippedCards = []
    updateBoard()
  }

  shuffleCards()
  updateBoard()
  return container
}
