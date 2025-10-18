export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string[];
}

export interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  description?: string;
}
