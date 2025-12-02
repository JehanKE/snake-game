import React from 'react';

const ScoreBoard = ({ score, highScore }) => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'var(--text-color)',
        padding: '0 10px',
        boxSizing: 'border-box',
    };

    return (
        <div style={style}>
            <div>Score: <span style={{ color: 'var(--accent-color)' }}>{score}</span></div>
            <div>High Score: <span style={{ color: 'var(--snake-head)' }}>{highScore}</span></div>
        </div>
    );
};

export default ScoreBoard;
