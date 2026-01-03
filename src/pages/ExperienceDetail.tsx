import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExperienceDetail, useRelatedExperiences, generateSlug } from '@/hooks/usePortfolioDetail';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Building2, Calendar, Briefcase, ChevronRight } from 'lucide-react';

export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: experience, isLoading, error } = useExperienceDetail(slug || '');
  const { data: relatedExperiences } = useRelatedExperiences(
    experience?.company || '',
    experience?.id || ''
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Experiência não encontrada</h1>
            <p className="text-muted-foreground mb-6">
              A experiência que você procura não existe ou foi removida.
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

  const descriptions = Array.isArray(experience.description)
    ? experience.description
    : experience.description.split('. ').filter(Boolean);

  const canonicalSlug = experience.slug || generateSlug(`${experience.role}-${experience.company}`);

  return (
    <>
      <SEOHead
        title={experience.meta_title || `${experience.role} - ${experience.company}`}
        description={experience.meta_description || experience.description.slice(0, 160)}
        canonicalUrl={`https://neigirao.lovable.app/experiencia/${canonicalSlug}`}
        ogType="article"
        keywords={[
          experience.role,
          experience.company,
          'experiência profissional',
          'product manager',
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
              <Link to="/#experience" className="hover:text-white transition-colors">
                Experiências
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{experience.company}</span>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/#experience')}
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-start gap-6">
              {experience.logo_url && (
                <div className="w-20 h-20 rounded-xl bg-white/10 backdrop-blur-sm p-3 flex-shrink-0">
                  <img
                    src={experience.logo_url}
                    alt={`${experience.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {experience.role}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {experience.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {experience.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <Card className="shadow-elegant border-2 border-border/50">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-accent" />
                Responsabilidades e Conquistas
              </h2>
              <ul className="space-y-4">
                {descriptions.map((point, index) => (
                  <li key={index} className="flex items-start text-muted-foreground leading-relaxed">
                    <span className="text-teal-accent mr-3 mt-1 flex-shrink-0 text-lg">▪</span>
                    <span className="text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Related Experiences */}
          {relatedExperiences && relatedExperiences.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Outras Experiências na {experience.company}</h2>
              <div className="grid gap-4">
                {relatedExperiences.map((exp) => (
                  <Link
                    key={exp.id}
                    to={`/experiencia/${exp.slug || exp.id}`}
                    className="block"
                  >
                    <Card className="hover:shadow-glow transition-all hover:border-teal-accent/30">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
              Interessado em saber mais sobre minha trajetória?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => navigate('/#contact')}>
                Entre em Contato
              </Button>
              <Button variant="outline" onClick={() => window.open('/cv-nei-girao.pdf', '_blank')}>
                Download CV
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
