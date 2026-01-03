/**
 * Project Card Component
 * 
 * Card para exibir projeto individual com link para página de detalhes.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id?: string;
    slug?: string | null;
    title: string;
    company?: string;
    description: string;
    link?: string | null;
    tags?: string[] | null;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const detailUrl = project.id 
    ? `/projeto/${project.slug || project.id}` 
    : null;

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border hover:border-teal-accent/30 h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-teal-accent transition-colors leading-tight">
            {project.title}
          </h3>
          {project.link && (
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-teal-accent transition-all flex-shrink-0 ml-3 group-hover:scale-110 group-hover:rotate-12" />
          )}
        </div>
        {(project.company || (project.tags && project.tags.length > 0)) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.company && (
              <span className="text-sm text-teal-accent font-semibold bg-teal-accent/10 px-3 py-1 rounded-full border border-teal-accent/20">
                {project.company}
              </span>
            )}
            {project.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-base line-clamp-3">
          {project.description}
        </p>
        <div className="flex gap-2 mt-auto">
          {detailUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:bg-muted transition-all"
              asChild
            >
              <Link to={detailUrl}>
                Ver Detalhes
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
          {project.link && (
            <Button
              variant="outline"
              size="sm"
              className="group-hover:bg-teal-accent/10 group-hover:border-teal-accent group-hover:text-teal-accent transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.link!, "_blank");
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
