/* IIMA Ventures — Portfolio page hero carousel data.
   A hand-picked selection of real companies from the full 168-company
   portfolio (see portfolio-data.js), reusing the same 4 campus photos as
   the home page's founder stories. Loaded before portfolio.js.
   `scale` corrects for each logo's visual "ink weight" (same technique as
   the grid below) so all 11 read as roughly the same size despite very
   different natural proportions. */

const PORTFOLIO_HERO_STORIES = [
  { name: "Agnikul Cosmos", logo: "assets/portfolio-logos/062-agnikul.png", url: "https://agnikul.in/#/", image: "assets/img/home-1.jpg", scale: 1.3,
    text: "A pioneer in India’s private space sector, building the world’s largest single-piece 3D-printed rocket engine.",
    meta: ["Deep Tech", "Space Tech", "Chennai"] },
  { name: "Unbox Robotics", logo: "assets/portfolio-logos/064-unboxrobotics.png", url: "https://unboxrobotics.com/", image: "assets/img/home-2.jpg", scale: 0.85,
    text: "Grid-based autonomous sortation robots that cut warehouse and last-mile fulfilment costs.",
    meta: ["Deep Tech", "Robotics", "Pune"] },
  { name: "Kaleidofin", logo: "assets/portfolio-logos/068-kaleidofin.png", url: "https://kaleidofin.com/", image: "assets/img/home-3.jpg", scale: 0.938,
    text: "AI-driven savings, credit and insurance products built for India’s informal and underserved workforce.",
    meta: ["Digitalization", "Fintech", "Chennai"] },
  { name: "Bellatrix Aerospace", logo: "assets/portfolio-logos/030-bellatrix-aerospace.png", url: "https://bellatrix.aero/", image: "assets/img/home-4.jpg", scale: 0.864,
    text: "Building green electric and chemical propulsion systems for the next generation of satellites.",
    meta: ["Deep Tech", "Aerospace & Defense", "Bengaluru"] },
  { name: "Riskcovry", logo: "assets/portfolio-logos/070-riskcovry.png", url: "https://riskcovry.com/", image: "assets/img/home-1.jpg", scale: 1.079,
    text: "Insurance-as-a-service infrastructure that lets any business embed and sell insurance in minutes.",
    meta: ["Digitalization", "Fintech", "Mumbai"] },
  { name: "Frontier Markets", logo: "assets/portfolio-logos/076-frontiermkts.png", url: "https://www.frontiermkts.com/", image: "assets/img/home-2.jpg", scale: 1.071,
    text: "A rural commerce network connecting underserved India to essential products and services.",
    meta: ["Digitalization", "Skilling & Livelihood", "Jaipur"] },
  { name: "CogniTensor", logo: "assets/portfolio-logos/096-cognitensor.png", url: "https://www.cognitensor.com/", image: "assets/img/home-3.jpg", scale: 1.223,
    text: "An AI company turning industrial and supply-chain data into predictive decisions.",
    meta: ["Deep Tech", "AI", "Mumbai"] },
  { name: "GUVI", logo: "assets/portfolio-logos/087-guvi.png", url: "https://www.guvi.in/", image: "assets/img/home-4.jpg", scale: 0.85,
    text: "India’s first skilling platform for technology education in multiple Indian languages.",
    meta: ["Others", "Skilling & Livelihood", "Chennai"] },
  { name: "JAI Kisan", logo: "assets/portfolio-logos/072-jai-kisan.png", url: "https://www.jai-kisan.com/", image: "assets/img/home-1.jpg", scale: 1.0,
    text: "A rural fintech platform delivering embedded credit and financial services for India’s farmers and agri-businesses.",
    meta: ["Digitalization", "Fintech", "Mumbai"] },
  { name: "Tan90 Thermal Solutions", logo: "assets/portfolio-logos/058-tan90thermal.png", url: "https://www.tan90thermal.com/", image: "assets/img/home-2.jpg", scale: 0.905,
    text: "Thermal battery technology that stores renewable energy as heat to decarbonise industrial process heating.",
    meta: ["Climate Tech", "Energy Storage", "Bengaluru"] },
  { name: "Kosha.ai", logo: "assets/portfolio-logos/131-kosha.png", url: "https://www.kosha.ai/", image: "assets/img/home-3.jpg", scale: 1.109,
    text: "An AI-powered platform that continuously tests and validates enterprise cyber-defences like an autonomous red team.",
    meta: ["Others", "Cybersecurity", "Bengaluru"] },
];
