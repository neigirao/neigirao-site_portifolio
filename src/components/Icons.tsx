/**
 * Icons Library
 * 
 * Biblioteca centralizada de todos os ícones SVG usados no projeto.
 * Todos os ícones são componentes React que aceitam props padrão de SVG.
 * 
 * Para adicionar novo ícone:
 * 1. Copie o SVG desejado
 * 2. Crie uma nova função abaixo seguindo o padrão
 * 3. Exporte o componente
 * 4. Use em src/data/portfolio.ts
 * 
 * @example
 * ```tsx
 * import { NovoIcon } from './Icons';
 * <NovoIcon className="w-6 h-6 text-primary" />
 * ```
 */

import React from 'react';

/**
 * Props padrão para todos os ícones
 * Aceita todas as props de SVG HTML5
 */
type IconProps = React.SVGProps<SVGSVGElement>;

/* ============================================
   ÍCONES GERAIS
   ============================================ */

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

export const LaptopIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.9-1.45L4 16"></path>
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <line x1="9" y1="9" x2="15" y2="15"></line>
    <line x1="15" y1="9" x2="9" y2="15"></line>
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6M12 22V18M12 14a6 6 0 0 0-6-6 6 6 0 0 1 12 0 6 6 0 0 0-6 6Z"></path>
    <path d="M12 2v2"></path>
  </svg>
);

export const DonutChartIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeDasharray="31.4, 31.4" strokeDashoffset="0" transform="rotate(-90 12 12)" />
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  </svg>
);

export const BarChartIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12h3v8H3zM9 8h3v12H9zM15 4h3v16h-3z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PercentageIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor"/>
    <circle cx="14.5" cy="14.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const CertificateIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 19l-2 2-2-2m2-15v15m-4 0h8" />
    <path d="M15 2H9a2 2 0 00-2 2v13a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2z" />
  </svg>
);

export const EducationIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 10v6M2 10l10-7 10 7-10 7-10-7z" />
    <path d="M6 10.5v5.5l6 3.5 6-3.5V10.5" />
  </svg>
);

export const DynatraceIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 233 231">
    <g fillRule="nonzero" fill="none">
      <path d="M109.2.2l-32.5 20.6-1.5 21.4L108.6 22z" fill="#A5CD39"/>
      <path d="M109.2.2L142.6 22l-2.4 33.5-31-22.8z" fill="#464646"/>
      <path d="M123.6 230.8l32.5-20.6 1.5-21.4-33.4 23.3z" fill="#84BD00"/>
      <path d="M123.6 230.8l-33.4-23.3 2.4-33.5 31 22.8z" fill="#464646"/>
      <path d="M.4 106.1l20.6 32.5 21.4-1.5L22 103.7z" fill="#00ADEE"/>
      <path d="M.4 106.1L22 139.5l33.5-2.4L32.7 106z" fill="#464646"/>
      <path d="M232.4 124.9l-20.6-32.5-21.4 1.5 23.3 33.4z" fill="#702082"/>
      <path d="M232.4 124.9l-23.3-33.4-33.5 2.4 31.1 34z" fill="#464646"/>
      <path d="M111.7.2h10.5L102.1 57h-10.4z" fill="#A5CD39"/>
      <path d="M111.7.2l85.1 51.6-18.4 56.8-86.3-52.6z" fill="#A5CD39"/>
      <path d="M196.8 51.8h10.5l-56.9 18.4H139.9z" fill="#84BD00"/>
      <path d="M196.8 51.8l18.4 86.3-56.8 18.4-52.6-85.1z" fill="#84BD00"/>
      <path d="M121.1 230.8h-10.5l19.9-57h10.5z" fill="#702082"/>
      <path d="M121.1 230.8L36 179.2l18.4-56.8 86.4 52.6z" fill="#702082"/>
      <path d="M36 179.2H25.5l56.9-18.4h10.5z" fill="#00ADEE"/>
      <path d="M36 179.2L17.6 92.9l56.8-18.4 52.6 85.1z" fill="#00ADEE"/>
    </g>
  </svg>
);

export const GoogleAnalyticsIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="#F9AB00">
    <rect x="6" y="12" width="3" height="6" rx="1.5" />
    <rect x="11" y="8" width="3" height="10" rx="1.5" />
    <rect x="16" y="4" width="3" height="14" rx="1.5" />
  </svg>
);

export const AzureIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="#0089D6">
    <path d="M12 2L1 9l4 2.5V17l7 5 11-6.5V9l-5-3.5L12 2zM6.5 11.5L12 8l5.5 3.5-5.5 3.5L6.5 11.5z"/>
  </svg>
);

export const GrafanaIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 4.077A7.923 7.923 0 1012 20a7.923 7.923 0 000-15.923zM12 6.538a5.462 5.462 0 100 10.924 5.462 5.462 0 000-10.924z" fill="#F46800"/>
    <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" fill="#F46800"/>
    <path d="M12 9h3v6h-3V9z" fill="#FCF0E6"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const MailIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const GithubIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
