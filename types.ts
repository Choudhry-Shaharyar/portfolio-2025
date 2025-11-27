export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tech: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export type SectionType = 'home' | 'experience' | 'projects' | 'skills' | 'contact';