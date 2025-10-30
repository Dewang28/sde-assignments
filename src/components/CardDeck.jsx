import React from "react";
import { motion } from "framer-motion";

const cards = [0, 1, 2];

export default function CardDeck({ active, reverse, onRestackComplete }) {
  const [index, setIndex] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const startY = React.useRef(0);

  const clamp = (v) => Math.max(0, Math.min(cards.length - 1, v));

  const go = (next) => {
    if (busy || !active) return;
    const clamped = clamp(next);
    if (clamped === index) return;
    setBusy(true);
    setIndex(clamped);
    setTimeout(() => setBusy(false), 1000);
  };

  const onWheel = (e) => {
    if (!active || busy) return;
    if (e.deltaY > 60) go(index + 1);
    if (e.deltaY < -60) go(index - 1);
  };

  const onTouchStart = (e) => (startY.current = e.touches[0].clientY);
  const onTouchEnd = (e) => {
    if (!active || busy) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 60) go(index + 1);
    if (diff < -60) go(index - 1);
  };

  React.useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, busy, active]);


  React.useEffect(() => {
    if (reverse) {
      const totalDelay = cards.length * 300;
      const timer = setTimeout(() => {
        onRestackComplete?.();
      }, totalDelay + 800); 
      return () => clearTimeout(timer);
    }
  }, [reverse]);

  return (
    <div className="deck">
      {cards.map((c, i) => {
        const isActive = i === index;
        const isPast = i < index;
        const z = cards.length - i;

        
        const reverseDelay = reverse ? (cards.length - i - 1) * 0.3 : 0;

        return (
          <motion.div
            key={i}
            className="outer-card"
            style={{ zIndex: z }}
            animate={{
              y: reverse
                ? 0 
                : isPast
                ? "-110vh"
                : isActive
                ? 0
                : "0vh",
              opacity: reverse ? 1 : isActive ? 1 : 0,
              scale: reverse ? 1 : isActive ? 1 : 0.95,
            }}
            transition={{
              duration: 1.0,
              delay: reverseDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="content-wrap">
              
              <div className="left">
                <h1>
                  {i === 0
                    ? "Stay motivated and reach your goals"
                    : i === 1
                    ? "Talk about anything, anytime, anywhere"
                    : "Build a relationship with your tutor"}
                </h1>
                <p>
                  {i === 0
                    ? "Speak Tutor keeps you motivated and accountable to achieve your goals. Learning a language is better with someone by your side."
                    : i === 1
                    ? "Speak Tutor is your on-the-go conversational partner. Practice speaking on any topic, anytime, no matter how niche."
                    : "Speak Tutor designs a personalized curriculum as unique as you are by getting to know you on a surprisingly deep level."}
                </p>
              </div>

              
              <div className="right">
                <div className="phone">
                  {i === 0 ? (
                    <>
                      <div className="phone-top">
                        <div className="emoji">🤖</div>
                      </div>
                      <div className="top-cards">
                        <div className="pink-card">
                          <span className="icon">❤️</span>
                          <p>
                            You’re interested in traveling and exploring new
                            cultures.
                          </p>
                        </div>
                        <div className="blue-card">
                          <span className="iconm">☰</span>
                          <p>
                            We’ve created unique lessons and conversations based
                            on those goals.
                          </p>
                        </div>
                      </div>
                      <button className="btn-primary">Get Started</button>
                    </>
                  ) : i === 1 ? (
                    <>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#7d7e94",
                          marginBottom: "6px",
                        }}
                      >
                        Create your own
                      </p>
                      <div className="talk-options">
                        <div className="talk-card">Tourist</div>
                        <div className="talk-card">New friend</div>
                        <div className="talk-card">
                          Talking about the best places to grab dinner in San
                          Francisco.
                        </div>
                      </div>
                      <button className="btn-primary">Start chatting</button>
                    </>
                  ) : (
                    <>
                      <div className="lesson-bubble">
                        <div className="phone-top">
                          <div className="emoji">🤖</div>
                        </div>
                        <b>Speak</b>
                        <br />
                        Hey Audrey, your trip to Mexico is in 6 days! <br />
                        Let’s practice some vocabulary for your trip!
                      </div>
                      <div className="on-card">
                        <p className="on-card-title">MADE FOR YOU</p>
                        <p className="on-card-text">
                          Phrases to go through customs and air travel
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
