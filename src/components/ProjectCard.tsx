/**
 * Project Card Component
 * 
 * Card para exibir projeto individual com link opcional.
 */

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    title: string;
    company: string;
    description: string;
    link?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-card border-border h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
            {project.title}
          </h3>
          {project.link && (
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0 ml-2" />
          )}
        </div>
        <div className="text-sm text-teal-accent font-medium mb-3">
          {project.company}
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>
        {project.link && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-auto"
            onClick={() => window.open(project.link, "_blank")}
          >
            Ver Projeto
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
