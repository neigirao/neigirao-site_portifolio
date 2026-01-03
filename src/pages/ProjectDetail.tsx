import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjectDetail, useRelatedProjects, generateSlug } from '@/hooks/usePortfolioDetail';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ArrowLeft, ExternalLink, Tag, ChevronRight } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProjectDetail(slug || '');
  const { data: relatedProjects } = useRelatedProjects(
    project?.tags || null,
    project?.id || ''
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O projeto que você procura não existe ou foi removido.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canonicalSlug = project.slug || generateSlug(project.title);

  return (
    <>
      <SEOHead
        title={project.meta_title || project.title}
        description={project.meta_description || project.description.slice(0, 160)}
        canonicalUrl={`https://neigirao.lovable.app/projeto/${canonicalSlug}`}
        ogType="article"
        ogImage={project.image_url || undefined}
        keywords={[
          project.title,
          ...(project.tags || []),
          'projeto',
          'case',
          'Nei Girão'
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-gradient-hero pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <Link to="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/#projects" className="hover:text-white transition-colors">
                Projetos
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{project.title}</span>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/#projects')}
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Project Image */}
          {project.image_url && (
            <Card className="mb-8 overflow-hidden shadow-elegant">
              <OptimizedImage
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 md:h-96"
                priority
              />
            </Card>
          )}

          {/* Description */}
          <Card className="shadow-elegant border-2 border-border/50 mb-8">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-xl font-semibold mb-4">Sobre o Projeto</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.description}
              </p>

              {project.link && (
                <div className="mt-8 pt-6 border-t border-border">
                  <Button
                    onClick={() => window.open(project.link!, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Projeto
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Projects */}
          {relatedProjects && relatedProjects.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Projetos Relacionados</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projeto/${proj.slug || proj.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-glow transition-all hover:border-teal-accent/30">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-2">{proj.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {proj.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Quer saber mais sobre este ou outros projetos?
            </p>
            <Button onClick={() => navigate('/#contact')}>
              Entre em Contato
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
