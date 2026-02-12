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

// --- TYPES & ENUMS ---
const CaseStatus = {
  SOLVED: 'SOLVED',
  DANGER: 'DANGER',
  CLASSIFIED: 'CLASSIFIED',
  FATAL: 'FATAL',
  ONGOING: 'ONGOING'
};

// --- CONSTANTS ---
const CASE_FILES = [
  {
    id: 'case-1',
    number: '#001',
    title: 'A Study in Pink',
    description: 'The pink suitcase that shouldn’t be there. A series of impossible suicides. A cabbie with a deadly game. This is where it all began.',
    location: 'Brixton',
    clue: 'Poison Pill',
    status: CaseStatus.SOLVED,
  },
  {
    id: 'case-2',
    number: '#002',
    title: 'The Great Game',
    description: 'Trainers from twenty years ago. A bomb vest ticking in the dark. A consulting criminal reveals himself through an elaborate puzzle.',
    location: 'London Eye',
    clue: 'Moriarty',
    status: CaseStatus.DANGER,
  },
  {
    id: 'case-3',
    number: '#003',
    title: 'A Scandal in Belgravia',
    description: 'A smartphone that could topple a nation. The Woman. A battle of wits where the prize is something far more intimate than a phone.',
    location: 'Buckingham Palace',
    clue: 'Irene Adler',
    status: CaseStatus.CLASSIFIED,
  },
  {
    id: 'case-5',
    number: '#005',
    title: 'The Sign of Three',
    description: 'A hidden blade through a camera lens. A wedding toast and a life to save. Sherlock navigates the complexities of a Best Man’s duty.',
    location: 'The Wedding',
    clue: 'The Mayfly Man',
    status: CaseStatus.SOLVED,
  },
  {
    id: 'case-6',
    number: '#006',
    title: 'His Last Vow',
    description: 'Magnussen’s mind palace vs Sherlock’s. The man who knows everyone’s secrets. A final vow that leads to the ultimate sacrifice.',
    location: 'Appledore',
    clue: 'Mind Palace',
    status: CaseStatus.CLASSIFIED,
  },
  {
    id: 'case-4',
    number: '#004',
    title: 'The Reichenbach Fall',
    description: 'The roof of St. Bart’s Hospital. One final jump to save the world from a tarnished reputation. The fall of the genius.',
    location: 'St. Barts',
    clue: 'I.O.U.',
    status: CaseStatus.FATAL,
  }
];

// --- MOCK SERVICE (Analyze Case) ---
const analyzeCase = async (title, description) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analysis: `Logic dictates that ${title} contains hidden variables not yet observed. The pattern suggests a deliberate orchestration.`,
        likelihood: Math.floor(Math.random() * 30) + 70, // 70-99%
        verdict: 'HIGH PROBABILITY OF FOUL PLAY'
      });
    }, 2000);
  });
};

// --- SYMBOLIC ARTS COMPONENTS ---

const SuitcaseArt = () => (
  <div className="art-wrapper group">
    <div className="suitcase-body">
      <div className="suitcase-handle"></div>
      <div className="suitcase-strap top"></div>
      <div className="suitcase-strap bottom"></div>
      <div className="suitcase-tag">EVIDENCE #001</div>
    </div>
    <div className="art-glow pink"></div>
  </div>
);

const BombArt = () => (
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
);

const PhoneArt = () => (
  <div className="art-wrapper perspective-container group">
    <div className="phone-body">
      <div className="phone-credits top">
        Inspired by Sir Arthur Conan Doyle & Sherlock TV Series
      </div>
      <div className="phone-content">
        <div className="passcode-dots">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="dot">{i === 0 ? '*' : ''}</div>
          ))}
        </div>
        <div className="sher-text">SHER</div>
        <div className="lock-icon-wrapper">
          <div className="lock-pulse"></div>
          <div className="lock-circle">
            <Lock className="icon" />
          </div>
        </div>
        <div className="locked-text">LOCKED</div>
      </div>
      <div className="phone-credits bottom">Non-commercial tribute project</div>
      <div className="phone-indicator"></div>
      <div className="phone-reflection"></div>
    </div>
    <div className="art-glow cyan"></div>
  </div>
);

const HospitalArt = () => (
  <div className="hospital-root group">
    <div className="hospital-building-container">
      <div className="hospital-roof">
        <div className="lazarus-text">
          {"LAZARUS".split("").map((char, i) => (
            <span key={i} className="lazarus-char">
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="hospital-windows">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="window"></div>
        ))}
      </div>
      <div className="sherlock-falling"></div>
    </div>
    <div className="art-glow red"></div>
  </div>
);

