import { DbExperience } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  experiences: DbExperience[];
  isLoading: boolean;
}

export function WorkSection({ experiences, isLoading }: Props) {
  const { settings } = useSiteSettings();

  const sectionNum = settings.work_section_num || "№ 02 — Onde estive";
  const titleHtml = settings.work_title_html || "A <em>trajetória</em>.";
  const lead = settings.work_lead || "A trajetória — companhias, cargos e os times sob sua liderança.";

  if (isLoading) {
    return (
      <section className="ed-section" id="work">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  return (
    <section className="ed-section" id="work">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">{sectionNum}</div>
            <SafeHTML as="h2" className="ed-section-title" html={titleHtml} />
          </div>
          <p className="ed-section-lead">{lead}</p>
        </div>

        <div className="ed-work">
          {experiences.map((exp) => (
            <div key={exp.id} className="ed-work-row">
              <div className="ed-work-co">{exp.company}</div>
              <div className="ed-work-roles">
                <div className="r">
                  <span className="title">{exp.role}</span>
                  <span className="meta">{exp.period}</span>
                  {exp.description && <SafeHTML as="div" className="desc" html={exp.description} />}
                </div>
              </div>
              <div className="ed-work-range">{exp.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
