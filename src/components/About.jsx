// about.jsx
import React, { useLayoutEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { History, Compass, Fingerprint, Activity } from 'lucide-react';

// GSAP plugin kaydı
gsap.registerPlugin(ScrollTrigger);

// --- NEW COMPONENT: THE SHERLOCK MIND ---
const SherlockMind = () => {
  // Arka planda uçuşan "Dedektiflik/Zihin" kelimeleri
  const floatingClues = useMemo(() => [
    "RACHE", "REDBEARD", "TEAPOT",
    "4 SIGNS", "HOUND", "LIAR",
    "PAIROT", "I.O.U", "EAST WIND", "SAVE HIM", "5 NOVEMBER", "RICHARD BROOK",
    "CARL POWERS", "MISS ME?", "32-24-34"
  ], []);

  return (
    <div className="sherlock-mind-container">
      {/* 1. Arka Plan: Uçuşan Kanıtlar */}
      <div className="clues-layer">
        {floatingClues.map((clue, i) => {
          // Rastgelelik hesaplamaları
          const flashDuration = Math.random() * 8 + 5;  // 3s - 8s arası yanıp sönme döngüsü

          return (
            <span
              key={i}
              className="floating-clue"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 70}%`,
                // İki animasyonu CSS variable olarak veya direct style olarak birleştiriyoruz
                // clueFloat: Hareketi sağlar
                // clueFlash: Parlamayı sağlar
                animation: `clueFloat linear infinite, clueFlash ${flashDuration}s ease-in-out infinite -2.5s`
              }}
            >
              {clue}
            </span>
          );
        })}
      </div>

      {/* 2. Görsel Efekt: Tarama Çizgisi */}
      <div className="scan-line"></div>

      {/* 3. Ana İçerik */}
      <div className="mind-content">
        <div className="icon-row">
          <Fingerprint className="mind-icon" size={40} />
          <Activity className="mind-icon" size={40} />
        </div>
        <div className="mind-divider"></div>

        <h1 className="mind-hero-title">
          THE WORLD'S ONLY<br />
          <span className="highlight-title">CONSULTING DETECTIVE</span>
        </h1>
        <p className="mind-paragraph">
          To him, the world is not a playground, but a vast puzzle waiting to be deconstructed.
          He rejects the dull routine of existence, craving only the mental exaltation of the <strong>bizarre</strong>.
          Friendship is a variable he rarely calculates; sentiment is merely grit in a sensitive instrument.
        </p>

        <p className="mind-paragraph">
          He stands alone on the precipice of logic. Neither police nor private eye.
        </p>

      </div>

      {/* Vignette (Karanlık Köşeler) */}
      <div className="mind-vignette"></div>
    </div>
  );
};

// --- DATA (Best Man Speech Quotes) ---
const TELEGRAM_TEXTS = [
  "The point of a best man speech - SH",
  "John Watson is the man who keeps me grounded - SH",
  "I am not a man of sentiment - SH",
  "To the very best of times, John - SH",
  "I have never been a friend until now - SH",
  "Short and sweet... unlike my usual self - SH",
];

const About = () => {
  const mainContainerRef = useRef(null);
  const janusRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================
      // 1. SHERLOCK MIND ANIMATIONS (HERO)
      // =========================================

      const mindTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mind-section",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // A) Giriş: Sinematik Perde Açılışı
      gsap.fromTo(".sherlock-mind-container",
        { clipPath: "circle(5% at 50% 50%)", filter: "grayscale(100%) blur(5px)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          filter: "grayscale(0%) blur(0px)",
          duration: 2,
          ease: "power2.inOut"
        }
      );

      // B) İçerik Animasyonları
      mindTl
        .from(".mind-icon", { scale: 0, rotation: 360, opacity: 0, stagger: 0.2 }, 0.5)
        .from(".mind-divider", { scaleX: 0, duration: 1 }, 0.8)
        .from(".mind-paragraph", { y: 30, opacity: 0, stagger: 0.3, duration: 1 }, 1)
        .from(".mind-hero-title", {
          scale: 0.9,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "back.out(1.7)"
        }, 1.2)

      // Not: floating-clue animasyonu artık CSS üzerinden (clueFloat + clueFlash) yönetiliyor.
      // GSAP ile sadece parallax etkisi verebiliriz ama CSS animasyonu daha performanslı parlamalar için yeterli.

      // =========================================
      // 2. TELEGRAM ANIMATIONS
      // =========================================

      mm.add("(min-width: 1024px)", () => {
        setIsMobile(false);
        gsap.set(".telegram-section", { clearProps: "height,overflow" });
        gsap.set(".telegram-cards-container", { clearProps: "height,overflow,position" });
        gsap.set(".telegram-card", { clearProps: "position,top,left,width,transform,opacity" });

        const telegramTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".telegram-section",
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true,
          }
        });

        telegramTl.from(".telegram-header", { opacity: 0, y: -100, duration: 1, ease: "power2.out" }, 0);

        const cards = gsap.utils.toArray('.telegram-card');
        cards.forEach((card, index) => {
          telegramTl.fromTo(card,
            { clipPath: "inset(0 50% 0 50%)", opacity: 0, scale: 0.8, filter: "brightness(0.8) blur(5px)" },
            { clipPath: "inset(0 0% 0 0%)", opacity: 1, scale: 1, filter: "brightness(1) blur(0px)", duration: 1, ease: "power4.inOut" },
            1 + (index * 0.4)
          ).to(card, { y: -30, opacity: 0.3, duration: 0.5, ease: "power1.in" }, 4 + (index * 0.1));
        });
      });

      mm.add("(max-width: 1023px)", () => {
        setIsMobile(true);
        gsap.set(".telegram-section", { height: "auto", minHeight: "auto", overflow: "visible", position: "relative" });
        gsap.set(".telegram-cards-container", { height: "auto", overflow: "visible", position: "relative", display: "block" });
        gsap.set(".telegram-card", { position: "relative", top: "auto", left: "auto", width: "100%", opacity: 0, transform: "none", marginBottom: "20px" });

        gsap.from(".telegram-header", {
          scrollTrigger: { trigger: ".telegram-section", start: "top 80%" },
          opacity: 0, y: 50, duration: 1, ease: "power2.out"
        });

        ScrollTrigger.batch(".telegram-card", {
          start: "top 90%",
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", overwrite: true }),
        });
      });

      // =========================================
      // 3. JANUS & IMMORTAL
      // =========================================

      if (janusRef.current) {
        gsap.fromTo(janusRef.current,
          { rotationY: -15 },
          { rotationY: 15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );
      }

      const contradictions = gsap.utils.toArray('.contradiction-text');
      contradictions.forEach(c => {
        gsap.to(c, { opacity: 0.2, duration: 0.1, repeat: -1, yoyo: true, repeatDelay: Math.random() * 5 });
      });

      gsap.from(".connect-line", {
        scaleX: 0, transformOrigin: "left center", duration: 2, stagger: 0.5,
        scrollTrigger: { trigger: ".janus-section", start: "top 60%" }
      });

      const immortalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".immortal-section",
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      immortalTl
        .fromTo(".immortal-media-wrapper",
          { clipPath: "circle(0% at 50% 50%)", scale: 1.2 },
          { clipPath: "circle(75% at 50% 50%)", scale: 0.8, duration: 2, ease: "power2.inOut" }, 0
        )
        .to(".immortal-bg-img", { filter: "brightness(0.6) grayscale(0.3)", duration: 1 }, 0.5)
        .fromTo(".immortal-title", { opacity: 0, y: 100, rotationX: -90 }, { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power3.out" }, 1.5)
        .fromTo(".immortal-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 25, duration: 0.8, ease: "power2.out" }, 1.8)
        .fromTo(".immortal-quote", { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 2)
        .to(".immortal-content-overlay", { opacity: 0, duration: 1, ease: "power2.in" }, 3.5);

    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="about-container">
      {/* --- Section 0: THE SHERLOCK MIND --- */}
      <section className="mind-section">
        <SherlockMind />
        <div className="scroll-hint"><span>Analyze</span></div>
      </section>

      {/* --- Section 1: TELEGRAMS --- */}
      <section className="telegram-section">
        <div className="telegram-header">
          <h2 className="telegram-title">The Best Man's Toast</h2>
          <p className="telegram-subtitle">
            Fragments from a speech delivered at a wedding, etched in cream and memory.
          </p>
        </div>
        <div className="telegram-cards-container">
          {TELEGRAM_TEXTS.map((text, i) => (
            <div key={i} className="telegram-card" style={{ zIndex: i, transform: `rotate(${(i % 2 === 0 ? -2 : 2) * (i * 0.5)}deg)` }}>
              <div className="telegram-card-top">
                <span className="telegram-meta">Wedding Breakfast</span>
                <span className="telegram-meta">Reception</span>
              </div>
              <p className="telegram-text">"{text.split(' - ')[0]}"</p>
              <div className="telegram-footer">Spoken by Mr. Sherlock Holmes</div>
            </div>
          ))}
        </div>
        <div className="telegram-overlay"></div>
      </section>

      {/* --- Section 2: JANUS --- */}
      <section className="janus-section">
        <div className="janus-visual-wrapper">
          <div ref={janusRef} className="janus-head">
            <div className="janus-faces-container">
              <div className="face-half face-left"></div>
              <div className="face-half face-right"></div>
            </div>
            <div className="janus-content">
              <h3 className="janus-title">JANUS</h3>
              <div className="janus-icons">
                <History className="icon-cyan" size={32} />
                <Compass className="icon-slate" size={32} />
              </div>
            </div>
          </div>
          <div className="janus-grid">
            <div className="grid-item">
              <div className="contradiction-pair"><span className="contradiction-text text-cyan">EAST</span><div className="connect-line"></div><span className="contradiction-text text-slate">WEST</span></div>
              <p className="item-label">Universal Mind</p>
            </div>
            <div className="grid-item">
              <div className="contradiction-pair"><span className="contradiction-text text-cyan">PAST</span><div className="connect-line"></div><span className="contradiction-text text-slate">FUTURE</span></div>
              <p className="item-label">Timeless Observation</p>
            </div>
            <div className="grid-item">
              <div className="contradiction-pair"><span className="contradiction-text text-cyan">BEGIN</span><div className="connect-line"></div><span className="contradiction-text text-slate">END</span></div>
              <p className="item-label">Absolute Logic</p>
            </div>
            <div className="grid-item">
              <div className="contradiction-pair"><span className="contradiction-text text-cyan">GOOD</span><div className="connect-line"></div><span className="contradiction-text text-slate">EVIL</span></div>
              <p className="item-label">Necessary Balance</p>
            </div>
          </div>
          <div className="quote-wrapper">
            <p className="quote-text">
              Janus is known as the god of doors, transitions, beginnings, and endings in Roman mythology.
              He is the Janus of London. He is east-west,past-future, beginning-end, good-evil (if necessary).
              He contains all contradictions at the same time within a single heartbeat.
              <br />
              He is on the side of the angels, but he is not one of them.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: IMMORTAL --- */}
      <section className="immortal-section">
        <div className="immortal-media-wrapper">
          <img src="/images/waterfall.jpg" alt="Reichenbach Falls" className="immortal-bg-img" />
          <div className="immortal-vignette"></div>
        </div>
        <div className="immortal-content-overlay">
          <div className="immortal-text-wrapper">
            <div className="immortal-header-group">
              <span className="immortal-date">4 May</span>
              <h2 className="immortal-title">IMPOSSIBLE TO DESTRUCT</h2>
              <p className="immortal-subtitle">The Falls, Switzerland</p>
            </div>
            <blockquote className="immortal-quote">
              He defines himself indestructable. Beyond his ego, this fact is proven a lot of times, based on
              his doctor friend's blog or books that contains cases he solved.
              The whole world believed that this fall his end, but reality was different.
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;