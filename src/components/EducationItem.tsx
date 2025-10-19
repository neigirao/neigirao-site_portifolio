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
    <div className="relative pl-8 sm:pl-32 py-6 group">
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-border sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-teal-accent after:border-4 after:box-content after:border-card after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 mb-3 sm:mb-0 text-teal-accent bg-teal-accent/10 rounded-full border border-teal-accent/20">
          {education.period}
        </time>
        <div>
          <div className="text-xl font-bold text-foreground">
            {education.degree}
          </div>
          <div className="text-muted-foreground mt-1">
            {education.institution}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
