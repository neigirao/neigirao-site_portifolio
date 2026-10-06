/**
 * Build a responsive srcset for Supabase Storage images.
 * Falls back gracefully (returns undefined) for non-Supabase URLs.
 *
 * Supabase exposes on-the-fly resizing under `/storage/v1/render/image/public/...`
 * accepting `width`, `quality` and `resize` query params.
 */
const WIDTHS = [400, 640, 800, 1200, 1600];

function toRenderUrl(url: string): string | null {
  if (!url) return null;
  // Public object URL → render endpoint
  if (url.includes('/storage/v1/object/public/')) {
    return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  }
  // Already a render URL
  if (url.includes('/storage/v1/render/image/public/')) return url;
  return null;
}

export function buildSrcSet(url: string, widths: number[] = WIDTHS): string | undefined {
  const base = toRenderUrl(url);
  if (!base) return undefined;
  const sep = base.includes('?') ? '&' : '?';
  return widths
    .map(w => `${base}${sep}width=${w}&quality=75&resize=contain ${w}w`)
    .join(', ');
}

export const GALLERY_SIZES = '(max-width: 768px) 100vw, (max-width: 1080px) 90vw, 968px';
