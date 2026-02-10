import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Fingerprint, Eye, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BouncingCharacters = () => {
  const chars = ['2', '2', '1', 'B'];
  const elementsRef = useRef([]);

  useEffect(() => {
    const data = chars.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    let animationFrameId;

    const update = () => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = data[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x <= 0 || d.x >= window.innerWidth - 100) d.vx *= -1;
        if (d.y <= 0 || d.y >= window.innerHeight - 100) d.vy *= -1;
        el.style.transform = `translate(${d.x}px, ${d.y}px)`;
      });
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bouncing-container">
      {chars.map((char, i) => (
        <div
          key={i}
          ref={(el) => { if (el) elementsRef.current[i] = el; }}
          className="bouncing-char"
        >
          {char}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const containerRef = useRef(null);

  // Flash engelleme için useLayoutEffect
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Sayfa yüklenir yüklenmez görünmez yap ve sonra fade-in yap
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.to(containerRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" });

      // 1. Hero Reveal
      gsap.from(".hero-text span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      });

      // 2. Art of Deduction
      const deductionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".deduction-section",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      deductionTl
        .from(".deduction-letter", {
          opacity: 0,
          scale: 3,
          x: () => (Math.random() - 0.5) * 1000,
          y: () => (Math.random() - 0.5) * 1000,
          rotation: () => (Math.random() - 0.5) * 360,
          stagger: 0.05,
        })
        .to(".deduction-bg-text", { opacity: 0.1, scale: 1.2, duration: 1 }, "<")
        .from(".deduction-underline", { width: 0, duration: 0.5, ease: "power2.inOut" });

      // 3. Sociopath Section
      const sociopathTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sociopath-section",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      sociopathTl
        .from(".sociopath-main", { xPercent: -150, opacity: 0, duration: 2 })
        .from(".sociopath-secondary", { xPercent: 150, opacity: 0, duration: 2 }, "-=1.5")
        .to(".psychopath-strikethrough", { width: "100%", duration: 1, ease: "none" })
        .from(".high-functioning", {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          color: "#22d3ee",
          textShadow: "0 0 20px #22d3ee"
        });

      gsap.to(".floating-detail", {
        y: -100,
        opacity: 0.2,
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        stagger: { amount: 5, from: "random" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="home-container" style={{ backgroundColor: 'black' }}>
      <BouncingCharacters />

      {/* Glow Layer */}
      <div className="glow-layer">
        <div className="glow-top" />
        <div className="glow-bottom" />
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floating-detail"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          >
            {Math.random() > 0.5 ? 'DATA_MINING' : 'OBSERVE_EVERYTHING'}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="text-center">
          <h1 className="hero-text">
            {"THE DETECTIVE".split("").map((char, i) => (
              <span key={i} className={char === ' ' ? 'spacer' : ''}>
                {char}
              </span>
            ))}
          </h1>
          <div className="hero-divider-wrapper">
            <div className="divider-line" />
            <Search className="search-icon" />
            <div className="divider-line" />
          </div>
        </div>
        <div className="scroll-hint">
          <p>Scroll to Deduce</p>
        </div>
      </section>

      {/* Deduction Section */}
      <section className="deduction-section">
        <div className="deduction-bg-text">
          <h2>DATA DATA DATA</h2>
        </div>
        <div className="deduction-content">
          <div className="deduction-title-grid">
            {"ART OF DEDUCTION".split("").map((char, i) => (
              <span key={i} className={`deduction-letter ${char === " " ? "spacer" : ""}`}>
                {char}
              </span>
            ))}
          </div>
          <div className="deduction-underline"></div>

          <div className="deduction-icons-grid">
            <div className="icon-box">
              <Fingerprint className="icon" />
              <p>Biometric Scan</p>
            </div>
            <div className="icon-box">
              <Eye className="icon" />
              <p>Visual Cortex</p>
            </div>
            <div className="icon-box">
              <Zap className="icon" />
              <p>Synaptic Burst</p>
            </div>
            <div className="icon-box">
              <Search className="icon" />
              <p>Pattern Recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sociopath Section */}
      <section className="sociopath-section">
        <div className="sociopath-container">
          <div className="sociopath-main">
            "I'm not a
            <span className="psychopath-wrapper">
              psychopath
              <span className="psychopath-strikethrough"></span>
            </span>
            Anderson,"
          </div>

          <div className="sociopath-secondary">
            <p className="secondary-label">I'm a</p>
            <h2 className="high-functioning">
              HIGH-FUNCTIONING <br /> SOCIOPATH
            </h2>
            <div className="research-badge">
              <p>Do your research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outro Section */}
      <section className="outro-section">
        <div className="outro-group">
          <div className="outro-title-wrapper">
            <h3>THE DETECTIVE</h3>
            <div className="title-glow"></div>
          </div>
          <p className="outro-tagline">The Game is Afoot</p>
          <div className="outro-footer">
            <div className="footer-line"></div>
            <p>Deduction sequence complete</p>
          </div>
        </div>
      </section>

      <div className="scroll-progress-container">
        <div className="scroll-progress-bar"></div>
      </div>
      <div className="scanline-effect"></div>
    </div>
  );
};

export default Home;