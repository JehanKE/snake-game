import React from 'react';
import { GRID_SIZE, CELL_SIZE } from '../utils/gameHelper';

const Board = ({ snake, food, gameOver, gameStarted }) => {
    const boardSize = GRID_SIZE * CELL_SIZE;

    const boardStyle = {
        position: 'relative',
        width: `${boardSize}px`,
        height: `${boardSize}px`,
        backgroundColor: 'var(--board-bg)',
        border: '2px solid var(--grid-line)',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const getCellStyle = (x, y, type) => ({
        position: 'absolute',
        left: `${x * CELL_SIZE}px`,
        top: `${y * CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        backgroundColor: type === 'food' ? 'var(--food-color)' : type === 'head' ? 'var(--snake-head)' : 'var(--snake-color)',
        borderRadius: type === 'food' ? '50%' : '4px',
        boxShadow: type === 'food' ? '0 0 10px var(--food-color)' : 'none',
        zIndex: type === 'food' ? 10 : type === 'head' ? 2 : 1,
        transition: 'all 0.1s linear',
    });

    return (
        <div style={boardStyle}>
            {/* Render Food */}
            <div style={getCellStyle(food.x, food.y, 'food')} />

            {/* Render Snake */}
            {snake.map((segment, index) => (
                <div
                    key={`${segment.x}-${segment.y}-${index}`}
                    style={getCellStyle(segment.x, segment.y, index === 0 ? 'head' : 'body')}
                />
            ))}

            {gameOver && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                    zIndex: 20,
                }}>
                    <div>GAME OVER</div>
                    <div style={{ fontSize: '1rem', marginTop: '10px', color: '#ccc' }}>Press Enter to Restart</div>
                </div>
            )}

            {!gameStarted && !gameOver && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                    zIndex: 20,
                }}>
                    <div>SNAKE GAME</div>
                    <div style={{ fontSize: '1rem', marginTop: '10px', color: '#ccc' }}>Press Enter to Start</div>
                </div>
            )}
        </div>
    );
};

export default Board;
