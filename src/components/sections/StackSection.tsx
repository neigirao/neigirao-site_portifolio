import { DbSkill } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { parseJsonSetting } from "@/lib/siteSettingsHelpers";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  skills: DbSkill[];
  isLoading: boolean;
}

const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
  product: "Produto",
  data: "Dados",
  obs: "Observabilidade",
  domains: "Domínios",
};

export function StackSection({ skills, isLoading }: Props) {
  const { settings } = useSiteSettings();

  const sectionNum = settings.stack_section_num || "№ 04 — Ferramentas & métodos";
  const titleHtml = settings.stack_title_html || "O <em>ferramental</em>.";
  const lead = settings.stack_lead || "O ferramental que carrega na mochila.";
  const categoryLabels = parseJsonSetting<Record<string, string>>(
    settings.stack_category_labels,
    DEFAULT_CATEGORY_LABELS
  );

  const categories = Array.from(
    new Set(skills.map((s) => s.category).filter(Boolean) as string[])
  );

  const grouped = categories.reduce<Record<string, DbSkill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <section className="ed-section">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  return (
    <section className="ed-section">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">{sectionNum}</div>
            <SafeHTML as="h2" className="ed-section-title" html={titleHtml} />
          </div>
          <p className="ed-section-lead">{lead}</p>
        </div>

        <div className="ed-stack-grid">
          {categories.map((cat) => (
            <div key={cat} className="ed-stack-col">
              <h4>{categoryLabels[cat] || cat}</h4>
              <ul>
                {grouped[cat].map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
