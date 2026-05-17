interface SafeHTMLLiteProps {
  html: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Lightweight alternative to SafeHTML (no DOMPurify) for admin-controlled strings
// Use only for content set by the site owner, never for user-generated content.
export function SafeHTMLLite({ html, className, as: Component = 'div' }: SafeHTMLLiteProps) {
  return <Component className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
