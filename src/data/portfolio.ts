/**
 * Portfolio Data
 * 
 * ⚠️ ARQUIVO PRINCIPAL PARA EDITAR CONTEÚDO DO PORTFOLIO ⚠️
 * 
 * Este arquivo contém todos os dados exibidos no portfolio.
 * Para atualizar experiências, habilidades ou qualquer conteúdo,
 * modifique os arrays abaixo.
 * 
 * IMPORTANTE:
 * - Adicione novas experiências no TOPO do array (mais recente primeiro)
 * - Certifique-se que todos os ícones usados estão importados
 * - Use tipos TypeScript corretos (veja src/types/index.ts)
 */

import type { Experience, Skill } from '../types';

export interface Project {
  title: string;
  company: string;
  description: string;
  link?: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
}
import {
  AzureIcon,
  LaptopIcon,
  BarChartIcon,
  DonutChartIcon,
  PercentageIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from '../components/Icons';

import dynatraceLogo from '../assets/dynatrace-logo.svg';
import grafanaLogo from '../assets/grafana-logo.svg';
import googleAnalyticsLogo from '../assets/google-analytics-logo.svg';

/**
 * Experiências Profissionais
 * 
 * Array de experiências profissionais exibidas na seção "Experience".
 * Adicione novas experiências no INÍCIO do array (mais recente primeiro).
 */
export const experiences: Experience[] = [
  {
    period: "2024-Presente",
    role: "Product Manager (PM) | Observabilidade, Release e Delivery",
    company: "Icatu Seguros",
    description: [
      "Lidero equipes de Produtos Digitais e Observabilidade de TI, entregando 6 produtos digitais de alta qualidade",
      "Desenvolvi estratégias de observabilidade com Dynatrace e Grafana, reduzindo incidentes críticos",
      "Implementei dashboards de monitoramento proativo em tempo real",
      "Gerencio equipe de 12 pessoas e coordeno squads com 35 membros, promovendo cultura ágil"
    ]
  },
  {
    period: "2021-2024",
    role: "Product Manager - Coordenador de Produtos Digitais - Ecommerce",
    company: "Icatu Seguros",
    description: [
      "Liderei equipes de Produtos Digitais e Observabilidade, contribuindo para 7 produtos digitais",
      "Criei e operei Ecommerce para Seguro de Vida e Previdência Privada, aumentando conversão em 15%",
      "Apliquei metodologias ágeis (Scrum) para reduzir time-to-market",
      "Gerenciei equipe de 5 membros e coordenei 2 squads com 17 membros"
    ]
  },
  {
    period: "2020-2021",
    role: "Gerente de Transformação Digital - Product Manager",
    company: "Oi",
    description: [
      "Liderei digitalização da experiência de atendimento, melhorando satisfação em 10%",
      "Otimizei canais de atendimento (Minha Oi APP, Joice, WhatsApp), reduzindo custos em 40%",
      "Gerenciei atendimento em mídias sociais, reduzindo tempo de resposta",
      "Gerenciei equipe de 6 membros com práticas ágeis"
    ]
  },
  {
    period: "2019-2020",
    role: "Gerente de Atendimento Digital via Chat - Product Manager",
    company: "Oi",
    description: [
      "Gerenciei atendimento ao cliente por chat digital usando Live Person e Plusoft",
      "Implementei estratégias que aumentaram satisfação do cliente e reduziram custos",
      "Supervisionei equipe de 6 colaboradores com metodologias ágeis"
    ]
  },
  {
    period: "2017-2019",
    role: "Product Owner (PO) - Especialista em Performance Digital",
    company: "TIM Brasil",
    description: [
      "Liderei equipe de Performance Digital, melhorando nota do APP de 1,5 para 4,5",
      "Implementei melhorias no Meu TIM que aumentaram retenção de usuários",
      "Gerenciei projetos com metodologia ágil (Scrum/Kanban)"
    ]
  },
  {
    period: "2016-2017",
    role: "Product Owner (PO)",
    company: "Globo.com",
    description: [
      "Conduzi roadmap de integração Globo.com com Globoesporte.com",
      "Gerenciei operações reduzindo tempo de carregamento de páginas",
      "Coordenei transmissões ao vivo de eventos esportivos"
    ]
  },
  {
    period: "2009-2016",
    role: "Product Owner (PO)",
    company: "Oi",
    description: [
      "Mapeei KPIs de negócios para estratégia de precision marketing com Adobe SiteCatalyst, Ensighten e Responsys",
      "Implementei nova plataforma de Web Analytics com dashboards executivos e operacionais para maior precisão",
      "Criei áreas de mídias no Portal Minha Oi, aumentando wallet share através de gerenciamento de mídias",
      "Gerenciei mídias de performance (Links Patrocinados) e produto Recarga nos canais digitais",
      "P.O dos canais digitais de Selfcare, focando em rentabilização através de canais digitais"
    ]
  }
];

/**
 * Habilidades Técnicas
 */
export const skills: Skill[] = [
  { name: "Dynatrace", icon: dynatraceLogo },
  { name: "Grafana", icon: grafanaLogo },
  { name: "Azure Monitor", icon: AzureIcon },
  { name: "Google Analytics", icon: googleAnalyticsLogo },
  { name: "Product Management", icon: BriefcaseIcon },
  { name: "Observabilidade", icon: BarChartIcon },
  { name: "Agile/Scrum", icon: LaptopIcon },
  { name: "Data Analysis", icon: DonutChartIcon },
  { name: "Digital Products", icon: LightbulbIcon },
  { name: "Strategy", icon: PercentageIcon },
];

/**
 * Formação Acadêmica
 */
export const education: Education[] = [
  {
    period: "2011-2013",
    degree: "MBA em Marketing Digital",
    institution: "Instituto Infnet"
  },
  {
    period: "2006-2010",
    degree: "Bacharelado em Sistema de Informação",
    institution: "Universidade Estácio de Sá"
  },
  {
    period: "2002-2005",
    degree: "Técnico em Eletrônica e Telecomunicações",
    institution: "Escola Técnica Resende Rammel"
  }
];

/**
 * Principais Projetos
 */
export const projects: Project[] = [
  {
    title: "Ecommerce Seguro de Vida",
    company: "Icatu Seguros",
    description: "Criação e operação de plataforma de ecommerce para seguro de vida, aumentando taxa de conversão em 15%",
    link: "http://bit.ly/3Mjg0d9"
  },
  {
    title: "Ecommerce Previdência Privada",
    company: "Icatu Seguros",
    description: "Desenvolvimento de plataforma digital para venda de previdência privada online",
    link: "http://bit.ly/3EqhjFf"
  },
  {
    title: "Minha Oi APP",
    company: "Oi",
    description: "Otimização e gestão do aplicativo de autoatendimento, melhorando experiência do usuário",
    link: "https://www.oi.com.br/minha-oi/app-minha-oi/"
  },
  {
    title: "Joice - Assistente Virtual",
    company: "Oi",
    description: "Implementação de assistente virtual para atendimento automatizado",
    link: "https://www.oi.com.br/assistentevirtual/"
  },
  {
    title: "Meu TIM APP",
    company: "TIM Brasil",
    description: "Melhoria de performance e experiência do usuário, elevando nota de 1,5 para 4,5",
    link: "https://www.tim.com.br/para-voce/atendimento/fale-conosco/meu-tim---auto-atendimento-tim/aplicativo-meu-tim"
  },
  {
    title: "Globoesporte.com Analytics",
    company: "Globo.com",
    description: "Análise de dados e otimização de conteúdo usando Google Analytics, aumentando interação"
  }
];
