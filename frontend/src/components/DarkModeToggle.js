import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <button
            className="dark-mode-toggle"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default DarkModeToggle;
