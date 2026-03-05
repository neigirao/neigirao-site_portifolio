import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSkillDetail, generateSlug } from '@/hooks/usePortfolioDetail';
import { useExperiences, useProjects } from '@/hooks/usePortfolioData';
import { useProjectsForSkill, useSeeAlso } from '@/hooks/useRelatedContent';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ArrowLeft, ChevronRight, Briefcase, FolderOpen } from 'lucide-react';
import SeeAlso from '@/components/SeeAlso';

// Skill descriptions for SEO
const skillDescriptions: Record<string, string> = {
  'Dynatrace': 'Expertise em Dynatrace para Application Performance Monitoring (APM), monitoramento de infraestrutura e análise de experiência digital. Implementação de dashboards, alertas e otimização de performance.',
  'Grafana': 'Domínio em Grafana para visualização de dados e criação de dashboards customizados. Integração com múltiplas fontes de dados para monitoramento unificado.',
  'Azure Monitor': 'Experiência em Azure Monitor para observabilidade completa na nuvem Microsoft. Configuração de alertas, diagnósticos e análise de logs.',
  'Google Analytics': 'Proficiência em Google Analytics para análise de comportamento de usuários, tracking de conversões e geração de insights para otimização de produtos digitais.',
  'Product Management': 'Gestão estratégica de produtos digitais com foco em resultados. Definição de roadmap, priorização de backlog e alinhamento com stakeholders.',
  'Agile/Scrum': 'Metodologias ágeis para gestão de projetos e equipes. Experiência como Product Owner e Scrum Master em times multidisciplinares.',
  'Data Analysis': 'Análise de dados para tomada de decisões baseadas em evidências. Criação de métricas, KPIs e cultura data-driven.',
};

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: skill, isLoading, error } = useSkillDetail(slug || '');
  const { experiences } = useExperiences();
  const { projects } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-24 w-24 rounded-2xl mb-6" />
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Habilidade não encontrada</h1>
            <p className="text-muted-foreground mb-6">
              A habilidade que você procura não existe ou foi removida.
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

  const canonicalSlug = skill.slug || generateSlug(skill.name);
  const description = skill.meta_description || skillDescriptions[skill.name] || 
    `Habilidade em ${skill.name} desenvolvida ao longo de +15 anos de experiência em produtos digitais e observabilidade.`;

  // Find related experiences that mention this skill
  const relatedExperiences = experiences.filter(exp => 
    exp.description.toLowerCase().includes(skill.name.toLowerCase())
  ).slice(0, 3);

  // Find related projects using the hook
  const relatedProjectsFromHook = useProjectsForSkill(skill?.name || '');

  // Also use existing filter for projects
  const relatedProjects = projects.filter(proj => 
    proj.tags?.some(tag => tag.toLowerCase().includes(skill.name.toLowerCase())) ||
    proj.description.toLowerCase().includes(skill.name.toLowerCase())
  ).slice(0, 3);

  // Combine for See Also section
  const seeAlsoItems = useSeeAlso([
    ...relatedExperiences.map(exp => ({
      id: exp.id,
      slug: exp.slug,
      title: exp.role,
      subtitle: `${exp.company} • ${exp.period}`,
      type: 'experience' as const
    })),
    ...relatedProjectsFromHook
  ], 5);

  return (
    <>
      <SEOHead
        title={skill.meta_title || `${skill.name} - Habilidades`}
        description={description}
        canonicalUrl={`${BASE_URL}/skill/${canonicalSlug}`}
        ogType="article"
        keywords={[
          skill.name,
          skill.category || 'habilidade',
          'expertise',
          'competência',
          'Nei Girão'
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${skill.name} - Expertise de Nei Girão`,
        "description": description,
        "url": `${BASE_URL}/skill/${canonicalSlug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "publisher": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "mainEntityOfPage": `${BASE_URL}/skill/${canonicalSlug}`,
        "datePublished": (skill as any).created_at || undefined,
        "dateModified": (skill as any).updated_at || undefined,
        "about": {
          "@type": "Thing",
          "name": skill.name,
          ...(skill.category ? { "additionalType": skill.category } : {})
        }
      }) }} />

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
              <Link to="/#skills" className="hover:text-white transition-colors">
                Habilidades
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{skill.name}</span>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/#skills')}
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-primary p-4 flex items-center justify-center shadow-glow">
                {skill.logo_url ? (
                  <OptimizedImage
                    src={skill.logo_url}
                    alt={`${skill.name} logo`}
                    className="w-16 h-16 object-contain bg-transparent"
                    priority
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {skill.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {skill.name}
                </h1>
                {skill.category && (
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    {skill.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Description */}
          <Card className="shadow-elegant border-2 border-border/50 mb-8">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-xl font-semibold mb-4">Sobre esta Habilidade</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {description}
              </p>
            </CardContent>
          </Card>

          {/* Related Experiences */}
          {relatedExperiences.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-teal-accent" />
                Experiências com {skill.name}
              </h2>
              <div className="grid gap-4">
                {relatedExperiences.map((exp) => (
                  <Link
                    key={exp.id}
                    to={`/experiencia/${exp.id}`}
                    className="block"
                  >
                    <Card className="hover:shadow-glow transition-all hover:border-teal-accent/30">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FolderOpen className="w-6 h-6 text-teal-accent" />
                Projetos Relacionados
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projeto/${proj.id}`}
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

          {/* See Also Section */}
          <SeeAlso items={seeAlsoItems} title="Veja Também" />

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Quer saber mais sobre minhas habilidades?
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
