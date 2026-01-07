import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export default function Layout({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check local storage first, default to light
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container">
      <header>
        <nav>
          <Link to="/" className="logo">
            My Blog
          </Link>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
