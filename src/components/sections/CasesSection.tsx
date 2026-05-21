import { DbExperience } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  experiences: DbExperience[];
  isLoading: boolean;
}

export function CasesSection({ experiences, isLoading }: Props) {
  const { settings } = useSiteSettings();
  const cases = experiences.filter((e) => e.is_case && e.is_visible !== false).slice(0, 3);

  const sectionNum = settings.cases_section_num || "№ 01 — Cases selecionados";
  const titleHtml = settings.cases_title_html || "Histórias <em>com</em> resultado.";
  const lead = settings.cases_lead || "Três projetos que, somados, contam o que ele faz quando recebe um problema e um orçamento.";
  const resultLabel = settings.cases_result_label || "Resultado";

  if (isLoading) {
    return (
      <section className="ed-section" id="cases">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  if (cases.length === 0) return null;

  return (
    <section className="ed-section" id="cases">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">{sectionNum}</div>
            <SafeHTML as="h2" className="ed-section-title" html={titleHtml} />
          </div>
          <p className="ed-section-lead">{lead}</p>
        </div>

        <div>
          {cases.map((c) => (
            <article key={c.id} className="ed-case">
              <div>
                <div className="ed-case-co">{c.company}</div>
                <div className="ed-case-year">{c.period}</div>
                {c.case_result && (
                  <div className="ed-case-result">
                    <strong>{resultLabel}</strong>
                    {c.case_result}
                  </div>
                )}
              </div>
              <div>
                <h3 className="ed-case-title">{c.role}</h3>
                <SafeHTML as="div" className="ed-case-body" html={c.case_body || c.description || ''} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
