/**
 * PreviewModal Component
 * 
 * Modal para visualizar como o item aparecerá no site.
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ExperienceItem from '@/components/ExperienceItem';
import ProjectCard from '@/components/ProjectCard';
import { Card, CardContent } from '@/components/ui/card';

type PreviewType = 'experience' | 'project' | 'skill' | 'education';

interface PreviewData {
  // Experience fields
  company?: string;
  role?: string;
  period?: string;
  description?: string;
  // Project fields
  title?: string;
  link?: string;
  tags?: string[];
  // Skill fields
  name?: string;
  logo_url?: string;
  category?: string;
  // Education fields
  institution?: string;
  degree?: string;
}

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: PreviewType;
  data: PreviewData;
}

export function PreviewModal({ open, onOpenChange, type, data }: PreviewModalProps) {
  const renderPreview = () => {
    switch (type) {
      case 'experience':
        return (
          <div className="bg-background p-6 rounded-lg">
            <ExperienceItem
              experience={{
                period: data.period || 'Período',
                role: data.role || 'Cargo',
                company: data.company || 'Empresa',
                description: data.description || 'Descrição da experiência...',
              }}
            />
          </div>
        );

      case 'project':
        return (
          <div className="bg-background p-6 rounded-lg max-w-md mx-auto">
            <ProjectCard
              project={{
                title: data.title || 'Título do Projeto',
                description: data.description || 'Descrição do projeto...',
                link: data.link,
                tags: data.tags,
              }}
            />
          </div>
        );

      case 'skill':
        return (
          <div className="bg-background p-6 rounded-lg">
            <Card className="group hover:shadow-glow transition-all duration-300 bg-card border-border hover:border-teal-accent/30">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {data.logo_url && (
                  <div className="w-16 h-16 mb-4 rounded-lg bg-muted/30 p-3 group-hover:bg-teal-accent/10 transition-colors flex items-center justify-center">
                    <img
                      src={data.logo_url}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-foreground group-hover:text-teal-accent transition-colors">
                  {data.name || 'Nome da Skill'}
                </h3>
                {data.category && (
                  <p className="text-sm text-muted-foreground mt-1">{data.category}</p>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'education':
        return (
          <div className="bg-background p-6 rounded-lg">
            <Card className="hover:shadow-glow transition-all duration-300 border-border hover:border-teal-accent/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-teal-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {data.degree || 'Curso/Grau'}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {data.institution || 'Instituição'}
                    </p>
                    <p className="text-sm text-muted-foreground">{data.period || 'Período'}</p>
                    {data.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {data.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'experience': return 'Preview da Experiência';
      case 'project': return 'Preview do Projeto';
      case 'skill': return 'Preview da Skill';
      case 'education': return 'Preview da Educação';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 bg-muted/20 rounded-lg p-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
