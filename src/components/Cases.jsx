import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Activity,
  Terminal,
  ChevronRight,
  BrainCircuit,
  Loader2,
  X,
  Lock as LockIcon,
  ShieldCheck,
  Eye as EyeIcon,
  Fingerprint,
  ShieldAlert,
  Lock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Cases() {
  const containerRef = useRef(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [deduction, setDeduction] = useState(null);
  const [isLoadingDeduction, setIsLoadingDeduction] = useState(false);

  // --- MOCK LOGIC INSIDE COMPONENT ---
  const analyzeCase = async (title, description) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          analysis: `Logic dictates that "${title}" contains hidden variables not yet observed. The pattern suggests a deliberate orchestration regarding: ${description.substring(0, 20)}...`,
          likelihood: Math.floor(Math.random() * 30) + 70,
          verdict: 'HIGH PROBABILITY OF FOUL PLAY'
        });
      }, 2000);
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Intro Animations (Ana Başlık)
      gsap.from(".cases-hero-title", {
        y: 60, opacity: 0, duration: 1.5, ease: "power4.out", stagger: 0.2,
        z: 0.1,            // GPU katmanını aktif et
        rotationZ: 0.01,   // Piksel titremesini önle (sihirli dokunuş)
        force3D: true

      });

      // 2. Dekorasyon Çizgileri
      gsap.from(".hero-decoration", {
        scaleX: 0, duration: 2, delay: 0.5, ease: "power4.inOut"
      });

      // 3. --- SIMPLE SMOOTH TEXT ANIMATION ---
      // "cases-hero-text" sınıfına sahip paragraflar için basit ve şık bir giriş.
      // Parmak izi/çizgilerden sonra (delay: 1) başlar.
      gsap.from(".cases-hero-text", {
        y: 30, // Hafif aşağıdan gelsin
        opacity: 0, // Görünmez başla
        duration: 1.5, // Yavaşça belirsin (Smooth)
        stagger: 0.3, // İki paragraf arasında bekleme süresi
        ease: "power2.out", // Yumuşak duruş
        delay: 1, // Diğer elementlerden sonra başla
        z: 0.1,            // GPU katmanını aktif et
        rotationZ: 0.01,   // Piksel titremesini önle (sihirli dokunuş)
        force3D: true
      });

      // Generic Section Animations
      gsap.utils.toArray('.case-section').forEach((section) => {
        const art = section.querySelector('.case-art-container');
        const info = section.querySelector('.case-info-container');
        const caseId = section.getAttribute('data-case-id');

        // Art Animation with specific start for Case 1
        gsap.from(art, {
          scrollTrigger: {
            trigger: section,
            start: caseId === 'case-1' ? "top bottom+=300" : "top bottom",
            end: "bottom top",
            scrub: 1,
            z: 0.1,            // GPU katmanını aktif et
            rotationZ: 0.01,   // Piksel titremesini önle (sihirli dokunuş)
            force3D: true

          },
          y: 100, scale: 0.8, opacity: 0,
        });

        // Info Animation
        gsap.from(info, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
            z: 0.1,            // GPU katmanını aktif et
            rotationZ: 0.01,   // Piksel titremesini önle (sihirli dokunuş)
            force3D: true

          },
          x: -100, opacity: 0, duration: 1, ease: "back.out(1.2)"
        });

        // Specific Animation for Case 4 (Hospital/Reichenbach)
        if (caseId === 'case-4') {
          const building = section.querySelector('.hospital-building-container');
          const letters = section.querySelectorAll('.lazarus-char');
          const sherlock = section.querySelector('.sherlock-falling');

          if (building) {
            gsap.to(building, {
              scrollTrigger: { trigger: section, start: "top 60%", end: "bottom top", scrub: 1 },
              scale: 1.3, boxShadow: "0 0 100px rgba(239, 68, 68, 0.4)", ease: "none"
            });
          }
          if (letters.length) {
            gsap.to(letters, {
              scrollTrigger: { trigger: section, start: "top 95%", end: "bottom 20%", scrub: 1.5 },
              y: 400, x: (i) => (i - 3) * 100, rotation: (i) => (i - 3) * 45, opacity: 0, scale: 0.5, stagger: 0.01, ease: "power2.in"
            });
          }
          if (sherlock) {
            gsap.to(sherlock, {
              scrollTrigger: { trigger: section, start: "top 30%", end: "bottom 10%", scrub: 1 },
              y: 800, opacity: 0, scale: 2, ease: "power1.in"
            });
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sherlock-app">
      {/* Background Decor */}
      <div className="background-decor">
        <div className="blob blob-cyan"></div>
        <div className="blob blob-pink"></div>
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="cases-header-content">
          <div className="hero-decoration">
            <div className="fingerprint-icon"><Fingerprint className="icon" /></div>
          </div>
          <p className='cases-hero-text'>Special cases shows that </p>
          <h1 className="cases-hero-title">THE CASES</h1>
          <p className='cases-hero-text'>what he is capable of </p>
          <div className="hero-decoration">
            <div className="fingerprint-icon"><Fingerprint className="icon" /></div>
          </div>

        </div>
      </header>

      <main className="cases-grid">

        {/* --- CASE 1: A STUDY IN PINK --- */}
        <section className="case-section layout-normal" data-case-id="case-1">
          <div className="case-art-container">
            {/* Suitcase Art HTML */}
            <div className="art-wrapper group">
              <div className="suitcase-body">
                <div className="suitcase-handle"></div>
                <div className="suitcase-strap top"></div>
                <div className="suitcase-strap bottom"></div>
                <div className="suitcase-tag">EVIDENCE #001</div>
              </div>
              <div className="art-glow pink"></div>
            </div>
          </div>
          <div className="case-info-container">
            <div className="info-header">
              <div className="status-row">
                <span className="status-badge solved">SOLVED</span>
              </div>
              <h2 className="case-title">The <span className='case-title-span pink-title'>Pink Suitcase</span> </h2>
              <p className="case-description">A pink suitcase where it didn't belong. A trail of impossible suicides. This is where it all started.</p>
            </div>


          </div>
        </section>


        {/* --- CASE 5: THE SIGN OF THREE (Sign of Three - Wedding) --- */}
        <section className="case-section layout-reverse" data-case-id="case-5">
          <div className="case-art-container">
            {/* Wedding Camera Art HTML */}
            <div className="art-wrapper group">
              <div className="camera-body">
                <div className="camera-lens-outer">
                  <div className="camera-lens-inner">
                    <div className="camera-sensor"><div className="sensor-dot"></div></div>
                  </div>
                </div>
                <div className="camera-flash"></div>
              </div>
              <div className="art-glow slate"></div>
            </div>
          </div>
          <div className="case-info-container">
            <div className="info-header">
              <div className="status-row">
                <span className="status-badge solved">SOLVED</span>
              </div>
              <h2 className="case-title">The <span className='case-title-span mayfly-title'>Mayfly</span></h2>
              <p className="case-description">One wedding toast. One life to save. As The Detective balances the pressure of being the Best Man, the key to an
                impossible case lies hidden within the photographs.
              </p>
            </div>
          </div>
        </section>

        {/* --- CASE 6: HIS LAST VOW (Magnussen - Clean Oval Style) --- */}
        <section className="case-section layout-normal" data-case-id="case-6">
          <div className="case-art-container">
            <div className="art-wrapper mind-palace-art group">
              {/* Altın Telli Gözlük Yapısı */}
              <div className="glasses-structure">
                <div className="bridge-gold"></div>
                <div className="nose-pad pad-left"></div>
                <div className="nose-pad pad-right"></div>

                {[1, 2].map(i => (
                  <div key={i} className={`lens-oval lens-${i === 1 ? 'left' : 'right'}`}>

                    {/* Cam Yüzeyi */}
                    <div className="glass-surface">
                      {/* REC Arayüzü (Sadece sağ gözde) */}
                      {i === 2 && (
                        <div className="rec-ui-layer">
                          <div className="rec-dot"></div>
                          <span className="rec-label">REC</span>
                        </div>
                      )}

                      {/* Göz Maskesi (Badem Şekli - İrisi kesen kısım) */}
                      <div className="eye-mask">
                        {/* Gözün Beyazı (Sclera) */}
                        <div className="eye-sclera">
                          {/* İris (Tam Daire) */}
                          <div className="iris-clean">
                            {/* Göz Bebeği */}
                            <div className="pupil-clean">
                              <div className="reflection-sharp"></div>
                            </div>
                          </div>
                        </div>

                        {/* Göz Kapakları (Gölge efekti için) */}
                        <div className="eyelid-shadow top"></div>
                        <div className="eyelid-shadow bottom"></div>
                      </div>

                      {/* Cam Yansıması */}
                      <div className="glass-glare"></div>
                    </div>

                    {/* Çerçevesiz cam kenarı */}
                    <div className="rim-highlight"></div>
                  </div>
                ))}

                {/* Gözlük Sapları (Yanlardan çıkan metal) */}
                <div className="temple-lug lug-left"></div>
                <div className="temple-lug lug-right"></div>
              </div>

              <div className="hud-data-row">
                <div className="hud-tag">PURPOSE : PRESSURE</div>
                <div className="hud-tag alert">PULSE: 0 BPM</div>
              </div>

            </div>
          </div>

          <div className="case-info-container">
            <div className="case-info-content">
              <div className="status-row">
                <span className="status-badge danger">DANGER</span>
              </div>
              <h2 className="case-title">The<span className='case-title-span eyes-title' > Devil Eyes</span></h2>
              <p className="case-description">Blue, dull eyes with a repulsive mind. Blackmail is his lifestyle.
                How can you stop a man that even the people in the palace cannot control </p>
            </div>
          </div>
        </section>

        {/* --- CASE 2: THE GREAT GAME --- */}
        <section className="case-section layout-reverse" data-case-id="case-2">
          <div className="case-art-container">
            {/* Bomb Art HTML */}
            <div className="art-wrapper bomb-wrapper group">
              <div className="bomb-sticks">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="dynamite">
                    <div className="dynamite-highlight"></div>
                    <div className="dynamite-band"></div>
                  </div>
                ))}
                <div className="bomb-brace top"></div>
                <div className="bomb-brace bottom"></div>
              </div>
              <div className="bomb-timer-container">
                <div className="bomb-timer">
                  00:0{Math.floor(Math.random() * 9)}:2{Math.floor(Math.random() * 9)}
                </div>
              </div>
              <div className="art-glow red"></div>
            </div>
          </div>
          <div className="case-info-container">
            <div className="info-header">
              <div className="status-row">
                <span className="status-badge danger">DANGER</span>
              </div>
              <h2 className="case-title">The Game</h2>
              <p className="case-description">A twenty-year-old cold case resurfaces. Victims trapped in ticking bomb vests. And a consulting criminal
                who reveals his identity through a deadly, elaborate puzzle.</p>
            </div>
          </div>
        </section>


        {/* --- CASE 3: A SCANDAL IN BELGRAVIA --- */}
        <section className="case-section layout-normal" >
          <div className="case-art-container">
            {/* Phone Art HTML */}
            <div className="art-wrapper perspective-container group">
              <div className="cases-phone-body">
                <p className='cases-phone-body-text'>SHER</p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="custom-lock-icon"
                >
                  {/* Kilit Sapı (Hareket edecek kısım) */}
                  <path className="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4" />
                  {/* Kilit Gövdesi (Sabit kalacak) */}
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                </svg>
              </div>
              <div className="art-glow cyan"></div>
            </div>
          </div>
          <div className="case-info-container">
            <div className="info-header">
              <div className="status-row">
                <span className="status-badge private">PRIVATE</span>
              </div>
              <h2 className="case-title">'THE' <span className='title-woman'> Woman</span></h2>
              <p className="case-description">Elevated pulses and dilated pupils. You can find yourself on the losing side because of a certain chemical defect.
                And it’s called: SENTIMENT </p>
            </div>


          </div>
        </section>





        {/* --- CASE 4: THE REICHENBACH FALL (Hospital) --- */}
        <section className="case-section layout-reverse" data-case-id="case-4">
          <div className="case-art-container">
            {/* Hospital Art HTML */}
            <div className="hospital-root group">
              <div className="hospital-building-container">
                <div className="hospital-roof">
                  <div className="lazarus-text">
                    {"LAZARUS".split("").map((char, i) => <span key={i} className="lazarus-char">{char}</span>)}
                  </div>
                </div>
                <div className="hospital-windows">
                  {Array.from({ length: 12 }).map((_, i) => <div key={i} className="window"></div>)}
                </div>
                <div className="sherlock-falling"></div>
              </div>
              <div className="art-glow red"></div>
            </div>
          </div>
          <div className="case-info-container">
            <div className="info-header">
              <div className="status-row">
                <span className="status-badge fatal">FATAL</span>
              </div>
              <h2 className="case-title">The Fall</h2>
              <p className="case-description"> The edge of a waterfall, or a rooftop in London. How can you keep
                <span className='fall-text staying-text'> stayin' </span><span className='fall-text alive-text'> alive </span>
                when you stand face to face with an enemy
                burning with a death wish ?
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="main-footer">

        <div className="footer-copyright">Sir Arthur Conan Doyle & Sherlock TV Tribute
          <p>| For Educational Purposes Only</p></div>
      </footer>



      {/* Mind Palace Modal */}

    </div>
  );
}

export default Cases;