import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Smartphone, BookOpen, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mesajlaşma verisi
const CHAT_MESSAGES = [
  { sender: "irene", text: "Let's have dinner." },
  { sender: "irene", text: "Let's have dinner." },
  { sender: "irene", text: "Let's have dinner." },
  { sender: "sherlock", text: "..." },
  { sender: "irene", text: "Merry Christmas." },
  { sender: "irene", text: "Goodbye Mr. H." },
];

const Objects = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- ANA YATAY SCROLL ANIMASYONU ---
      const sections = gsap.utils.toArray('.object-panel');
      const container = containerRef.current;
      const wrapper = wrapperRef.current;

      // Toplam genişlik (4 panel * 100vw)
      const scrollAmount = sections.length * 100;

      // Yatay kaydırma
      gsap.to(wrapper, {
        x: () => `-${scrollAmount - 100}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollAmount}%`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // --- PANEL 1: SILHOUETTE (Identity) ---
      // Şapka ve pipo yukarı düşer, metin soldan gelir
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#panel-identity",
          start: "left center",
          end: "right center",
          containerAnimation: gsap.to(wrapper, { x: 0 }), // Referans için dummy
          scrub: true,
        }
      });

      // Ekran görünürlüğü için intersection observer yerine timeline içine alıyoruz
      gsap.fromTo("#panel-identity .object-content",
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: "#panel-identity",
            start: "left 80%",
            end: "left 20%",
            horizontal: true,
            containerAnimation: gsap.to(wrapper, { x: `-${scrollAmount}vw` }), // Hesaplama düzeltmesi
            scrub: 1,
          }
        }
      );

      // --- PANEL 2: VIOLIN (Resonance) ---
      gsap.fromTo("#panel-violin .visual-element",
        { rotation: -10, opacity: 0, scale: 0.8 },
        {
          rotation: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: "#panel-violin",
            start: "left 70%",
            end: "left 30%",
            horizontal: true,
            containerAnimation: gsap.to(wrapper, { x: `-${scrollAmount}vw` }),
            scrub: 1,
          }
        }
      );

      // --- PANEL 3: PHONE (The Woman) ---
      // Mesajların sırayla gelmesi
      const messages = gsap.utils.toArray('#panel-phone .chat-bubble');
      messages.forEach((msg, index) => {
        gsap.fromTo(msg,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: "#panel-phone",
              start: () => `left+=${20 + (index * 8)}% center`, // Her mesaj için kaydırma offset'i
              end: () => `left+=${25 + (index * 8)}% center`,
              horizontal: true,
              containerAnimation: gsap.to(wrapper, { x: `-${scrollAmount}vw` }),
              scrub: 1.2,
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // --- PANEL 4: BOOK (The Doctor) ---
      gsap.fromTo("#panel-book .book-cover",
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0, opacity: 1,
          scrollTrigger: {
            trigger: "#panel-book",
            start: "left 60%",
            end: "left 20%",
            horizontal: true,
            containerAnimation: gsap.to(wrapper, { x: `-${scrollAmount}vw` }),
            scrub: 1,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="objects-container">
      <div ref={wrapperRef} className="objects-wrapper">

        {/* --- PANEL 1: IDENTITY --- */}
        <section id="panel-identity" className="object-panel panel-dark">
          <div className="panel-content">
            <div className="visual-area">
              {/* CSS ile çizilmiş silüetler */}
              <div className="silhouette-group">
                <div className="hat-shape"></div>
                <div className="pipe-shape"></div>
                <div className="coat-shape"></div>
              </div>
            </div>
            <div className="object-content">
              <span className="label">01 / The Armor</span>
              <h2 className="panel-title">The Silhouette</h2>
              <p className="panel-desc">
                "He projects an image of the deerstalker and the pipe, not for vanity, but for utility.
                The coat is his armor against the banality of ordinary life.
                They see the hat; he sees a disguise."
              </p>
            </div>
          </div>
        </section>

        {/* --- PANEL 2: VIOLIN --- */}
        <section id="panel-violin" className="object-panel panel-accent">
          <div className="panel-content reverse">
            <div className="visual-area">
              <div className="violin-visual">
                <Music size={120} strokeWidth={1} className="violin-icon" />
                <div className="sound-waves">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
            <div className="object-content">
              <span className="label">02 / The Resonance</span>
              <h2 className="panel-title">The Violin</h2>
              <p className="panel-desc">
                "When the mind palace becomes too crowded, he seeks the strings.
                Not for an audience, but to orchestrate his thoughts.
                The music is a deduction in itself—chaos turned into harmony."
              </p>
            </div>
          </div>
        </section>

        {/* --- PANEL 3: PHONE --- */}
        <section id="panel-phone" className="object-panel panel-darker">
          <div className="panel-content column-layout">
            <div className="phone-header">
              <span className="label">03 / The Woman</span>
              <h2 className="panel-title">The Texts</h2>
            </div>

            <div className="phone-device">
              <div className="phone-screen">
                <div className="chat-header">
                  <span>The Woman</span>
                  <div className="status-dot"></div>
                </div>
                <div className="chat-body">
                  {CHAT_MESSAGES.map((msg, i) => (
                    <div
                      key={i}
                      className={`chat-bubble ${msg.sender === 'irene' ? 'left' : 'right'}`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="panel-desc center-text">
              "He deletes the texts, but the sentiment remains... stored in a locked room."
            </p>
          </div>
        </section>

        {/* --- PANEL 4: BOOK --- */}
        <section id="panel-book" className="object-panel panel-cyan">
          <div className="panel-content">
            <div className="visual-area">
              <div className="book-cover">
                <div className="book-spine"></div>
                <div className="book-front">
                  <h3>The Adventures</h3>
                  <div className="book-divider"></div>
                  <p className="book-author">Author: <br /> <span>Detective's Doctor Friend</span></p>
                </div>
              </div>
            </div>
            <div className="object-content">
              <span className="label">04 / The Chronicle</span>
              <h2 className="panel-title">The Books</h2>
              <p className="panel-desc">
                "Written by the one man who stayed. Dr. Watson immortalizes
                not just the cases, but the heart behind the logic.
                He is the author of the legend."
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Objects;