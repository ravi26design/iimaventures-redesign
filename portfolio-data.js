/* IIMA Ventures — Portfolio page data.
   The 36 companies shown on the Portfolio page, in the order supplied by the
   team's sheet, with the sheet's own Theme / Industry tags. A company can
   carry several themes (`themes`), but exactly one `industry`. Logos are
   re-hosted locally (cropped to content; white-only marks recoloured dark so
   they read on the white grid). `scale` is a per-logo size correction so
   they read at a similar visual size. */

const PORTFOLIO_THEMES = ["Deep Tech", "Digital Acceleration", "Climate & Sustainability", "Consumer"];
const PORTFOLIO_INDUSTRIES = ["Robotics & Autonomous Systems", "Financial Inclusion & Fintech", "Semiconductors", "Aerospace & Defence", "Climate Tech, Energy & Storage", "Health & Wellbeing", "Mobility & Automotive Tech", "Advanced Materials", "Learning, Skilling & Livelihoods", "Agri & Rural Value Chains", "Medtech & Medical devices", "Enterprise Tech", "Advanced Manufacturing", "AI Infrastructure & Frontier AI", "Space & Satellite (Space 2.0)", "Life Sciences & Biotech", "Consumer", "Applied AI", "Circularity & Resources", "Commerce", "Climate Intelligence", "Agrifood Tech"];

