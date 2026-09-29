/* IIMA Ventures — Portfolio page hero carousel data.
   Matches the real "Startups from the Continuum" sequence and copy used
   on the live iimaventures.com home page, plus Unbox Robotics and
   Airbound per explicit direction. Logos are re-hosted locally (cropped
   to content, background flattened to transparent); Airbound's is the
   real SVG wordmark from airbound.com recolored for a light background.
   `scale` corrects for each logo's visual "ink weight" (same technique
   as the grid below) so all 11 read as roughly the same size despite
   very different natural proportions. */

const PORTFOLIO_HERO_STORIES = [
  { name: "IIMA Ventures", logo: "", url: "", image: "assets/img/home-1.jpg", scale: 0.919,
    text: "Partner to many of India’s iconic 0 → 1 journeys.",
    meta: ["IIMA Ventures", "Innovation Continuum", "Ahmedabad"] },
  { name: "Razorpay", logo: "assets/portfolio-logos/201-razorpay.png", url: "https://razorpay.com/", image: "assets/img/home-2.jpg", scale: 0.75,
    text: "India’s only full-stack financial solutions company for businesses.",
    meta: ["Digitalization", "Fintech", "Bengaluru"] },
  { name: "Agnikul Cosmos", logo: "assets/portfolio-logos/062-agnikul.png", url: "https://agnikul.in/#/", image: "assets/img/agnikul-hero.jpg", scale: 1.156,
    text: "Pioneer in India’s private space sector, building the world’s largest single-piece 3D-printed rocket engine.",
    meta: ["Deep Tech", "Space Tech", "Chennai"] },
  { name: "Fourth Partner Energy", logo: "assets/portfolio-logos/202-fourthpartnerenergy.png", url: "https://www.fourthpartner.co/", image: "assets/img/fourthpartnerenergy-hero.jpg", imgPos: "center 60%", scale: 0.9,
    text: "India’s leading renewable energy solutions company.",
    meta: ["Climate Tech", "Renewable Energy", "Hyderabad"] },
  { name: "Nabhdrishti", logo: "assets/portfolio-logos/035-nabhdrishti.png", url: "https://www.nabhdrishti.in/", image: "assets/img/nabhdrishti-hero.jpg", scale: 1.003,
    text: "India’s first fuel-flex micro gas turbine for use in aviation & power generation.",
    meta: ["Deep Tech", "Aerospace"] },
  { name: "Chara", logo: "assets/portfolio-logos/028-chara.png", url: "https://chara.co.in/", image: "assets/img/home-2.jpg", scale: 0.825,
    text: "India’s first rare-earth magnet-free motor technologies for next-gen drives.",
    meta: ["Deep Tech", "EV Motors"] },
  { name: "Unbox Robotics", logo: "assets/portfolio-logos/064-unboxrobotics.png", url: "https://unboxrobotics.com/", image: "assets/img/home-3.jpg", scale: 0.922,
    text: "India’s leading vertical robotic sortation system powered by proprietary swarm intelligence.",
    meta: ["Deep Tech", "Robotics", "Pune"] },
  { name: "Airbound", logo: "assets/portfolio-logos/200-airbound.svg", url: "https://www.airbound.com/", image: "assets/img/home-4.jpg", scale: 1.061,
    text: "India’s next-generation aircraft platform, building light, intelligent aircraft that can take off and fly anywhere.",
    meta: ["Deep Tech", "Aerospace"] },
  { name: "5C Network", logo: "assets/logos/5c-network.png", url: "https://5cnetwork.com", image: "assets/img/home-1.jpg", scale: 1.0,
    text: "India’s largest & most trusted AI-assisted radiology interpretation platform.",
    meta: ["Deep Tech", "Healthcare", "Bengaluru"] },
  { name: "Idea Forge", logo: "assets/portfolio-logos/204-ideaforge.png", url: "https://ideaforgetech.com/", image: "assets/img/home-2.jpg", scale: 0.932,
    text: "Pioneer & the pre-eminent market leader in the Indian unmanned aircraft systems.",
    meta: ["Deep Tech", "Aerospace", "Mumbai"] },
  { name: "Zouk", logo: "assets/portfolio-logos/205-zouk.png", url: "http://zouk.co.in/", image: "assets/img/home-3.jpg", scale: 1.061,
    text: "Authentic Indian brand championing sustainable, cruelty-free lifestyle products.",
    meta: ["Others", "D2C", "Bengaluru"] },
];
