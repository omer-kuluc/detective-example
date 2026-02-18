import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreditsOpen, setIsCreditsOpen] = useState(false)

  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const navRef = useRef(null)

  // İlk render'da animasyonun çalışmasını engellemek için ref
  const isFirstRender = useRef(true)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // --- MOBİL MENÜ ANİMASYONU ---
  useLayoutEffect(() => {
    // Component unmount olduğunda temizlik yapması için context
    let ctx = gsap.context(() => { }, navRef)

    // Sadece mobil görünümde çalışsın
    if (window.innerWidth < 768) {
      if (isFirstRender.current) {
        isFirstRender.current = false
        // Başlangıçta kapalıysa display: none olduğundan emin ol (CSS hallediyor ama garanti olsun)
        if (!isMenuOpen) gsap.set(navRef.current, { display: 'none' })
        return
      }

      if (isMenuOpen) {
        // AÇILIŞ:
        // Önce display: flex yap ki görünür olsun, sonra animasyona başla
        gsap.fromTo(navRef.current,
          { display: 'flex', height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: "power3.out", overwrite: 'auto' }
        )
      } else {
        // KAPANIŞ:
        // Revert sorunu yaşamamak için animasyonu doğrudan burada yönetiyoruz.
        // overwrite: 'auto' ile önceki animasyon (açılış) yarım kaldıysa onu ezer.
        gsap.to(navRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          overwrite: 'auto',
          onComplete: () => {
            // Animasyon bitince gizle
            gsap.set(navRef.current, { display: 'none' })
          }
        })
      }
    } else {
      // Masaüstü ise stilleri temizle
      gsap.set(navRef.current, { clearProps: "all" })
    }

    // Effect her çalıştığında değil, sadece component tamamen yok olduğunda revert et
    return () => ctx.revert()
  }, [isMenuOpen]) // isMenuOpen değiştiğinde çalışır

  // Resize Listener: Masaüstüne geçilirse menüyü düzelt
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // GSAP stillerini temizle, CSS kontrolü devralsın
        gsap.set(navRef.current, { clearProps: "all" })
        if (isMenuOpen) setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  // Dialog Animasyonu (Credits)
  useEffect(() => {
    if (isCreditsOpen) {
      gsap.set(overlayRef.current, { display: 'flex' }) // Önce görünür yap
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

      {/* Credits Dialog */}
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
            <p className="footer-note">The Game is On</p>
          </div>
        </div>
      </div>
    </>
  )
}