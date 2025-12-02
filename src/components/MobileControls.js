import React from 'react';

const MobileControls = ({ onDirectionChange }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        gap: '10px',
    };

    const rowStyle = {
        display: 'flex',
        gap: '20px',
    };

    const buttonStyle = {
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid var(--accent-color)',
        borderRadius: '50%',
        color: 'var(--text-color)',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'manipulation', // Improves touch response
        WebkitTapHighlightColor: 'transparent',
    };

    return (
        <div style={containerStyle} className="mobile-controls">
            <div
                style={buttonStyle}
                onClick={() => onDirectionChange('UP')}
            >
                ↑
            </div>
            <div style={rowStyle}>
                <div
                    style={buttonStyle}
                    onClick={() => onDirectionChange('LEFT')}
                >
                    ←
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => onDirectionChange('DOWN')}
                >
                    ↓
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => onDirectionChange('RIGHT')}
                >
                    →
                </div>
            </div>
        </div>
    );
};

export default MobileControls;
