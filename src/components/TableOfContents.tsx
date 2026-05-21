import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ contentSelector = '.prose' }: { contentSelector?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector(contentSelector);
      if (!container) return;
      const headings = Array.from(container.querySelectorAll('h2, h3'));
      if (headings.length < 3) return;
      setItems(
        headings.map((el, i) => {
          if (!el.id) el.id = `toc-${i}`;
          return { id: el.id, text: el.textContent || '', level: parseInt(el.tagName[1]) };
        })
      );
    }, 150);
    return () => clearTimeout(timer);
  }, [contentSelector]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-10% 0% -80% 0%' }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Sumário do artigo"
      className="hidden xl:block w-56 shrink-0 sticky top-28 self-start"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Neste artigo
      </p>
      <ol className="space-y-1.5 border-l border-border pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'block text-sm leading-snug transition-colors hover:text-foreground',
                item.level === 3 && 'pl-3 text-xs',
                activeId === item.id
                  ? 'text-foreground font-medium -ml-px border-l-2 border-primary pl-2'
                  : 'text-muted-foreground'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
