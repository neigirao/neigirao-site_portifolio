import { Link } from 'react-router-dom';
import { usePublishedArticles } from '@/hooks/useArticles';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BASE_URL } from '@/config/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ArticlesListing() {
  const { articles, isLoading } = usePublishedArticles();
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Artigos"
        description="Artigos sobre Product Management, Observabilidade, Produtos Digitais e carreira em tecnologia por Nei Girão."
        canonicalUrl={`${BASE_URL}/artigos`}
        keywords={['artigos', 'blog', 'product management', 'observabilidade', 'Nei Girão']}
      />

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Artigos</h1>
            <p className="text-lg text-white/80">
              Reflexões sobre Product Management, Observabilidade e carreira em tecnologia.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {isLoading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Nenhum artigo publicado ainda.</p>
              <Button className="mt-4" onClick={() => navigate('/')}>Voltar ao Portfolio</Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {articles.map((article) => {
                const publishedDate = article.published_at
                  ? new Date(article.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
                  : null;

                return (
                  <Link key={article.id} to={`/artigo/${article.slug}`} className="block group">
                    <Card className="overflow-hidden hover:shadow-glow transition-all hover:border-accent/30">
                      <div className="flex flex-col md:flex-row">
                        {article.cover_image_url && (
                          <div className="md:w-64 flex-shrink-0">
                            <OptimizedImage
                              src={article.cover_image_url}
                              alt={article.title}
                              className="w-full h-48 md:h-full"
                            />
                          </div>
                        )}
                        <CardContent className="p-6 flex-1">
                          <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {article.title}
                          </h2>
                          {article.excerpt && (
                            <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            {publishedDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {publishedDate}
                              </span>
                            )}
                            {article.reading_time_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {article.reading_time_minutes} min
                              </span>
                            )}
                          </div>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {article.tags.slice(0, 4).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
