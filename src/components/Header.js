export default function Header() {
  const header = document.createElement('header')
  header.innerHTML = `
    <div class="header-content">
      <h1>Juego de Ejemplo</h1>
      <nav>
        <ul>
          <li><button data-section="tic-tac-toe">Tres en Raya</button></li>
          <li><button data-section="memory-game">Juego de Memoria</button></li>
          <li><button data-section="rock-paper-scissors">Piedra, Papel o Tijera</button></li>
        </ul>
      </nav>
    </div>
  `
  return header
}
