/**
 * Education Item Component
 * 
 * Renderiza um item de formação acadêmica em formato de timeline.
 */

import React from 'react';

interface EducationItemProps {
  education: {
    period: string;
    degree: string;
    institution: string;
  };
}

const EducationItem: React.FC<EducationItemProps> = ({ education }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-8 group hover:bg-muted/20 rounded-lg transition-all duration-300 -mx-4 px-4">
      <div className="flex flex-col sm:flex-row items-start mb-2 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-border sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-teal-accent after:border-4 after:box-content after:border-card after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 group-hover:after:scale-125 after:transition-transform after:duration-300 after:shadow-glow">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-28 h-7 mb-4 sm:mb-0 text-teal-accent bg-teal-accent/10 rounded-full border-2 border-teal-accent/30 group-hover:border-teal-accent/50 transition-colors">
          {education.period}
        </time>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-teal-accent transition-colors leading-tight">
            {education.degree}
          </h3>
          <div className="text-lg text-muted-foreground font-semibold">
            {education.institution}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
