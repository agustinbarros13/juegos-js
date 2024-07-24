import './style.css'
import Header from '@components/Header.js'
import Footer from '@components/Footer.js'
import TicTacToe from '@components/TicTacToe.js'
import MemoryGame from '@components/MemoryGame.js'
import RockPaperScissors from '@components/RockPaperScissors.js'
import Body from '@components/Body.js'

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').appendChild(Header())
  document.getElementById('footer').appendChild(Footer())

  document.getElementById('game-selection').appendChild(Body())

  document.getElementById('tic-tac-toe').appendChild(TicTacToe())
  document.getElementById('memory-game').appendChild(MemoryGame())
  document
    .getElementById('rock-paper-scissors')
    .appendChild(RockPaperScissors())

  const sections = ['tic-tac-toe', 'memory-game', 'rock-paper-scissors']
  sections.forEach((section) => {
    document.getElementById(section).style.display = 'none'
  })

  document.querySelectorAll('nav button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const targetSection = e.target.dataset.section
      showGame(targetSection)
    })
  })

  function showGame(gameId) {
    document.getElementById('game-selection').style.display = 'none'
    document.getElementById('tic-tac-toe').style.display = 'none'
    document.getElementById('memory-game').style.display = 'none'
    document.getElementById('rock-paper-scissors').style.display = 'none'
    document.getElementById(gameId).style.display = 'block'
  }
})
