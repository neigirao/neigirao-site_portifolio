/**
 * RecentArticlesSection - Shows latest 3 published articles on homepage
 */

import { Link } from "react-router-dom";
import { usePublishedArticles } from "@/hooks/useArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { prefetchRoute } from "@/utils/prefetch";

export function RecentArticlesSection() {
  const { articles, isLoading } = usePublishedArticles();
  const { ref, isVisible } = useScrollAnimation();
  const recentArticles = articles.slice(0, 3);

  if (!isLoading && recentArticles.length === 0) return null;

  return (
    <section id="articles" className="py-16 bg-muted/30 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Artigos Recentes</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Reflexões sobre produto, dados e liderança
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)
            : recentArticles.map((article) => (
                <Link key={article.id} to={`/artigo/${article.slug}`} className="group" onMouseEnter={() => prefetchRoute('/artigo/')}>
                  <Card className="h-full border-2 border-border/50 bg-card/95 hover:border-secondary/30 hover:shadow-elegant transition-all duration-300 overflow-hidden">
                    {article.cover_image_url && (
                      <div className="h-48 overflow-hidden">
                        <OptimizedImage
                          src={article.cover_image_url}
                          alt={article.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        {article.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.published_at).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                        {article.reading_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.reading_time_minutes} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>

        {recentArticles.length > 0 && (
          <div className={`text-center mt-10 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Link to="/artigos" onMouseEnter={() => prefetchRoute('/artigos')}>
              <Button variant="outline" size="lg" className="gap-2">
                Ver todos os artigos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
