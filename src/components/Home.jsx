import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Eye, Music, HeartOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BouncingCharacters = () => {
  const chars = ['2', '2', '1', 'B'];
  const elementsRef = useRef([]);

  useEffect(() => {
    const data = chars.map(() => ({
      x: Math.random() * (window.innerWidth - 150),
      y: Math.random() * (window.innerHeight - 150),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
    }));

    let animationFrameId;

    const update = () => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = data[i];
        d.x += d.vx;
        d.y += d.vy;
        const size = 150;

        if (d.x <= 0) { d.vx = Math.abs(d.vx); d.x = 0; }
        else if (d.x >= window.innerWidth - size) { d.vx = -Math.abs(d.vx); d.x = window.innerWidth - size; }

        if (d.y <= 0) { d.vy = Math.abs(d.vy); d.y = 0; }
        else if (d.y >= window.innerHeight - size) { d.vy = -Math.abs(d.vy); d.y = window.innerHeight - size; }

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.to(containerRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" });

      // 1. Hero Reveal
      const heroTl = gsap.timeline();

      heroTl.from(".hero-text span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      })
        // Yeni Tanıtım Yazısı Animasyonu
        .from(".hero-description-text", {
          opacity: 0,
          y: 50,
          duration: 1.5,
          stagger: 0.4,
          ease: "power2.out"
        }, "-=1.75");

      gsap.to(".scroll-hint p", {
        y: 50,
        duration: 3.25,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
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
        // Yeni: Giriş metni yukarıdan yavaşça belirsin
        .from(".sociopath-intro-text", {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })
        .from(".sociopath-main", { xPercent: -125, opacity: 0, duration: 1.5 }, "-=0.5")
        .from(".sociopath-secondary", { xPercent: 125, opacity: 0, duration: 1.5 }, "-=1.5")
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

      <section className="hero-section">
        <div className="text-center">
          <div className="hero-description">
            <p className='hero-description-text'>A consulting mind navigating the fog of logic.</p>
          </div>

          <h1 className="hero-text">
            {"THE DETECTIVE".split("").map((char, i) => (
              <span key={i} className={char === ' ' ? 'spacer' : ''}>
                {char}
              </span>
            ))}
          </h1>

          {/* Yeni Tanıtım Bölümü */}
          <div className="hero-description">
            <p className='hero-description-text'>Where you only see, he observes.</p>
          </div>

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
              <Music className="icon" />
              <p>To Think</p>
            </div>
            <div className="icon-box">
              <Eye className="icon" />
              <p>To Observe</p>
            </div>
            <div className="icon-box">
              <HeartOff className="icon" />
              <p>To Not Lose</p>
            </div>
            <div className="icon-box">
              <Search className="icon" />
              <p>To Clue</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sociopath-section">
        <div className="sociopath-container">
          <div className="sociopath-intro-text">
            For who wonders, <br />although he may seem devoid of emotions, don't be
            afraid.
          </div>
          <div className="sociopath-main">
            He's not a
            <span className="psychopath-wrapper">
              psychopath
              <span className="psychopath-strikethrough"></span>
            </span>
          </div>

          <div className="sociopath-secondary">
            <p className="secondary-label">just a </p>
            <h2 className="high-functioning">
              HIGH-FUNCTIONING <br /> SOCIOPATH
            </h2>
            <div className="research-badge">
              <p>Do your research</p>
            </div>
          </div>
        </div>
      </section>

      <section className="outro-section">
        <div className="outro-group">
          <div className="outro-title-wrapper">
            <h3>THE DETECTIVE</h3>
            <div className="title-glow"></div>
          </div>
          <p className="outro-tagline">You know where he is</p>
          <div className="outro-footer">
            <p>If you want to solve the problem,</p>
            <div className="footer-line"></div>
            <p>The chair is waiting for you</p>
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