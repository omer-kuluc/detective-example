import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreditsOpen, setIsCreditsOpen] = useState(false)

  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const navRef = useRef(null)

  const isFirstRender = useRef(true)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => { }, navRef)

    if (window.innerWidth < 768) {
      if (isFirstRender.current) {
        isFirstRender.current = false
        if (!isMenuOpen) gsap.set(navRef.current, { display: 'none' })
        return
      }

      if (isMenuOpen) {
        gsap.fromTo(navRef.current,
          { display: 'flex', height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: "power3.out", overwrite: 'auto' }
        )
      } else {
        gsap.to(navRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(navRef.current, { display: 'none' })
          }
        })
      }
    } else {
      gsap.set(navRef.current, { clearProps: "all" })
    }

    return () => ctx.revert()
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        gsap.set(navRef.current, { clearProps: "all" })
        if (isMenuOpen) setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  useEffect(() => {
    if (isCreditsOpen) {
      gsap.set(overlayRef.current, { display: 'flex' })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 })
      gsap.fromTo(modalRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      )
    } else {
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
          <button className="credits-trigger" onClick={() => setIsCreditsOpen(true)}>
            CREDITS
          </button>

          <button className="burger-menu" onClick={toggleMenu} aria-label="Menu">
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          </button>

          <nav className="nav-links" ref={navRef}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/cases" onClick={closeMenu}>Cases</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/objects" onClick={closeMenu}>Objects</Link>
          </nav>
        </div>
      </header>

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