import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import { DIRECTIONS, getRandomFoodPosition, GRID_SIZE, SPEED } from '../utils/gameHelper';

import MobileControls from './MobileControls';

const Game = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('snakeHighScore')) || 0
    );
    const [isPaused, setIsPaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Use a ref to track the latest direction to prevent rapid double-key presses causing self-collision
    const latestDirection = useRef(DIRECTIONS.RIGHT);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(getRandomFoodPosition([{ x: 10, y: 10 }]));
        setDirection(DIRECTIONS.RIGHT);
        latestDirection.current = DIRECTIONS.RIGHT;
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
        setGameStarted(true);
    };

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused || !gameStarted) return;

        setSnake((prevSnake) => {
            const newHead = {
                x: prevSnake[0].x + direction.x,
                y: prevSnake[0].y + direction.y,
            };

            // Check Wall Collision
            if (
                newHead.x < 0 ||
                newHead.x >= GRID_SIZE ||
                newHead.y < 0 ||
                newHead.y >= GRID_SIZE
            ) {
                setGameOver(true);
                return prevSnake;
            }

            // Check Self Collision
            if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check Food Collision
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((prev) => {
                    const newScore = prev + 1;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('snakeHighScore', newScore);
                    }
                    return newScore;
                });
                setFood(getRandomFoodPosition(newSnake));
            } else {
                newSnake.pop(); // Remove tail if no food eaten
            }

            return newSnake;
        });
    }, [direction, food, gameOver, highScore, isPaused, gameStarted]);

    const changeDirection = (newDirKey) => {
        let newDir = null;
        if (newDirKey === 'UP') newDir = DIRECTIONS.UP;
        if (newDirKey === 'DOWN') newDir = DIRECTIONS.DOWN;
        if (newDirKey === 'LEFT') newDir = DIRECTIONS.LEFT;
        if (newDirKey === 'RIGHT') newDir = DIRECTIONS.RIGHT;

        if (newDir) {
            // Prevent reversing direction
            if (
                (newDir === DIRECTIONS.UP && latestDirection.current === DIRECTIONS.DOWN) ||
                (newDir === DIRECTIONS.DOWN && latestDirection.current === DIRECTIONS.UP) ||
                (newDir === DIRECTIONS.LEFT && latestDirection.current === DIRECTIONS.RIGHT) ||
                (newDir === DIRECTIONS.RIGHT && latestDirection.current === DIRECTIONS.LEFT)
            ) {
                return;
            }
            setDirection(newDir);
            latestDirection.current = newDir;
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
                e.preventDefault();
            }

            if (gameOver && e.key === 'Enter') {
                resetGame();
                return;
            }

            if (!gameStarted && e.key === 'Enter') {
                setGameStarted(true);
                return;
            }

            if (e.key === ' ') {
                setIsPaused(prev => !prev);
                return;
            }

            if (!gameStarted) return;

            const { key } = e;
            let dirKey = null;

            if (key === 'ArrowUp' || key === 'w') dirKey = 'UP';
            if (key === 'ArrowDown' || key === 's') dirKey = 'DOWN';
            if (key === 'ArrowLeft' || key === 'a') dirKey = 'LEFT';
            if (key === 'ArrowRight' || key === 'd') dirKey = 'RIGHT';

            if (dirKey) {
                changeDirection(dirKey);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameOver, gameStarted]);

    useEffect(() => {
        const gameInterval = setInterval(moveSnake, SPEED);
        return () => clearInterval(gameInterval);
    }, [moveSnake]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <ScoreBoard score={score} highScore={highScore} />
            <Board snake={snake} food={food} gameOver={gameOver} gameStarted={gameStarted} />
            <div style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem', textAlign: 'center' }}>
                {!gameStarted ? 'Press Enter or Tap Start to Begin' : 'Use Arrow Keys or Buttons to move.'}
            </div>

            {/* Mobile Start Button */}
            {!gameStarted && (
                <button
                    onClick={() => setGameStarted(true)}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'none', // Hidden by default, shown via CSS media query if needed, or just always show on mobile
                    }}
                    className="mobile-start-btn"
                >
                    Start Game
                </button>
            )}

            {gameStarted && !gameOver && (
                <MobileControls onDirectionChange={changeDirection} />
            )}

            {gameOver && (
                <button
                    onClick={resetGame}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        className: "mobile-restart-btn"
                    }}
                >
                    Restart Game
                </button>
            )}
        </div>
    );
};

export default Game;
