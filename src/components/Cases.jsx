import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Clock, ShieldAlert, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cases-title", { opacity: 0, y: -30, duration: 1 });

      const selectors = [".case-pink", ".case-game", ".case-scandal", ".case-fall", ".case-three", ".case-vow"];
      selectors.forEach((selector, i) => {
        gsap.from(selector, {
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className='cases-container' ref={pageRef}>
      <header className="cases-intro">
        <p className="dossier-id">RECORD_LOG_221B</p>
        <h1 className="cases-title">CASE FILES</h1>
        <div className="title-underline"></div>
      </header>

      {/* Case 1: Pink Case */}
      <section className="case-item case-pink">
        <div className="case-graphic pink-case-art">
          <div className="suitcase-body">
            <div className="handle"></div>
            <div className="wheel-l"></div>
            <div className="wheel-r"></div>
            <div className="zip-line"></div>
          </div>
        </div>
        <div className="case-info">
          <span className="case-number">#001</span>
          <h2>A Study in Pink</h2>
          <p>The pink suitcase that shouldn't be there. A series of impossible suicides. The game begins.</p>
          <div className="case-meta">
            <span><MapPin size={14} /> Brixton</span>
            <span><Search size={14} /> Poison</span>
          </div>
        </div>
      </section>

      {/* Case 2: The Great Game (ÇİFT AYAKKABI - KULLANICIYA DÖNÜK) */}
      <section className="case-item case-game reverse">
        <div className="case-graphic shoe-art">
          <div className="shoe-pair">
            <div className="shoe-frontal left">
              <div className="shoe-toe"></div>
              <div className="shoe-laces-box">
                <div className="lace"></div><div className="lace"></div><div className="lace"></div>
              </div>
            </div>
            <div className="shoe-frontal right">
              <div className="shoe-toe"></div>
              <div className="shoe-laces-box">
                <div className="lace"></div><div className="lace"></div><div className="lace"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="case-info">
          <span className="case-number">#002</span>
          <h2>The Great Game</h2>
          <p>A pair of trainers from twenty years ago. A bomb vest. A Consulting Criminal reveals himself.</p>
          <div className="case-meta">
            <span><Clock size={14} /> 00:00</span>
            <span><ShieldAlert size={14} /> Moriarty</span>
          </div>
        </div>
      </section>

      {/* Case 3: Mobile Phone (SHERLOCKED GÖRSELİ) */}
      <section className="case-item case-scandal">
        <div className="case-graphic phone-visual-art">
          <div className="phone-chassis">
            <div className="phone-screen-display">
              <div className="sherlocked-ui">
                <span className="ui-iam">I AM</span>
                <span className="ui-sher">SHER</span>
                <span className="ui-locked">LOCKED</span>
                <div className="ui-lock-icon"><Lock size={16} /></div>
              </div>
            </div>
            <div className="phone-home-btn"></div>
          </div>
        </div>
        <div className="case-info">
          <span className="case-number">#003</span>
          <h2>A Scandal in Belgravia</h2>
          <p>A smartphone that could topple a nation. The Woman. Battle of the power play.</p>
          <div className="case-meta">
            <span><Search size={14} /> Classified</span>
            <span><MapPin size={14} /> Irene</span>
          </div>
        </div>
      </section>

      {/* Case 4: Reichenbach Fall (HASTANE ÇATISI & LAZARUS) */}
      <section className="case-item case-fall reverse">
        <div className="case-graphic hospital-rooftop-art">
          <div className="hospital-building">
            <div className="building-face">
              <div className="windows-grid"></div>
            </div>
            <div className="roof-top-ledge">
              <div className="lazarus-graffiti">LAZARUS</div>
            </div>
          </div>
          <div className="falling-sherlock"></div>
        </div>
        <div className="case-info">
          <span className="case-number">#004</span>
          <h2>The Reichenbach Fall</h2>
          <p>The roof of St. Bart's. One final jump to save the world. The fall of the genius.</p>
          <div className="case-meta">
            <span><ShieldAlert size={14} /> Fatal</span>
            <span><MapPin size={14} /> Bart's</span>
          </div>
        </div>
      </section>

      {/* Case 5: Camera */}
      <section className="case-item case-three">
        <div className="case-graphic camera-art">
          <div className="camera-body">
            <div className="lens-outer">
              <div className="lens-inner"></div>
            </div>
            <div className="camera-shutter"></div>
            <div className="camera-flash"></div>
          </div>
        </div>
        <div className="case-info">
          <span className="case-number">#005</span>
          <h2>The Sign of Three</h2>
          <p>A hidden blade through a camera lens. A wedding toast and a life to save.</p>
          <div className="case-meta">
            <span><Clock size={14} /> Reception</span>
            <span><Search size={14} /> Hidden</span>
          </div>
        </div>
      </section>

      {/* Case 6: Blue Eyes & Glasses */}
      <section className="case-item case-vow reverse">
        <div className="case-graphic eye-art">
          <div className="rec-overlay">
            <div className="rec-dot"></div>
            <span>REC</span>
          </div>
          <div className="modern-glasses">
            <div className="glass-lens">
              <div className="eye-left"><div className="iris"></div></div>
            </div>
            <div className="glass-bridge"></div>
            <div className="glass-lens">
              <div className="eye-right"><div className="iris"></div></div>
            </div>
          </div>
        </div>
        <div className="case-info">
          <span className="case-number">#006</span>
          <h2>His Last Vow</h2>
          <p>Blue eyes scanning everything. The man who stores the world in his head. Data is power.</p>
          <div className="case-meta">
            <span><ShieldAlert size={14} /> Blackmail</span>
            <span><MapPin size={14} /> Magnussen</span>
          </div>
        </div>
      </section>
    </div>
  );
}