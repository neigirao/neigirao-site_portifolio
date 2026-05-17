import { useSiteSettings } from "@/hooks/useSiteSettings";

export function FooterEditorialSection() {
  const { settings } = useSiteSettings();
  const left = settings.footer_ed_left || `© Nei Girão · ${new Date().getFullYear()}`;
  const right = settings.footer_ed_right || "Direction C · Editorial";

  return (
    <footer className="ed-foot">
      <div>{left}</div>
      <div>{right}</div>
    </footer>
  );
}
