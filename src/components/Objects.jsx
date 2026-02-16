// objects.jsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Objects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ==================================================
      // 1. UNIFORM SECTION (POLYGON REVEAL)
      // ==================================================
      const uniformTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-uniform",
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      // Görsel Başlangıç: Ortadan çizgi -> Bitiş: Tam Ekran
      uniformTl.fromTo(".uniform-main-image",
        {
          clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
          scale: 1.2,
          filter: "grayscale(100%) brightness(0.5)"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          filter: "grayscale(30%) brightness(0.9)",
          duration: 2,
          ease: "power2.inOut"
        }
      );

      // Metin Animasyonu
      uniformTl.from(".uniform-content-text", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, 1.2);

      // ==================================================
      // 2. VIOLIN SECTION (CIRCLE REVEAL - SPOTLIGHT)
      // ==================================================
      const violinTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-violin",
          start: "top top",
          end: "+=150%", // Animasyon süresi
          scrub: 1,
          pin: true,     // Bölümü sabitle
        }
      });

      // Görsel Başlangıç: Bulanık, Siyah Beyaz ve Merkezde Küçük Daire
      // Bitiş: Net, Renkli ve Tam Ekran
      violinTl.fromTo(".violin-main-image",
        {
          clipPath: "circle(0% at 50% 50%)", // Hiç yoktan başla
          scale: 1.3,
          filter: "grayscale(100%) blur(10px) brightness(0.4)"
        },
        {
          clipPath: "circle(100% at 50% 50%)", // Tam ekran açıl
          scale: 0.75,
          filter: "grayscale(0%) blur(0px) brightness(1)",
          duration: 2,
          ease: "power2.inOut"
        }
      );

      // Metin Animasyonu (Uniform'un aksine biraz daha geç gelsin)
      violinTl.from(".violin-content-text", {
        y: -50,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "power3.out"
      }, 1.5);

      // ==================================================
      // 3. PHONE (The Woman)
      // ==================================================
      const chatTl = gsap.timeline({
        scrollTrigger: { trigger: "#section-phone", start: "top 55%" }
      });

      const messages = gsap.utils.toArray(".chat-bubble");
      messages.forEach((msg, i) => {
        chatTl.fromTo(msg,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
          `+=${i === messages.length - 1 ? 1.0 : 0.5}`
        );
      });

      // ==================================================
      // 4. BOOK (Watson)
      // ==================================================
      gsap.fromTo(".book-cover",
        { rotationY: 0 },
        {
          scrollTrigger: {
            trigger: "#section-book",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1.5,
          },
          rotationY: -30,
          transformOrigin: "left center",
          ease: "none"
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="objects-container">

      {/* --- SECTION 1: THE SILHOUETTE (Uniform) --- */}
      <section id="section-uniform" className="object-section uniform-section-wrapper">
        <img src="/images/the-detective-image.jpg" alt="The Detective" className="uniform-main-image" />

        <div className="uniform-overlay-content">
          <div className="uniform-content-text">
            <span className="section-subtitle">01 // The Silhouette</span>
            <h2 className="object-title">The Armor</h2>
            <div className="divider-cyan"></div>
            <p className="object-desc">
              The iconic Belstaff jacket, the upturned collar. It is a costume of armor.
              He wears his solitude like a coat, shielding himself from the banality of ordinary life.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE VIRTUOSO (Violin) --- */}
      <section id="section-violin" className="object-section violin-section-wrapper">
        <img src="/images/the-violin.jpg" alt="The Violin" className="violin-main-image" />

        <div className="violin-overlay-content">
          <div className="violin-content-text">
            <span className="section-subtitle">02 // The Virtuoso</span>
            <h2 className="object-title">The Instrument</h2>
            <div className="divider-cyan"></div>
            <p className="object-desc">
              He does not play for applause. He plays to untangle the knots in his mind palace.
              When the logic limits, the music begins. It is not just sound; it is chaos processed into pure deductive reason.
              <br /><br />
              <span className="highlight-text">"It clears the static."</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE WOMAN (Phone) --- */}
      <section id="section-phone" className="object-section">
        <div className="content-wrapper reverse-on-mobile">
          <div className="text-box">
            <span className="section-subtitle">03 // The Woman</span>
            <h2 className="object-title">The Connection</h2>
            <div className="divider-cyan"></div>
            <p className="object-desc">
              Irene Adler. The only mind that ever beat him. A dangerous game of chess played via SMS.
              Sentimental? No. It was a duel of intellects, vibrating in his pocket.
              <br /><br />
              <span className="highlight-text">"Brainy is the new sexy."</span>
            </p>
          </div>
          <div className="visual-box">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="chat-header">Unknown Number</div>
                <div className="chat-body">
                  <div className="chat-bubble incoming">Let's have dinner.</div>
                  <div className="chat-bubble incoming">Let's have dinner.</div>
                  <div className="chat-bubble incoming">Let's have dinner.</div>
                  <div className="time-separator"><span>December 25</span></div>
                  <div className="chat-bubble incoming special">Merry Christmas.</div>
                  <div className="time-separator"><span>Karachi</span></div>
                  <div className="chat-bubble incoming final">Goodbye Mr. H.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE CHRONICLER (Book) --- */}
      <section id="section-book" className="object-section bg-alt">
        <div className="content-wrapper">
          <div className="visual-box perspective-container">
            <div className="book-3d">
              <div className="book-cover">
                <div className="book-spine"></div>
                <div className="book-front">
                  <BookOpen size={40} className="book-icon" />
                  <h3 className="book-title-text">A STUDY IN<br />PINK</h3>
                  <div className="book-author-line">
                    <span>AUTHOR:</span>
                    <span className="handwritten">The Detective's Doctor Friend</span>
                  </div>
                </div>
              </div>
              <div className="book-pages"></div>
              <div className="book-back"></div>
            </div>
          </div>
          <div className="text-box">
            <span className="section-subtitle">04 // The Chronicler</span>
            <h2 className="object-title">The Legend</h2>
            <div className="divider-cyan"></div>
            <p className="object-desc">
              Without the blogger, there is no legend. Only cold cases in a police file.
              John Watson documents the genius, romanticizing the sociopath into a hero for the public eye.
              He humanizes the machine.
              <br /><br />
              <span className="highlight-text">"I'm not his friend. I'm his blogger."</span>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Objects;