const WeddingArt = () => (
  <div className="art-wrapper group">
    <div className="camera-body">
      <div className="camera-lens-outer">
        <div className="camera-lens-inner">
          <div className="camera-sensor">
            <div className="sensor-dot"></div>
          </div>
        </div>
      </div>
      <div className="camera-flash"></div>
    </div>
    <div className="art-glow slate"></div>
  </div>
);

const MindPalaceArt = () => (
  <div className="art-wrapper mind-palace-art group">
    <div className="rec-indicator">
      <div className="rec-badge">
        <div className="rec-dot ping"></div>
        <div className="rec-dot static"></div>
        RETINA_SCAN: LIVE
      </div>
    </div>

    <div className="eyes-container">
      {[1, 2].map(i => (
        <div key={i} className="eye-socket">
          <div className="eye-iris"></div>
          <div className="eye-pupil">
            <div className="eye-glint"></div>
            <div className="eye-shard"></div>
          </div>
          <div className="eye-data-stream"></div>
          <div className="eye-hud"></div>
        </div>
      ))}
    </div>

    <div className="hud-data-row">
      <div className="hud-tag">ANALYZING_CORE: 99%</div>
      <div className="hud-tag">TRUTH_LIFESPAN: LOW</div>
    </div>

    <div className="global-scan-line">
      <div className="scan-bar"></div>
    </div>

    <div className="art-glow cyan big"></div>
  </div>
);

const getSymbolicArt = (id) => {
  switch (id) {
    case 'case-1': return <SuitcaseArt />;
    case 'case-2': return <BombArt />;
    case 'case-3': return <PhoneArt />;
    case 'case-4': return <HospitalArt />;
    case 'case-5': return <WeddingArt />;
    case 'case-6': return <MindPalaceArt />;
    default: return null;
  }
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`status-badge ${status.toLowerCase()}`}>
      {status}
    </span>
  );
};

// --- MAIN APP COMPONENT ---

