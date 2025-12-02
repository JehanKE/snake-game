import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="app-container">
      <h1 style={{
        color: 'var(--accent-color)',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
      }}>
        Snake
      </h1>
      <Game />
    </div>
  );
}

export default App;
