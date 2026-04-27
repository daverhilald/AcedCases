export type DeckCategory = "college" | "corporate";
export type DeckTopic = "strategy" | "marketing" | "finance" | "operations" | "analytics";

export interface TeamMember {
  name: string;
  linkedin: string;
}

export interface Deck {
  id: string;
  title: string;
  team: string;
  college: string;
  competition: string;
  year: string;
  category: DeckCategory;
  topics: DeckTopic[];
  tags: string[];
  thumbnail: string;
  description: string;
  members: TeamMember[];
  pdfUrl: string;
}

export const decksData: Deck[] = [
  {
    id: "deck1",
    title: "Market Entry Strategy — RetailTech Case",
    team: "Team Alpha",
    college: "IIM Ahmedabad",
    competition: "McKinsey Case Competition 2024",
    year: "2024",
    category: "college",
    topics: ["marketing", "strategy"],
    tags: ["Marketing", "Retail", "College"],
    thumbnail: "Strategy",
    description:
      "A comprehensive market entry strategy for a RetailTech startup looking to disrupt the traditional retail space. The deck showcases thorough market analysis, competitive positioning, and a phased go-to-market approach that impressed the judges.",
    members: [
      { name: "Rahul Sharma", linkedin: "https://linkedin.com/in/rahulsharma" },
      { name: "Priya Patel", linkedin: "https://linkedin.com/in/priyapatel" },
      { name: "Amit Kumar", linkedin: "https://linkedin.com/in/amitkumar" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck2",
    title: "Investment Portfolio Optimization",
    team: "Team Quantum",
    college: "ISB",
    competition: "Goldman Sachs Challenge 2024",
    year: "2024",
    category: "corporate",
    topics: ["finance", "analytics"],
    tags: ["Finance", "Analytics", "Corporate"],
    thumbnail: "Finance",
    description:
      "An innovative approach to portfolio optimization using modern risk management techniques and quantitative analysis. The team demonstrated exceptional financial modeling skills and strategic thinking.",
    members: [
      { name: "Sneha Reddy", linkedin: "https://linkedin.com/in/snehareddy" },
      { name: "Karthik Menon", linkedin: "https://linkedin.com/in/karthikmenon" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck3",
    title: "Supply Chain Digital Transformation",
    team: "Team Phoenix",
    college: "XLRI",
    competition: "BCG Operations Excellence 2023",
    year: "2023",
    category: "college",
    topics: ["operations", "analytics"],
    tags: ["Operations", "Digital", "College"],
    thumbnail: "Operations",
    description:
      "A blueprint for digital transformation in supply chain management, featuring cutting-edge technology integration and process optimization strategies that delivered measurable ROI.",
    members: [
      { name: "Anjali Singh", linkedin: "https://linkedin.com/in/anjalisingh" },
      { name: "Rohan Desai", linkedin: "https://linkedin.com/in/rohandesai" },
      { name: "Meera Kapoor", linkedin: "https://linkedin.com/in/meerakapoor" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck4",
    title: "Customer Retention Analytics Framework",
    team: "Team Velocity",
    college: "IIM Bangalore",
    competition: "Bain Capability Challenge 2024",
    year: "2024",
    category: "corporate",
    topics: ["marketing", "analytics"],
    tags: ["Marketing", "Analytics", "Corporate"],
    thumbnail: "Marketing",
    description:
      "A data-driven retention framework that combined behavioral analytics with predictive modeling to identify at-risk customers and design targeted interventions.",
    members: [
      { name: "Ishaan Verma", linkedin: "https://linkedin.com/in/ishaanverma" },
      { name: "Tara Iyer", linkedin: "https://linkedin.com/in/taraiyer" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck5",
    title: "Sustainable Energy Transition Strategy",
    team: "Team Horizon",
    college: "SPJIMR",
    competition: "Shell Business Case Competition 2023",
    year: "2023",
    category: "corporate",
    topics: ["strategy", "operations"],
    tags: ["Strategy", "Sustainability", "Corporate"],
    thumbnail: "Strategy",
    description:
      "An ambitious roadmap for transitioning a legacy energy business toward renewable sources, balancing profitability with credible decarbonization milestones.",
    members: [
      { name: "Aditya Rao", linkedin: "https://linkedin.com/in/adityarao" },
      { name: "Nikita Joshi", linkedin: "https://linkedin.com/in/nikitajoshi" },
      { name: "Vikram Shah", linkedin: "https://linkedin.com/in/vikramshah" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck6",
    title: "FinTech Growth Strategy for Emerging Markets",
    team: "Team Nexus",
    college: "FMS Delhi",
    competition: "HSBC International Case Competition 2024",
    year: "2024",
    category: "college",
    topics: ["finance", "strategy"],
    tags: ["Finance", "Strategy", "College"],
    thumbnail: "Finance",
    description:
      "A pragmatic, segment-by-segment growth playbook for a FinTech expanding across South Asia, balancing regulatory complexity with rapid product iteration.",
    members: [
      { name: "Devika Nair", linkedin: "https://linkedin.com/in/devikanair" },
      { name: "Arjun Bhatia", linkedin: "https://linkedin.com/in/arjunbhatia" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck7",
    title: "Omnichannel Retail Transformation",
    team: "Team Catalyst",
    college: "MDI Gurgaon",
    competition: "Deloitte TechnoUtsav 2023",
    year: "2023",
    category: "college",
    topics: ["marketing", "operations"],
    tags: ["Marketing", "Retail", "College"],
    thumbnail: "Marketing",
    description:
      "A blueprint for unifying online and offline retail experiences, with a phased technology roadmap and a customer journey redesign at the core.",
    members: [
      { name: "Riya Mehta", linkedin: "https://linkedin.com/in/riyamehta" },
      { name: "Sahil Kapoor", linkedin: "https://linkedin.com/in/sahilkapoor" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck8",
    title: "AI-Driven Risk Management Model",
    team: "Team Apex",
    college: "IIM Calcutta",
    competition: "JPMorgan Chase Innovation Challenge 2024",
    year: "2024",
    category: "corporate",
    topics: ["finance", "analytics"],
    tags: ["Finance", "Analytics", "Corporate"],
    thumbnail: "Analytics",
    description:
      "A machine-learning approach to credit risk that improved precision over a baseline scorecard while remaining explainable to regulators.",
    members: [
      { name: "Karan Malhotra", linkedin: "https://linkedin.com/in/karanmalhotra" },
      { name: "Pooja Krishnan", linkedin: "https://linkedin.com/in/poojakrishnan" },
      { name: "Yash Agarwal", linkedin: "https://linkedin.com/in/yashagarwal" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck9",
    title: "Manufacturing Process Optimization",
    team: "Team Prime",
    college: "NITIE Mumbai",
    competition: "Mahindra War Room 2022",
    year: "2022",
    category: "college",
    topics: ["operations", "analytics"],
    tags: ["Operations", "Manufacturing", "College"],
    thumbnail: "Operations",
    description:
      "A lean operations overhaul focused on bottleneck identification, predictive maintenance, and shop-floor analytics to lift OEE.",
    members: [
      { name: "Harsh Pandey", linkedin: "https://linkedin.com/in/harshpandey" },
      { name: "Ananya Bose", linkedin: "https://linkedin.com/in/ananyabose" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
  {
    id: "deck10",
    title: "Brand Revitalization Strategy",
    team: "Team Innovate",
    college: "IIFT Delhi",
    competition: "Unilever Future Leaders League 2023",
    year: "2023",
    category: "corporate",
    topics: ["marketing", "strategy"],
    tags: ["Marketing", "Strategy", "Corporate"],
    thumbnail: "Marketing",
    description:
      "A narrative-led brand refresh that repositioned a heritage FMCG brand for younger consumers while protecting its loyal core.",
    members: [
      { name: "Saanvi Gupta", linkedin: "https://linkedin.com/in/saanvigupta" },
      { name: "Manav Khanna", linkedin: "https://linkedin.com/in/manavkhanna" },
      { name: "Tanvi Sethi", linkedin: "https://linkedin.com/in/tanvisethi" },
    ],
    pdfUrl: "/sample-deck.pdf",
  },
];

export const getDeckById = (id: string): Deck | undefined =>
  decksData.find((d) => d.id === id);
