import React, { useState } from 'react';

const ToggleBar = ({ assets, theme, onThemeToggle }) => {
    const [isMuted, setIsMuted] = useState(true);
    return (
        <div className="toggle-bar" style={{ opacity: 0 }}>
            <div className="sun-wrapper"></div>
            <button className="toggle-button" onClick={onThemeToggle}>
                <div className="toggle-circle"></div>
            </button>
            <div className="moon-wrapper">
                <button
                    className="sound-button"
                    onClick={() => {
                        if (isMuted) {
                            assets?.setMutedAndPlay?.();
                            setIsMuted(false);
                        } else {
                            assets?.setMuted?.();
                            setIsMuted(true);
                        }
                    }}
                    style={{
                        marginLeft: '10px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>
        </div>
    );
};

export default React.memo(ToggleBar);
