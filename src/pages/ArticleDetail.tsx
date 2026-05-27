import { useParams, Link, useNavigate } from 'react-router-dom';
import { useArticleDetail, usePublishedArticles } from '@/hooks/useArticles';
import type { DbArticle } from '@/hooks/useArticles';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { SafeHTML } from '@/components/admin/SafeHTML';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Helmet } from 'react-helmet-async';
import { BackToTop } from '@/components/BackToTop';

function RelatedArticles({ currentArticle }: { currentArticle: DbArticle }) {
  const { articles: allArticles } = usePublishedArticles();
  if (!allArticles || !currentArticle.tags?.length) return null;

  const related = allArticles
    .filter((a) => a.id !== currentArticle.id)
    .map((a) => ({
      ...a,
      score: (a.tags || []).filter((t) => currentArticle.tags!.includes(t)).length,
    }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="pp-section">
      <h2>Artigos Relacionados</h2>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--ed-line)' }}>
        {related.map((a) => (
          <Link key={a.id} to={`/artigo/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--ed-line)', transition: 'padding .15s' }}
              onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
              onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
            >
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 440, letterSpacing: '-0.01em', marginBottom: 4 }}>
                {a.title}
              </div>
              {a.excerpt && (
                <div style={{ fontSize: 14, color: 'var(--ed-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {a.excerpt}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleDetail(slug || '');

  if (isLoading) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="ed-mono" style={{ color: 'var(--ed-muted)' }}>Carregando…</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic' }}>Artigo não encontrado</p>
        <button className="pp-btn pp-btn-sec" onClick={() => navigate('/artigos')}>← Voltar aos artigos</button>
      </div>
    );
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const publishedDateShort = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="ed-root">
      <SEOHead
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt || article.content.replace(/<[^>]*>/g, '').slice(0, 160)}
        canonicalUrl={`${BASE_URL}/artigo/${article.slug}`}
        ogType="article"
        ogImage={article.cover_image_url || undefined}
        keywords={[article.title, ...(article.tags || []), 'artigo', 'blog', 'Nei Girão']}
      />
      <Helmet>
        {article.published_at && <meta property="article:published_time" content={article.published_at} />}
        <meta property="article:modified_time" content={article.updated_at} />
        <meta property="article:author" content="Nei Girão" />
        {article.tags?.map((tag, i) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}
      </Helmet>
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
        "publisher": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/artigo/${article.slug}` },
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Artigos', url: '/artigos' },
        { name: article.title },
      ]} />

      {/* MASTHEAD */}
      <header className="ed-mast">
        <div className="ed-mast-left">
          <Link to="/" className="ed-mast-title">Nei Girão</Link>
          <span className="ed-mast-sub">Edição 2026 · Vol. XV</span>
        </div>
        <nav className="ed-mast-right">
          <Link to="/">Início</Link>
          <span className="ed-sep">·</span>
          <Link to="/artigos">Artigos</Link>
          <span className="ed-sep">·</span>
          <Link to="/sobre">Sobre</Link>
          <span className="ed-sep">·</span>
          <Link to="/contato">Contato</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <Link to="/artigos">Artigos</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            {publishedDateShort && <span>{publishedDateShort}</span>}
            {article.reading_time_minutes && (
              <>
                <span className="pp-brand-sep">·</span>
                <span style={{ color: 'var(--ed-muted)' }}>{article.reading_time_minutes} min de leitura</span>
              </>
            )}
          </div>
          <h1 className="pp-title ed-display">{article.title}</h1>
          {article.excerpt && (
            <div className="pp-role">{article.excerpt}</div>
          )}
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
              {article.tags.map((tag, i) => (
                <span key={i} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-accent)', background: 'rgba(179,58,45,0.07)', padding: '4px 10px', borderRadius: 3 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COVER IMAGE */}
      {article.cover_image_url && (
        <section className="pp-shot">
          <div className="ed-container">
            <div className="pp-shot-frame">
              <OptimizedImage
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full"
                priority
              />
            </div>
            <div className="pp-shot-caption">{article.title}</div>
          </div>
        </section>
      )}

      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              {publishedDate && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Publicado em</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 15, color: 'var(--ed-fg)', textTransform: 'none', letterSpacing: 0 }}>{publishedDate}</div>
                </div>
              )}

              {article.reading_time_minutes && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Leitura</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 15, color: 'var(--ed-fg)', textTransform: 'none', letterSpacing: 0 }}>
                    {article.reading_time_minutes} minutos
                  </div>
                </div>
              )}

              {article.tags && article.tags.length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Temas</div>
                  {article.tags.map((tag, i) => (
                    <span key={i} className="pp-outcome" style={{ marginBottom: 4 }}>{tag}</span>
                  ))}
                </div>
              )}

              <div className="pp-side-block">
                <div className="pp-side-head">Autor</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 440 }}>Nei Girão</div>
                <div style={{ fontSize: 12, color: 'var(--ed-muted)', marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>Product Manager</div>
              </div>
            </aside>

            {/* MAIN */}
            <div className="pp-main">
              <div className="pp-section">
                <SafeHTML
                  html={article.content}
                  className="pp-prose"
                />
              </div>

              {/* Related Articles */}
              <RelatedArticles currentArticle={article} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pp-cta">
        <div className="ed-container">
          <div className="pp-cta-grid">
            <h3>
              Gostou deste <em>artigo</em>?
            </h3>
            <div className="pp-cta-actions">
              <button className="pp-btn pp-btn-pri" onClick={() => navigate('/artigos')}>
                Ver mais artigos
              </button>
              <button className="pp-btn pp-btn-sec" onClick={() => navigate('/#contact')}>
                Entre em contato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pp-foot">
        <div>© Nei Girão · 2026</div>
        <div>
          <Link to="/artigos" style={{ color: '#E27464' }}>← Voltar aos artigos</Link>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
