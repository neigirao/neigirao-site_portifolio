/**
 * See Also Component
 * 
 * Displays related content links for internal linking between
 * experiences, skills, and projects for better SEO.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { ChevronRight, Briefcase, Lightbulb, FolderOpen } from 'lucide-react';

interface SeeAlsoItem {
  id: string;
  slug?: string | null;
  title: string;
  subtitle?: string;
  type: 'experience' | 'skill' | 'project';
}

interface SeeAlsoProps {
  items: SeeAlsoItem[];
  title?: string;
}

const typeConfig = {
  experience: {
    icon: Briefcase,
    path: '/experiencia',
    label: 'Experiência'
  },
  skill: {
    icon: Lightbulb,
    path: '/skill',
    label: 'Habilidade'
  },
  project: {
    icon: FolderOpen,
    path: '/projeto',
    label: 'Projeto'
  }
};

const SeeAlso: React.FC<SeeAlsoProps> = ({ items, title = 'Veja Também' }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="see-also-heading">
      <h2 id="see-also-heading" className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-teal-accent">→</span>
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const url = `${config.path}/${item.slug || item.id}`;

          return (
            <Link key={`${item.type}-${item.id}`} to={url} className="block group">
              <Card className="hover:shadow-glow transition-all hover:border-teal-accent/30 hover:-translate-x-1">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-teal-accent/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-teal-accent transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {config.label}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-teal-accent transition-colors truncate">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SeeAlso;
