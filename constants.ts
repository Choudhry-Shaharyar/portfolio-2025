import { ExperienceItem, ProjectItem, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Shaharyar Choudhry",
  title: "Software Engineer",
  contact: {
    phone: "647-667-7804",
    email: "shaharyar.choudhry7@gmail.com",
    linkedin: "linkedin.com/in/shaharyar-choudhry",
    portfolio: "shaharyarchoudhry.me"
  },
  education: {
    degree: "Bachelor of Engineering, Spec. Hons. Software Engineering",
    school: "York University",
    period: "2020–2024"
  }
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'abb',
    role: "Software Engineer",
    company: "ABB",
    period: "May 2024 – Present",
    details: [
      "Developed RESTful Web API using C#/.NET with CI/CD pipelines (Docker, Kubernetes).",
      "Automated SQL-based cost calculations reducing inquiries by 95%.",
      "Built BOM comparison feature reducing manufacturing discrepancies by 30%.",
      "Migrated data provider to C#, improving performance by 5%.",
      "Managed SKM Power Tools and Level Selector licenses for 75+ users.",
      "Fixed bugs in Data Loader Tool exceeding release deadlines."
    ]
  },
  {
    id: 'td',
    role: "Software Engineer Intern",
    company: "TD Bank",
    period: "2022–2023",
    details: [
      "Migrated Interest Allocation System to Java 17 & Spring Boot 3.0.",
      "Developed React frontend for ETL testing reducing time by 85%.",
      "Implemented SQL stored procedures and Node.js APIs.",
      "Performed Veracode scans ensuring 0 defects.",
      "Built POC for vulnerability remediation."
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'sentiment',
    title: "App Review Sentiment Analysis",
    tech: "Python, ML"
  },
  {
    id: 'ridgeway',
    title: "Ridgeway Plaza Directory",
    tech: "React.js, SEO"
  },
  {
    id: 'york',
    title: "York Financial Wise Website",
    tech: "React.js, Node.js"
  },
  {
    id: 'auction',
    title: "Online Auction System",
    tech: "Spring Boot, React.js, Docker, Azure"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Java", "C#", "JavaScript", "SQL", "Python", "HTML", "CSS", "C++", "Bash"]
  },
  {
    category: "Frameworks & Tools",
    items: ["React.js", "Node.js", "Express.js", "Spring Boot", "Docker", "Kubernetes", "Git", "Azure DevOps"]
  },
  {
    category: "Certifications",
    items: ["MLOps with Azure ML", "React.js", "Jira Fundamentals"]
  }
];