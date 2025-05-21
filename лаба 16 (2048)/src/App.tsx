import './style.css';
import './index.css';

function App() {
  return (
    <div className="container">
      <h1>2048</h1>
      <div className="score-container">
        <div className="score">Score: 0</div>
        <button>New Game</button>
      </div>
      <div className="grid">
        {/* Здесь будет рендериться игровое поле */}
        {Array(16).fill(0).map((_, i) => (
          <div key={i} className="cell"></div>
        ))}
      </div>
    </div>
  );
}

export default App;
