/**
 * Type Definitions
 * 
 * Este arquivo contém todas as definições de tipos TypeScript
 * usadas no projeto. Centralize aqui novos tipos para manter
 * consistência e facilitar manutenção.
 */

/**
 * Representa uma experiência profissional
 * 
 * @interface Experience
 * @property {string} period - Período da experiência (ex: "2023-Presente", "2021-2023")
 * @property {string} role - Cargo/função exercida
 * @property {string} company - Nome da empresa
 * @property {string[]} description - Lista de responsabilidades/conquistas
 */
export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string[];
}

/**
 * Representa uma habilidade técnica
 * 
 * @interface Skill
 * @property {string} name - Nome da habilidade
 * @property {React.ComponentType} icon - Componente de ícone SVG
 * @property {string} [color] - Cor customizada (opcional)
 */
export interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  color?: string;
}

/**
 * Representa formação educacional
 * 
 * @interface Education
 * @property {string} period - Período do curso
 * @property {string} degree - Título/grau obtido
 * @property {string} institution - Nome da instituição
 * @property {string} [description] - Descrição adicional (opcional)
 */
export interface Education {
  period: string;
  degree: string;
  institution: string;
  description?: string;
}
