import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePublishedArticles } from '@/hooks/useArticles';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BASE_URL } from '@/config/constants';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { prefetchRoute } from '@/utils/prefetch';

export default function ArticlesListing() {
  const { articles, isLoading } = usePublishedArticles();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : articles;

  return (
    <div className="ed-root">
      <SEOHead
        title="Artigos | Nei Girão"
        description="Artigos sobre Product Management, Observabilidade, Produtos Digitais e carreira em tecnologia por Nei Girão."
        canonicalUrl={`${BASE_URL}/artigos`}
        keywords={['artigos', 'blog', 'product management', 'observabilidade', 'Nei Girão']}
      />

      {/* MASTHEAD */}
      <header className="ed-mast">
        <div className="ed-mast-left">
          <Link to="/" className="ed-mast-title">Nei Girão</Link>
          <span className="ed-mast-sub">Edição 2026 · Vol. XV</span>
        </div>
        <nav className="ed-mast-right">
          <Link to="/">Início</Link>
          <span className="ed-sep">·</span>
          <Link to="/sobre">Sobre</Link>
          <span className="ed-sep">·</span>
          <Link to="/#projects">Projetos</Link>
          <span className="ed-sep">·</span>
          <Link to="/contato">Contato</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current">Artigos</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
              Product Management · Observabilidade · Carreira
            </span>
          </div>
          <h1 className="pp-title ed-display">Artigos</h1>
          <div className="pp-role">Reflexões sobre produto, tecnologia e liderança.</div>
        </div>
      </section>

      {/* SEARCH */}
      <div className="ed-container" style={{ padding: '32px 56px 0' }}>
        <div style={{ position: 'relative', maxWidth: 480 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ed-muted)', pointerEvents: 'none', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 }}>
            /
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, tag ou tema…"
            aria-label="Buscar artigos"
            style={{
              width: '100%', paddingLeft: 28, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: 'var(--ed-paper)', border: '1px solid var(--ed-line)', borderRadius: 4,
              fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'var(--ed-fg)',
              outline: 'none', transition: 'border-color .15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--ed-fg)')}
            onBlur={e => (e.target.style.borderColor = 'var(--ed-line)')}
          />
        </div>
      </div>

      {/* ARTICLES LIST */}
      <main style={{ padding: '40px 0 80px' }}>
        <div className="ed-container">
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--ed-line)' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: '32px 0', borderBottom: '1px solid var(--ed-line)' }}>
                  <div style={{ height: 12, width: 80, background: 'var(--ed-line)', borderRadius: 2, marginBottom: 12 }} />
                  <div style={{ height: 28, width: '60%', background: 'var(--ed-line)', borderRadius: 2, marginBottom: 8 }} />
                  <div style={{ height: 16, width: '80%', background: 'var(--ed-line)', borderRadius: 2 }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 24, color: 'var(--ed-muted)', marginBottom: 24 }}>
                {query ? 'Nenhum artigo encontrado.' : 'Nenhum artigo publicado ainda.'}
              </p>
              {query ? (
                <button className="pp-btn pp-btn-sec" onClick={() => setQuery('')}>Limpar busca</button>
              ) : (
                <button className="pp-btn pp-btn-sec" onClick={() => navigate('/')}>Voltar ao portfólio</button>
              )}
            </div>
          ) : (
            <div style={{ borderTop: '2px solid var(--ed-fg)' }}>
              {filtered.map((article) => {
                const publishedDate = article.published_at
                  ? new Date(article.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
                  : null;

                return (
                  <Link
                    key={article.id}
                    to={`/artigo/${article.slug}`}
                    className="block"
                    onMouseEnter={() => prefetchRoute('/artigo/')}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <article
                      style={{
                        display: 'grid',
                        gridTemplateColumns: article.cover_image_url ? '1fr 200px' : '1fr',
                        gap: 32, padding: '32px 0',
                        borderBottom: '1px solid var(--ed-line)',
                        alignItems: 'start', transition: 'padding .15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                      onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                    >
                      <div>
                        {/* Meta row */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                          {publishedDate && <span>{publishedDate}</span>}
                          {article.reading_time_minutes && (
                            <span style={{ color: 'var(--ed-line)' }}>·</span>
                          )}
                          {article.reading_time_minutes && (
                            <span>{article.reading_time_minutes} min</span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 440, letterSpacing: '-0.015em', lineHeight: 1.15, margin: '0 0 12px 0', color: 'var(--ed-fg)', transition: 'color .15s' }}
                          className="article-title"
                        >
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        {article.excerpt && (
                          <p style={{ fontStyle: 'italic', color: 'var(--ed-muted)', fontSize: 16, lineHeight: 1.55, margin: '0 0 12px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {article.excerpt}
                          </p>
                        )}

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                            {article.tags.slice(0, 4).map((tag, i) => (
                              <span key={i} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-accent)', background: 'rgba(179,58,45,0.07)', padding: '3px 8px', borderRadius: 3 }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cover image */}
                      {article.cover_image_url && (
                        <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3', background: 'var(--ed-paper)', border: '1px solid var(--ed-line)' }}>
                          <OptimizedImage
                            src={article.cover_image_url}
                            alt={article.title}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="pp-foot">
        <div>© Nei Girão · 2026</div>
        <div>
          <Link to="/" style={{ color: '#E27464' }}>← Voltar ao site</Link>
        </div>
      </footer>
    </div>
  );
}
