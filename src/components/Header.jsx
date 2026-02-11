import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          LOGO
        </Link>

        {/* Mobil Menü Butonu */}
        <button className="burger-menu" onClick={toggleMenu} aria-label="Menu">
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </button>

        {/* Navigasyon Linkleri */}
        <nav className={`nav-links ${isMenuOpen ? 'mobile-show' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/cases" onClick={closeMenu}>Cases</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/objects" onClick={closeMenu}>Objects</Link>
        </nav>
      </div>
    </header>
  )
}