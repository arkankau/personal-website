export interface StarData {
  x: number;
  y: number;
  name: string;
  magnitude: number;
  content: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export interface ConstellationData {
  id: string;
  name: string;
  category: string;
  color: string;
  stars: StarData[];
  connections: [number, number][];
}

export const constellations: ConstellationData[] = [
  {
    id: "orion",
    name: "Orion",
    category: "About Me",
    color: "195 100% 70%", // Cyan
    stars: [
      { x: 0.1, y: 0.1, name: "Betelgeuse", magnitude: 6, content: { title: "Introduction", subtitle: "Systems Engineering & CS Student at UPenn", description: "Hi! I'm Arkan, deeply curious about how technology and innovation can solve real-world challenges." } },
      { x: 0.22, y: 0.2, name: "Bellatrix", magnitude: 5, content: { title: "Software Engineering", subtitle: "Designing Software Systems", description: "Building robust, scalable software solutions using modern engineering principles." } },
      { x: 0.15, y: 0.3, name: "Alnitak", magnitude: 5, content: { title: "Business Consulting", subtitle: "Data-Driven Business Solutions", description: "Leveraging analytics and strategic thinking to drive business impact." } },
      { x: 0.18, y: 0.35, name: "Alnilam", magnitude: 5, content: { title: "Physics Research & Tutoring", subtitle: "Physics Olympiad Tutor/Researcher", description: "Teaching advanced physics and conducting research at Penn Engineering." } },
      { x: 0.2, y: 0.4, name: "Mintaka", magnitude: 4.5, content: { title: "Passions", subtitle: "Business, Sustainability & Education", description: "Passionate about business, sustainability, education, and energy engineering/consulting." } },
      { x: 0.3, y: 0.45, name: "Rigel", magnitude: 6, content: { title: "Philosophy", subtitle: "Data-Driven Innovation", description: "I believe in using data-driven insights and interdisciplinary collaboration to create meaningful impact." } },
      { x: 0.05, y: 0.42, name: "Saiph", magnitude: 4.5, content: { title: "Background", subtitle: "From Indonesia", description: "Originally from Indonesia, now studying at the University of Pennsylvania with a focus on AI and systems engineering." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 5] ],
  },
  {
    id: "ursa-major",
    name: "Ursa Major",
    category: "Projects",
    color: "280 70% 65%", // Purple
    stars: [
      { x: 0.8, y: 0.1, name: "Dubhe", magnitude: 6, content: { title: "MemARy", subtitle: "AR Memory Palace Application", description: "AR-based memory palace app using spatial computing to enhance learning and memory retention. Built for PennApps hackathon." } },
      { x: 0.9, y: 0.15, name: "Merak", magnitude: 5, content: { title: "Nuraga Origami Platform", subtitle: "Educational Content Management", description: "Digital platform for teaching origami and Japanese cultural arts, reaching students across Indonesia." } },
      { x: 0.95, y: 0.22, name: "Phecda", magnitude: 5, content: { title: "Constellation Portfolio", subtitle: "Interactive 3D Portfolio Website", description: "This interactive starfield portfolio using Canvas, React, and TypeScript with dynamic animations." } },
      { x: 0.98, y: 0.32, name: "Megrez", magnitude: 4.5, content: { title: "Energy Consulting Project", subtitle: "Sustainable Energy Analysis", description: "Consulting project analyzing renewable energy adoption strategies for Southeast Asian markets." } },
      { x: 0.94, y: 0.42, name: "Alioth", magnitude: 4.5, content: { title: "PPSN National Platform", subtitle: "Science Olympiad Community", description: "Built digital infrastructure for Indonesia's national science student organization serving 1000+ students." } },
      { x: 0.88, y: 0.48, name: "Mizar", magnitude: 4, content: { title: "Data Pipeline System", subtitle: "Education Analytics at Ruangguru", description: "Designed and implemented data engineering pipelines for Indonesia's largest edtech platform." } },
      { x: 0.78, y: 0.45, name: "Alkaid", magnitude: 4, content: { title: "Business Strategy Framework", subtitle: "Academic & Market Research", description: "Developed business expansion frameworks and market analysis tools during internship at Ruangguru." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6] ],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    category: "Experience",
    color: "45 100% 65%", // Gold
    stars: [
      { x: 0.7, y: 0.75, name: "Schedar", magnitude: 6, content: { title: "AI/ML Research Assistant", subtitle: "Penn Engineering - Penn Agentic Labs | 2025 - Current", description: "Conducting undergraduate research in artificial intelligence and machine learning at Penn's Agentic Labs." } },
      { x: 0.78, y: 0.7, name: "Caph", magnitude: 5, content: { title: "Honors Physics Tutor", subtitle: "UPenn - Weingarten Center | 2025 - Current", description: "Teaching honors-level physics courses and helping students master advanced physics concepts." } },
      { x: 0.85, y: 0.78, name: "Navi", magnitude: 6, content: { title: "Research Assistant", subtitle: "Wharton BEPP Department | 2025 - Current", description: "Undergraduate research in Business Economics and Public Policy at Wharton School." } },
      { x: 0.92, y: 0.7, name: "Ruchbah", magnitude: 5, content: { title: "Data Engineering Intern", subtitle: "Schoters by Ruangguru | 2025", description: "Built data pipelines and analytics infrastructure for Indonesia's leading education technology platform." } },
      { x: 1.0, y: 0.76, name: "Segin", magnitude: 5, content: { title: "Business Development Intern", subtitle: "Ruangguru | 2025", description: "Developed business and academic growth strategies for Southeast Asia's largest edtech company." } },
      { x: 0.65, y: 0.82, name: "Gamma Cas", magnitude: 4.5, content: { title: "Digital Strategy Intern", subtitle: "Endee Communications | 2024 - 2025", description: "Developed digital marketing strategies and campaigns for corporate communications." } },
      { x: 0.73, y: 0.68, name: "Delta Cas", magnitude: 4.5, content: { title: "Marketing Communications Intern", subtitle: "MNC Media | 2024 - Current", description: "Creating marketing communications strategies for Indonesia's largest media conglomerate." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6] ],
  },
  {
    id: "lyra",
    name: "Lyra",
    category: "Education & Contact",
    color: "340 80% 65%", // Pink
    stars: [
      { x: 0.1, y: 0.75, name: "Vega", magnitude: 6, content: { title: "University of Pennsylvania", subtitle: "BSE Computer Science & Economics | 2024 - Current", description: "Studying Systems Engineering with concentrations in Computer Science (AI) and Economics. Benjamin Franklin Scholar." } },
      { x: 0.15, y: 0.85, name: "Sheliak", magnitude: 5, content: { title: "Indonesia Maju Scholar", subtitle: "Fully-Funded Scholarship | 2024", description: "Recipient of Indonesia's prestigious Beasiswa Indonesia Maju (BIM) fully-funded college scholarship for outstanding students." } },
      { x: 0.05, y: 0.9, name: "Sulafat", magnitude: 5, content: { title: "SMAN 2 Tangerang Selatan", subtitle: "High School Diploma | 2021 - 2024", description: "Graduated with honors, active in science olympiads and student leadership." } },
      { x: 0.22, y: 0.82, name: "Delta Lyrae", magnitude: 4.5, content: { title: "ITB Summer Program", subtitle: "Electrical Engineering | Summer 2023", description: "Intensive summer program in Electrical Engineering at STEI Institut Teknologi Bandung." } },
      { x: 0.18, y: 0.95, name: "Epsilon Lyr", magnitude: 4, content: { title: "Email", subtitle: "arkankau@seas.upenn.edu", description: "Best way to reach me for professional inquiries or collaborations." } },
      { x: 0.25, y: 0.88, name: "Zeta Lyr", magnitude: 4, content: { title: "LinkedIn", subtitle: "linkedin.com/in/arkankau", description: "Connect with me professionally and see my career journey!" } },
      { x: 0.12, y: 0.68, name: "Eta Lyr", magnitude: 4, content: { title: "Phone", subtitle: "+1 (267) 864-9929 | +62 811-979-8100", description: "Available via WhatsApp for quick communication." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 4], [0, 3], [3, 5], [5, 6], [6, 0] ],
  },
  {
    id: "cygnus",
    name: "Cygnus",
    category: "Organizations",
    color: "120 70% 65%", // Green
    stars: [
      { x: 0.5, y: 0.35, name: "Deneb", magnitude: 6, content: { title: "Energy Consultant", subtitle: "Wharton Undergraduate Energy Group | 2025 - Current", description: "Consulting on energy sector projects and sustainable business solutions at Wharton's premier energy organization." } },
      { x: 0.5, y: 0.5, name: "Sadr", magnitude: 6, content: { title: "Project Leader", subtitle: "Wharton South East Asian Consulting | 2024 - Current", description: "Leading consulting projects focused on Southeast Asian markets and business development." } },
      { x: 0.5, y: 0.7, name: "Albireo", magnitude: 6, content: { title: "President", subtitle: "Penncasila (Penn Indonesian Students) | 2024 - Current", description: "Leading Penn's Indonesian student community, organizing cultural events and supporting Indonesian students." } },
      { x: 0.38, y: 0.5, name: "Delta Cygni", magnitude: 5, content: { title: "Co-Founder & Co-Head Executive", subtitle: "Nuraga Origami | 2023 - Current", description: "Founded and leading an organization promoting origami art and Japanese culture education." } },
      { x: 0.62, y: 0.5, name: "Gienah", magnitude: 5, content: { title: "Academic Tutor", subtitle: "West Philadelphia Tutoring Project | 2025", description: "Volunteering to provide free academic tutoring to underserved students in West Philadelphia." } },
      { x: 0.44, y: 0.63, name: "Epsilon Cyg", magnitude: 4.5, content: { title: "Consultant", subtitle: "Wharton Asia Consulting | 2024 - 2025", description: "Provided strategic consulting for businesses expanding into Asian markets." } },
      { x: 0.56, y: 0.63, name: "Zeta Cyg", magnitude: 4.5, content: { title: "Social Committee", subtitle: "Association of International Students | 2024 - 2025", description: "Organized social events and built community for international students at Penn." } },
      { x: 0.5, y: 0.42, name: "Eta Cyg", magnitude: 5, content: { title: "President", subtitle: "Indonesian National Science Students (PPSN) | 2022 - 2024", description: "Led Indonesia's national organization for science olympiad students and STEM education advocacy." } },
    ],
    connections: [ [0, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [0, 7], [7, 1] ],
  },
];