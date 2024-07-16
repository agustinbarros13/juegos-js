export default function Header() {
  const header = document.createElement('header')
  header.innerHTML = `
    <h1>Juego de Ejemplo</h1>
    <nav>
      <button data-section="tic-tac-toe">Tres en Raya</button>
      <button data-section="memory-game">Memory Game</button>
      <button data-section="rock-paper-scissors">Piedra, Papel o Tijera</button>
    </nav>
  `
  return header
}