export default function Cases() {
  const containerRef = useRef(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [deduction, setDeduction] = useState(null);
  const [isLoadingDeduction, setIsLoadingDeduction] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro
      gsap.from(".cases-hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      });

      gsap.from(".hero-decoration", {
        scaleX: 0,
        duration: 2,
        delay: 0.5,
        ease: "power4.inOut"
      });

      // Sections
      const sections = gsap.utils.toArray('.case-section');
      sections.forEach((section) => {
        const caseId = section.getAttribute('data-case-id');
        const art = section.querySelector('.case-art-container');
        const info = section.querySelector('.case-info-container');

        gsap.from(art, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: 100,
          scale: 0.8,
          opacity: 0,
        });

        gsap.from(info, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)"
        });

        // Case 4 Animation (The Reichenbach Fall)
        if (caseId === 'case-4') {
          const building = section.querySelector('.hospital-building-container');
          const letters = section.querySelectorAll('.lazarus-char');
          const sherlock = section.querySelector('.sherlock-falling');

          if (building) {
            gsap.to(building, {
              scrollTrigger: {
                trigger: section,
                start: "top 60%",
                end: "bottom top",
                scrub: 1,
              },
              scale: 1.3,
              // zIndex handled in CSS for parallax effect context
              boxShadow: "0 0 100px rgba(239, 68, 68, 0.4)",
              ease: "none"
            });
          }

          if (letters.length) {
            gsap.to(letters, {
              scrollTrigger: {
                trigger: section,
                start: "top 95%",
                end: "bottom 20%",
                scrub: 1.5,
              },
              y: 400,
              x: (i) => (i - 3) * 100,
              rotation: (i) => (i - 3) * 45,
              opacity: 0,
              scale: 0.5,
              stagger: 0.01,
              ease: "power2.in"
            });
          }

          if (sherlock) {
            gsap.to(sherlock, {
              scrollTrigger: {
                trigger: section,
                start: "top 30%",
                end: "bottom 10%",
                scrub: 1,
              },
              y: 800,
              opacity: 0,
              scale: 2,
              ease: "power1.in"
            });
          }
        }
      });

      // Footer
      gsap.from(".main-footer-content", {
        scrollTrigger: {
          trigger: ".main-footer",
          start: "top bottom",
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out"
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
            <div className="fingerprint-icon">
              <Fingerprint className="icon" />
            </div>
          </div>
          <h1 className="cases-hero-title">
            THE CASES
          </h1>
          <div className="hero-decoration">
            <div className="fingerprint-icon">
              <Fingerprint className="icon" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="cases-grid">
        {CASE_FILES.map((caseFile, index) => (
          <section
            key={caseFile.id}
            data-case-id={caseFile.id}
            className={`case-section ${index % 2 === 0 ? 'layout-normal' : 'layout-reverse'}`}
          >
            {/* Symbolic Visual */}
            <div className="case-art-container">
              <div className="bg-number">
                <span>{index + 1}</span>
              </div>
              {getSymbolicArt(caseFile.id)}
            </div>

            {/* Information */}
            <div className="case-info-container">
              <div className="info-header">
                <div className="status-row">
                  <StatusBadge status={caseFile.status} />
                  <span className="case-number">{caseFile.number}</span>
                </div>
                <h2 className="case-title">{caseFile.title}</h2>
                <p className="case-description">{caseFile.description}</p>
              </div>

              <div className="info-meta">
                <div className="meta-item">
                  <div className="meta-icon-box">
                    <MapPin className="icon" />
                  </div>
                  <div className="meta-text">
                    <p className="label">Location</p>
                    <p className="value">{caseFile.location}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-icon-box">
                    <Activity className="icon" />
                  </div>
                  <div className="meta-text">
                    <p className="label">Primary Clue</p>
                    <p className="value">{caseFile.clue}</p>
                  </div>
                </div>
              </div>


            </div>
          </section>
        ))}
      </main>

      {/* Conceptual Footer Section */}
      <footer className="main-footer">
        <div className="footer-gradient"></div>

        <div className="main-footer-content">

          <div className="footer-col col-deduction">
            <div className="deduction-header">
              <div className="shield-icon">
                <ShieldCheck className="icon" />
              </div>
              <div className="deduction-text">
                <h4>Deduction Complete</h4>
                <p>ARCHIVE_LOCK_SUCCESSFUL</p>
              </div>
            </div>
            <p className="quote-small">
              "I am not a psychopath, Anderson. I'm a high-functioning sociopath. Do your research."
            </p>
            <div className="auth-line">
              <span>Authenticated by Mycroft Holmes</span>
            </div>
          </div>

          <div className="footer-col col-metadata">
            <div className="metadata-list">
              <h5>Active Case Files Metadata</h5>
              <div className="meta-rows">
                {[
                  { label: "Subject", value: "S. Holmes / J. Watson" },
                  { label: "Clearance", value: "LEVEL_0_MAX" },
                  { label: "Last Sync", value: new Date().toLocaleDateString() },
                  { label: "Status", value: "GAME_AFOOT" }
                ].map((item, i) => (
                  <div key={i} className="meta-row">
                    <span className="label">{item.label}</span>
                    <span className="value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="obs-log group">
              <EyeIcon className="icon" />
              <div className="obs-text">
                <span className="title">OBSERVATION_LOG</span>
                <span className="subtitle">You see, but you do not observe.</span>
              </div>
            </div>
          </div>

          <div className="footer-col col-address">
            <div className="address-card">
              <div className="card-bg-icon">
                <Fingerprint />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <LockIcon className="lock-small" />
                  <span>Encrypted Archive</span>
                </div>
                <h6>221B BAKER STREET</h6>
                <p className="city">London, United Kingdom</p>
                <div className="separator"></div>
                <div className="signature">S. Holmes</div>
              </div>
            </div>

            <div className="status-dots">
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>

        </div>

        <div className="footer-copyright">
          Sherlock TV Tribute | For Educational Purposes Only
        </div>
      </footer>

      {/* Fixed HUD Overlay */}
      <div className="hud-overlay">
        <div className="hud-left">
          <Terminal className="icon" />
          <span>NODE_221B_CONNECTED</span>
        </div>
        <div className="hud-right">
          <span>MEM_OS: {new Date().getHours()}:{new Date().getMinutes()}</span>
          <Activity className="icon" />
        </div>
      </div>

      {/* Mind Palace Modal */}
      {selectedCase && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <div className="header-title">
                <BrainCircuit className="icon pulse" />
                <h3>Mind Palace Analysis</h3>
              </div>
              <button onClick={() => setSelectedCase(null)} className="close-btn">
                <X className="icon" />
              </button>
            </div>

            <div className="modal-body">
              <h4 className="case-title">{selectedCase.title}</h4>
              <p className="case-desc">"{selectedCase.description}"</p>

              {isLoadingDeduction ? (
                <div className="loading-state">
                  <Loader2 className="spinner" />
                  <p>Running deduction algorithms...</p>
                </div>
              ) : deduction ? (
                <div className="deduction-result">
                  <div className="analysis-text-block">
                    <div className="label-row">
                      <Terminal className="icon" />
                      <span>The Analysis</span>
                    </div>
                    <p className="analysis-text">{deduction.analysis}</p>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-box">
                      <p className="stat-label">Likelihood of Guilt</p>
                      <div className="stat-value-container">
                        <span className="percentage">{deduction.likelihood}%</span>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${deduction.likelihood}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="stat-box">
                      <p className="stat-label">Verdict</p>
                      <p className="verdict-text">
                        <ShieldAlert className="icon" />
                        {deduction.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="error-state">
                  <p>Error connecting to Mind Palace. Try again later.</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedCase(null)} className="close-link">
                Close Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}