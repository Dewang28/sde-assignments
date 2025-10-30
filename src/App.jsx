import React from "react";
import { motion } from "framer-motion";
import CardDeck from "./components/CardDeck.jsx";
import "./Global.css";

export default function App() {
  const [page, setPage] = React.useState(0); 
  const [busy, setBusy] = React.useState(false);
  const [deckVisible, setDeckVisible] = React.useState(false);
  const [deckActive, setDeckActive] = React.useState(false);
  const [reverse, setReverse] = React.useState(false); 
  const startY = React.useRef(0);

  const clamp = (v) => Math.max(0, Math.min(1, v));

  const go = (next) => {
    if (busy) return;
    const clamped = clamp(next);
    if (clamped === page) return;

    setBusy(true);

    if (clamped === 1) {
      
      setReverse(false);
      setPage(1);

      setTimeout(() => {
        setDeckVisible(true);
        setTimeout(() => setDeckActive(true), 900);
      }, 800);
    } else {
      
      setReverse(true); 
      setDeckActive(false); 
    }

    setTimeout(() => setBusy(false), 1800);
  };

  const onWheel = (e) => {
    if (busy) return;
    if (e.deltaY > 60) go(page + 1);
    if (e.deltaY < -60) go(page - 1);
  };

  const onTouchStart = (e) => (startY.current = e.touches[0].clientY);
  const onTouchEnd = (e) => {
    if (busy) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 60) go(page + 1);
    if (diff < -60) go(page - 1);
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
  }, [page, busy]);

  
  const handleRestackComplete = () => {
    setTimeout(() => {
      setDeckVisible(false);
      setPage(0);
      setReverse(false);
    }, 200); 
  };

  return (
    <div className="app">
      
      <motion.div
        className="intro-wrapper"
        animate={{
          y: page === 0 ? 0 : "-100vh",
          opacity: page === 0 ? 1 : 0,
        }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <section className="intro-page">
          <div className="intro-inner">
            <h1>Introducing Speak Tutor.</h1>
            <h1>The world’s best language teacher.</h1>
            <p>
              Speak Tutor is your personal 24/7 language coach — ready to guide,
              challenge, and motivate you every day.
            </p>
          </div>
        </section>
      </motion.div>

      
      {deckVisible && (
        <motion.div
          className="deck-wrapper"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: deckVisible ? 0 : "100vh",
            opacity: deckVisible ? 1 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <CardDeck
            active={deckActive}
            reverse={reverse}
            onRestackComplete={handleRestackComplete}
          />
        </motion.div>
      )}
    </div>
  );
}
