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
      { x: 0.1, y: 0.1, name: "Betelgeuse", magnitude: 6, content: { title: "Philosophy", subtitle: "Problem Solver", description: "I approach challenges with curiosity and systematic thinking." } },
      { x: 0.22, y: 0.2, name: "Bellatrix", magnitude: 4.5, content: { title: "Skills", subtitle: "Full-Stack Developer", description: "Expert in React, TypeScript, Node.js, and modern web technologies." } },
      { x: 0.15, y: 0.3, name: "Alnitak", magnitude: 4.5, content: { title: "Background", subtitle: "Computer Science", description: "Graduated with honors in Computer Science." } },
      { x: 0.18, y: 0.35, name: "Alnilam", magnitude: 4.5, content: { title: "Passion", subtitle: "Creative Coding", description: "I love blending creativity with code to build interactive experiences." } },
      { x: 0.2, y: 0.4, name: "Mintaka", magnitude: 4.5, content: { title: "Approach", subtitle: "User-Centered Design", description: "Every decision I make puts the user first." } },
      { x: 0.3, y: 0.45, name: "Rigel", magnitude: 6, content: { title: "Vision", subtitle: "Building the Future", description: "I believe in using technology to solve real-world problems." } },
      { x: 0.05, y: 0.42, name: "Saiph", magnitude: 4.5, content: { title: "Values", subtitle: "Clean Code Advocate", description: "I write maintainable, well-documented code." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 5] ],
  },
  {
    id: "ursa-major",
    name: "Ursa Major",
    category: "Projects",
    color: "280 70% 65%", // Purple
    stars: [
      { x: 0.8, y: 0.1, name: "Dubhe", magnitude: 5, content: { title: "E-Commerce Platform", subtitle: "React + Stripe Integration", description: "Built a full-featured online store with payment processing and real-time analytics." } },
      { x: 0.9, y: 0.15, name: "Merak", magnitude: 5, content: { title: "Social Media Dashboard", subtitle: "Analytics & Visualization", description: "Created a comprehensive dashboard for social media management." } },
      { x: 0.95, y: 0.22, name: "Phecda", magnitude: 4.5, content: { title: "Task Management App", subtitle: "Collaborative Productivity", description: "Developed a Trello-like application with real-time collaboration." } },
      { x: 0.98, y: 0.32, name: "Megrez", magnitude: 4.5, content: { title: "Weather Forecasting", subtitle: "API Integration & Maps", description: "Interactive weather application with detailed forecasts and radar maps." } },
      { x: 0.94, y: 0.42, name: "Alioth", magnitude: 5, content: { title: "Portfolio Generator", subtitle: "No-Code Builder", description: "Open-source tool that lets developers create beautiful portfolios without writing code." } },
      { x: 0.88, y: 0.48, name: "Mizar", magnitude: 4.5, content: { title: "Chat Application", subtitle: "Real-Time Messaging", description: "Built a WebSocket-based chat app with end-to-end encryption." } },
      { x: 0.78, y: 0.45, name: "Alkaid", magnitude: 5, content: { title: "Code Editor", subtitle: "Browser-Based IDE", description: "Created a lightweight code editor with syntax highlighting and live preview." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6] ],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    category: "Experience",
    color: "45 100% 65%", // Gold
    stars: [
      { x: 0.7, y: 0.75, name: "Schedar", magnitude: 5, content: { title: "Senior Full-Stack Developer", subtitle: "Tech Innovations Inc. | 2022 - Present", description: "Leading a team of 5 developers and architecting cloud-native applications." } },
      { x: 0.78, y: 0.7, name: "Caph", magnitude: 4.5, content: { title: "Full-Stack Developer", subtitle: "Digital Solutions Co. | 2020 - 2022", description: "Developed and maintained 10+ client projects, improving performance by 60%." } },
      { x: 0.85, y: 0.78, name: "Navi", magnitude: 5, content: { title: "Frontend Developer", subtitle: "Creative Labs | 2019 - 2020", description: "Created responsive web applications and interactive UI components." } },
      { x: 0.92, y: 0.7, name: "Ruchbah", magnitude: 4.5, content: { title: "Junior Developer", subtitle: "StartUp Ventures | 2018 - 2019", description: "Built RESTful APIs and developed frontend features in an agile environment." } },
      { x: 1.0, y: 0.76, name: "Segin", magnitude: 4.5, content: { title: "Intern Developer", subtitle: "Software Corp | Summer 2017", description: "Assisted in bug fixes and feature development." } },
    ],
    connections: [ [0, 1], [1, 2], [2, 3], [3, 4] ],
  },
  {
    id: "lyra",
    name: "Lyra",
    category: "Contact & Skills",
    color: "340 80% 65%", // Pink
    stars: [
      { x: 0.1, y: 0.75, name: "Vega", magnitude: 6, content: { title: "Email", subtitle: "your.email@example.com", description: "Best way to reach me for professional inquiries or collaborations." } },
      { x: 0.15, y: 0.85, name: "Sheliak", magnitude: 4, content: { title: "GitHub", subtitle: "github.com/yourprofile", description: "Check out my open-source projects, contributions, and code samples." } },
      { x: 0.05, y: 0.9, name: "Sulafat", magnitude: 4, content: { title: "LinkedIn", subtitle: "linkedin.com/in/yourprofile", description: "Let's connect professionally!" } },
      { x: 0.22, y: 0.82, name: "Delta Lyrae", magnitude: 3.5, content: { title: "Technologies", subtitle: "Tech Stack", description: "React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, and more." } },
    ],
    connections: [ [0, 1], [1, 2], [0, 3], [3, 1] ],
  },
  {
    id: "cygnus",
    name: "Cygnus",
    category: "Organizations",
    color: "120 70% 65%", // Green
    stars: [
      { x: 0.5, y: 0.35, name: "Deneb", magnitude: 5, content: { title: "Tech Community Leader", subtitle: "Local Developer Meetup", description: "Organizing monthly meetups and workshops for 200+ members." } },
      { x: 0.5, y: 0.5, name: "Sadr", magnitude: 4.5, content: { title: "Open Source Contributor", subtitle: "GitHub Community", description: "Active contributor to popular open-source projects, including React and D3." } },
      { x: 0.5, y: 0.7, name: "Albireo", magnitude: 4.5, content: { title: "Volunteer Coding Instructor", subtitle: "Code for Good", description: "Teaching programming to underprivileged youth and mentoring aspiring developers." } },
      { x: 0.38, y: 0.5, name: "Delta Cygni", magnitude: 4, content: { title: "Tech Conference Speaker", subtitle: "International Events", description: "Delivered talks at major tech conferences on modern web architecture." } },
      { x: 0.62, y: 0.5, name: "Gienah", magnitude: 4, content: { title: "Hackathon Organizer", subtitle: "Innovation Events", description: "Co-organizing annual hackathons that bring together 500+ developers." } },
    ],
    connections: [ [0, 1], [1, 2], [1, 3], [1, 4] ],
  },
];