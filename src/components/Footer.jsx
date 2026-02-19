import React from 'react'

export default function Footer() {
  return (
    <footer className="main-footer">
      {/* Üst kısımdaki ince cyan çizgi efekti */}
      <div className="footer-glow-line"></div>

      <div className="footer-copyright">
        Sir Arthur Conan Doyle & Sherlock (2010-2017) TV Series Tribute
        <p className="footer-disclaimer">
          <span className="separator">|</span> For Educational Purposes Only
        </p>
      </div>
    </footer>
  )
}