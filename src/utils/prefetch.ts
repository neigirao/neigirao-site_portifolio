// Trigger lazy-chunk preload on hover so the JS is already cached when the user clicks.
// Each import() path must be a static string so Vite/Rollup can map it to the correct chunk.
export function prefetchRoute(href: string): void {
  if (href.startsWith('/artigo')) {
    import('@/pages/ArticleDetail');
  } else if (href.startsWith('/experiencia')) {
    import('@/pages/ExperienceDetail');
  } else if (href.startsWith('/projeto')) {
    import('@/pages/ProjectDetail');
  } else if (href.startsWith('/skill')) {
    import('@/pages/SkillDetail');
  } else if (href === '/artigos') {
    import('@/pages/ArticlesListing');
  } else if (href === '/sobre') {
    import('@/pages/Sobre');
  }
}
