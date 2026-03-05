import { useParams, Link, useNavigate } from 'react-router-dom';
import { useArticleDetail } from '@/hooks/useArticles';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight } from 'lucide-react';
import { SafeHTML } from '@/components/admin/SafeHTML';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleDetail(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O artigo que você procura não existe ou foi removido.
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

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      <SEOHead
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt || article.content.replace(/<[^>]*>/g, '').slice(0, 160)}
        canonicalUrl={`${BASE_URL}/artigo/${article.slug}`}
        ogType="article"
        ogImage={article.cover_image_url || undefined}
        keywords={[
          article.title,
          ...(article.tags || []),
          'artigo',
          'blog',
          'Nei Girão',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.meta_description || article.excerpt || '',
        "url": `${BASE_URL}/artigo/${article.slug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "datePublished": article.published_at,
        "dateModified": article.updated_at,
        ...(article.cover_image_url ? { "image": article.cover_image_url } : {}),
        ...(article.tags ? { "keywords": article.tags.join(", ") } : {}),
        "publisher": {
          "@type": "Person",
          "name": "Nei Girão",
          "url": BASE_URL,
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/artigo/${article.slug}`,
        },
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Artigos', url: '/artigos' },
        { name: article.title },
      ]} />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-gradient-hero pt-20 pb-16">
          <div className="max-w-3xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/artigos" className="hover:text-white transition-colors">Artigos</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate max-w-[200px]">{article.title}</span>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/artigos')}
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Artigos
            </Button>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              {publishedDate && (
                <span className="flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </span>
              )}
              {article.reading_time_minutes && (
                <span className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4" />
                  {article.reading_time_minutes} min de leitura
                </span>
              )}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag, i) => (
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
        <main className="max-w-3xl mx-auto px-6 py-12">
          {/* Cover Image */}
          {article.cover_image_url && (
            <Card className="mb-8 overflow-hidden shadow-elegant">
              <OptimizedImage
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-64 md:h-96"
                priority
              />
            </Card>
          )}

          {/* Article Content */}
          <Card className="shadow-elegant border-2 border-border/50 mb-8">
            <CardContent className="p-8 md:p-12">
              <SafeHTML
                html={article.content}
                className="prose prose-lg dark:prose-invert max-w-none leading-relaxed
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-a:text-accent prose-a:underline
                  prose-img:rounded-lg prose-img:shadow-md"
              />
            </CardContent>
          </Card>

          {/* Author Card */}
          <Card className="shadow-elegant mb-8">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold text-lg">
                NG
              </div>
              <div>
                <p className="font-semibold text-foreground">Nei Girão</p>
                <p className="text-sm text-muted-foreground">Product Manager | Observabilidade | Produtos Digitais</p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Gostou deste artigo? Confira outros conteúdos ou entre em contato.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/artigos')}>
                Ver Mais Artigos
              </Button>
              <Button onClick={() => navigate('/#contact')}>
                Entre em Contato
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
