import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreditsOpen, setIsCreditsOpen] = useState(false)

  const modalRef = useRef(null)
  const overlayRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Dialog Animasyonu
  useEffect(() => {
    if (isCreditsOpen) {
      // Açılış
      gsap.to(overlayRef.current, { display: 'flex', opacity: 1, duration: 0.4 })
      gsap.fromTo(modalRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      )
    } else {
      // Kapanış
      gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.4, ease: "power3.in" })
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.4, onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' })
        }
      })
    }
  }, [isCreditsOpen])

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          {/* Logo yerine Credits Butonu */}
          <button className="credits-trigger" onClick={() => setIsCreditsOpen(true)}>
            CREDITS
          </button>

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

      {/* Credits Dialog / Modal */}
      <div className="credits-overlay" ref={overlayRef} onClick={() => setIsCreditsOpen(false)}>
        <div className="credits-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>A TRIBUTE</h3>
            <button className="close-modal" onClick={() => setIsCreditsOpen(false)}>×</button>
          </div>
          <div className="modal-body">
            <p>
              This digital experience is a tribute to the eternal legacy of
              <strong> Sir Arthur Conan Doyle’s Sherlock Holmes</strong>.
            </p>
            <p>
              Inspired by the brilliant TV Series adaptation <strong>SHERLOCK (2010-2017)</strong>,
            </p>
            <div className="modal-divider"></div>
          </div>
        </div>
      </div>
    </>
  )
}