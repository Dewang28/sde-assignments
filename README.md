# Tech Stack

1. Framework: React.js

2. Animations: Framer Motion

3. Styling: Custom CSS (handwritten for full layout control)

4. Build Tool: Vite

# Component Structure

1. App.jsx

- Controls the main scroll and page transitions between the intro section and the card deck.

- Handles wheel and touch interactions for both directions (forward and reverse).

2. CardDeck.jsx

- Manages the stack of animated cards using Framer Motion.

- Handles smooth transitions, delays, and restacking effects.

- Contains content for each card (text + phone mockup).

3. Global.css

- Defines all colors, layout, and responsive styles.

- Handles spacing, typography, and shadow consistency across breakpoints.

# Responsiveness & Animations

1. Responsiveness

- Built entirely with CSS media queries.

- The layout smoothly adapts from wide desktop screens to smaller mobile widths.

- Cards stack vertically on mobile for a cleaner view.

2. Animations

- Powered by Framer Motion for smooth motion effects.

- Scroll or swipe actions trigger transitions between intro and card deck sections.

- Each card animates individually with staggered delays to create a natural stacking flow.

- Animation timings and easing were fine-tuned for a soft, realistic feel.