const PORTFOLIO_COMPANIES = [
  { name: "NeuralZome", url: "https://neuralzome.com/", logo: "assets/portfolio-logos/300-neuralzome.png", scale: 1.691, themes: ["Deep Tech"], industry: "Robotics & Autonomous Systems" },
  { name: "Kaleidofin", url: "https://kaleidofin.com/", logo: "assets/portfolio-logos/068-kaleidofin.png", scale: 0.693, themes: ["Digital Acceleration"], industry: "Financial Inclusion & Fintech" },
  { name: "Oolka", url: "https://oolka.in/", logo: "assets/portfolio-logos/301-oolka.png", scale: 1.675, themes: ["Digital Acceleration"], industry: "Financial Inclusion & Fintech" },
  { name: "Morphing Machines", url: "https://www.morphing.in/", logo: "assets/portfolio-logos/019-morphing.png", scale: 1.612, themes: ["Deep Tech"], industry: "Semiconductors" },
  { name: "NabhDrishti Aerospace", url: "https://www.nabhdrishti.in/", logo: "assets/portfolio-logos/035-nabhdrishti.png", scale: 1.099, themes: ["Deep Tech"], industry: "Aerospace & Defence" },
  { name: "Finarkein", url: "https://finarkein.com/", logo: "assets/portfolio-logos/084-finarkein.png", scale: 1.335, themes: ["Digital Acceleration"], industry: "Financial Inclusion & Fintech" },
  { name: "Jai Kisan", url: "https://www.jai-kisan.com/", logo: "assets/portfolio-logos/072-jai-kisan.png", scale: 0.908, themes: ["Digital Acceleration"], industry: "Financial Inclusion & Fintech" },
  { name: "eTrnl Energy", url: "https://e-trnl.energy/", logo: "assets/portfolio-logos/063-e-trnl.png", scale: 1.437, themes: ["Deep Tech", "Climate & Sustainability"], industry: "Climate Tech, Energy & Storage" },
  { name: "Airbound", url: "https://www.airbound.com/", logo: "assets/portfolio-logos/317-airbound.svg", scale: 1.172, themes: ["Deep Tech"], industry: "Aerospace & Defence" },
  { name: "Butterfly Learning", url: "https://www.butterflylearnings.com/", logo: "assets/portfolio-logos/099-butterflylearnings.png", scale: 1.411, themes: ["Digital Acceleration"], industry: "Health & Wellbeing" },
  { name: "Tookitaki", url: "https://tookitaki.ai/", logo: "assets/portfolio-logos/314-tookitaki.png", scale: 0.929, themes: ["Digital Acceleration"], industry: "Financial Inclusion & Fintech" },
  { name: "Chara", url: "https://chara.co.in/", logo: "assets/portfolio-logos/028-chara-2.svg", scale: 1.0, themes: ["Climate & Sustainability", "Deep Tech"], industry: "Mobility & Automotive Tech" },
  { name: "The E-Plane Company", url: "https://eplane.ai/", logo: "assets/portfolio-logos/025-eplane.png", scale: 1.358, themes: ["Deep Tech"], industry: "Aerospace & Defence" },
  { name: "Unbox Robotics", url: "https://unboxrobotics.com/", logo: "assets/portfolio-logos/064-unboxrobotics.png", scale: 1.243, themes: ["Deep Tech"], industry: "Robotics & Autonomous Systems" },
  { name: "Ants Ceramics", url: "https://antsceramics.com/", logo: "assets/portfolio-logos/302-ants.png", scale: 1.267, themes: ["Deep Tech"], industry: "Advanced Materials" },
  { name: "GUVI", url: "https://www.guvi.in/", logo: "assets/portfolio-logos/087-guvi.png", scale: 1.604, themes: ["Digital Acceleration"], industry: "Learning, Skilling & Livelihoods" },
  { name: "Barrix Agro Sciences", url: "https://barrix.in/", logo: "assets/portfolio-logos/303-barrix.svg", scale: 1.541, themes: ["Deep Tech", "Climate & Sustainability"], industry: "Agri & Rural Value Chains" },
  { name: "Biosense", url: "https://www.biosense.in/", logo: "assets/portfolio-logos/304-biosense.png", scale: 1.173, themes: ["Deep Tech"], industry: "Medtech & Medical devices" },
  { name: "Ridlr", url: "https://ridlr.in/", logo: "assets/portfolio-logos/305-ridlr.png", scale: 1.182, themes: ["Digital Acceleration"], industry: "Mobility & Automotive Tech" },
  { name: "Flick2Know", url: "https://flick2know.com/", logo: "assets/portfolio-logos/306-flick2know.png", scale: 1.344, themes: ["Digital Acceleration"], industry: "Enterprise Tech" },
  { name: "Forus Health", url: "https://forushealth.com/", logo: "assets/portfolio-logos/307-forus.svg", scale: 1.098, themes: ["Deep Tech"], industry: "Medtech & Medical devices" },
  { name: "ideaForge", url: "https://ideaforgetech.com/", logo: "assets/portfolio-logos/204-ideaforge.png", scale: 1.677, themes: ["Deep Tech"], industry: "Aerospace & Defence" },
  { name: "Transerve Technologies", url: "https://transervetechnologies.com/", logo: "assets/portfolio-logos/308-transerve.png", scale: 1.224, themes: ["Digital Acceleration"], industry: "Enterprise Tech" },
  { name: "Frilp", url: "https://www.linkedin.com/company/turing-research-labs/", logo: "assets/portfolio-logos/309-frilp.png", scale: 1.35, themes: ["Digital Acceleration"], industry: "Enterprise Tech" },
  { name: "Detect Technologies", url: "https://detecttechnologies.com/", logo: "assets/portfolio-logos/026-defect-technologies.png", scale: 1.563, themes: ["Deep Tech"], industry: "Advanced Manufacturing" },
  { name: "5C Network", url: "https://5cnetwork.com/", logo: "assets/portfolio-logos/315-5c-network.png", scale: 1.347, themes: ["Deep Tech"], industry: "AI Infrastructure & Frontier AI" },
  { name: "Agnikul Cosmos", url: "https://agnikul.in/#/", logo: "assets/portfolio-logos/062-agnikul.png", scale: 0.618, themes: ["Deep Tech"], industry: "Space & Satellite (Space 2.0)" },
  { name: "Bellatrix Aerospace", url: "https://bellatrix.aero/", logo: "assets/portfolio-logos/030-bellatrix-aerospace.png", scale: 1.636, themes: ["Deep Tech"], industry: "Space & Satellite (Space 2.0)" },
  { name: "CynLr", url: "https://www.cynlr.com/", logo: "assets/portfolio-logos/061-cynlr.png", scale: 0.95, themes: ["Deep Tech"], industry: "Robotics & Autonomous Systems" },
  { name: "Piersight", url: "https://piersight.space/", logo: "assets/portfolio-logos/316-piersight.svg", scale: 0.869, themes: ["Deep Tech"], industry: "Space & Satellite (Space 2.0)" },
  { name: "Azooka", url: "https://azooka.life/", logo: "assets/portfolio-logos/310-azooka.png", scale: 1.237, themes: ["Deep Tech"], industry: "Life Sciences & Biotech" },
  { name: "Nopo", url: "https://www.noponano.com/", logo: "assets/portfolio-logos/311-nopo.png", scale: 1.727, themes: ["Deep Tech"], industry: "Advanced Materials" },
  { name: "Clean Electric", url: "https://www.cleanelectric.in/", logo: "assets/portfolio-logos/147-cleanelectric.png", scale: 1.624, themes: ["Deep Tech"], industry: "Climate Tech, Energy & Storage" },
  { name: "Proklean", url: "https://proviera.com/", logo: "assets/portfolio-logos/312-proklean.png", scale: 1.171, themes: ["Climate & Sustainability"], industry: "Advanced Materials" },
  { name: "Zouk", url: "https://zouk.co.in/", logo: "assets/portfolio-logos/205-zouk.png", scale: 1.191, themes: ["Consumer"], industry: "Consumer" },
  { name: "Banyan Nation", url: "https://www.banyannation.com/", logo: "assets/portfolio-logos/313-banyan.png", scale: 1.77, themes: ["Climate & Sustainability"], industry: "Circularity & Resources" },
];
