import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Clock, ShieldAlert, Lock, Fingerprint, Eye, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Giriş Animasyonu
      gsap.from(".cases-intro-content", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out" });

      // Case Kartları Animasyonu
      const cards = gsap.utils.toArray(".case-item");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out"
        });
      });

      // Micro-animations (Yüzen elementler)
      gsap.to(".floating-element", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className='cases-container' ref={pageRef}>
      <header className="cases-intro">
        <div className="cases-intro-content">
          <p className="dossier-id">HIGH_CONFIDENTIAL // 221B</p>
          <h1 className="cases-title">THE <span className="cyan-text">CASE</span> FILES</h1>
          <div className="title-ornament">
            <span className="line"></span>
            <Fingerprint size={20} className="ornament-icon" />
            <span className="line"></span>
          </div>
          <p className="intro-lead">A curated archive of impossible crimes, brilliant deductions, and the shadow of the world's only consulting detective.</p>
        </div>
      </header>

      <main className="cases-grid">
        {/* Case 1: Pink Case */}
        <section className="case-item case-pink">
          <div className="case-graphic-wrapper">
            <div className="case-graphic pink-case-art">
              <div className="suitcase-body">
                <div className="handle"></div>
                <div className="evidence-tag">EVIDENCE</div>
              </div>
            </div>
            <div className="graphic-glow pink-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge">SOLVED</div>
            <span className="case-number">#001</span>
            <h2>A Study in Pink</h2>
            <p>The pink suitcase that shouldn't be there. A series of impossible suicides. The game begins.</p>
            <div className="case-meta">
              <span><MapPin size={14} /> Brixton</span>
              <span><Search size={14} /> Poison</span>
            </div>
          </div>
        </section>

        {/* Case 2: The Great Game */}
        <section className="case-item case-game reverse">
          <div className="case-graphic-wrapper">
            <div className="case-graphic shoe-art">
              <div className="shoe-pair">
                <div className="shoe-frontal left">
                  <div className="laces"></div>
                  <div className="toe-cap"></div>
                </div>
                <div className="shoe-frontal right">
                  <div className="laces"></div>
                  <div className="toe-cap"></div>
                </div>
              </div>
            </div>
            <div className="graphic-glow blue-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge warning">DANGER</div>
            <span className="case-number">#002</span>
            <h2>The Great Game</h2>
            <p>Trainers from twenty years ago. A bomb vest. A Consulting Criminal reveals himself.</p>
            <div className="case-meta">
              <span><Clock size={14} /> 00:00</span>
              <span><Zap size={14} /> Moriarty</span>
            </div>
          </div>
        </section>

        {/* Case 3: A Scandal in Belgravia */}
        <section className="case-item case-scandal">
          <div className="case-graphic-wrapper">
            <div className="case-graphic phone-visual-art">
              <div className="phone-chassis">
                <div className="phone-screen-display">
                  <div className="sherlocked-ui">
                    <span className="ui-iam">I AM</span>
                    <span className="ui-sher">SHER</span>
                    <span className="ui-locked">LOCKED</span>
                    <Lock size={16} className="ui-lock-icon" />
                  </div>
                </div>
                <div className="home-button"></div>
              </div>
            </div>
            <div className="graphic-glow cyan-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge secret">CLASSIFIED</div>
            <span className="case-number">#003</span>
            <h2>A Scandal in Belgravia</h2>
            <p>A smartphone that could topple a nation. The Woman. Battle of the power play.</p>
            <div className="case-meta">
              <span><Lock size={14} /> Irene Adler</span>
              <span><MapPin size={14} /> Palace</span>
            </div>
          </div>
        </section>

        {/* Case 4: The Reichenbach Fall */}
        <section className="case-item case-fall reverse">
          <div className="case-graphic-wrapper">
            <div className="case-graphic hospital-rooftop-art">
              <div className="hospital-building">
                <div className="roof-top">
                  <div className="lazarus-neon">LAZARUS</div>
                </div>
                <div className="building-windows"></div>
              </div>
              <div className="falling-silhouette floating-element"></div>
            </div>
            <div className="graphic-glow red-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge fatal">FATAL</div>
            <span className="case-number">#004</span>
            <h2>The Reichenbach Fall</h2>
            <p>The roof of St. Bart's. One final jump to save the world. The fall of the genius.</p>
            <div className="case-meta">
              <span><ShieldAlert size={14} /> Final</span>
              <span><MapPin size={14} /> St. Bart's</span>
            </div>
          </div>
        </section>

        {/* Case 5: The Sign of Three */}
        <section className="case-item case-three">
          <div className="case-graphic-wrapper">
            <div className="case-graphic camera-art">
              <div className="camera-body">
                <div className="lens-main">
                  <div className="reflection"></div>
                </div>
                <div className="shutter-button"></div>
                <div className="flash-ready"></div>
              </div>
            </div>
            <div className="graphic-glow white-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge">WEDDING</div>
            <span className="case-number">#005</span>
            <h2>The Sign of Three</h2>
            <p>A hidden blade through a camera lens. A wedding toast and a life to save.</p>
            <div className="case-meta">
              <span><Clock size={14} /> Reception</span>
              <span><Search size={14} /> Hidden</span>
            </div>
          </div>
        </section>

        {/* Case 6: His Last Vow */}
        <section className="case-item case-vow reverse">
          <div className="case-graphic-wrapper">
            <div className="case-graphic eye-scan-art">
              <div className="scanning-ui">
                <div className="scan-line"></div>
                <div className="rec-text">REC</div>
              </div>
              <div className="glasses-frame">
                <div className="lens-view left"><div className="iris"></div></div>
                <div className="lens-view right"><div className="iris"></div></div>
              </div>
            </div>
            <div className="graphic-glow cyan-glow"></div>
          </div>
          <div className="case-info">
            <div className="case-badge secret">MIND PALACE</div>
            <span className="case-number">#006</span>
            <h2>His Last Vow</h2>
            <p>Blue eyes scanning everything. The man who stores the world in his head.</p>
            <div className="case-meta">
              <span><Eye size={14} /> Appledore</span>
              <span><Search size={14} /> Data</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}