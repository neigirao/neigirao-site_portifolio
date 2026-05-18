import { useState } from "react";
import { DbExperience } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  experiences: DbExperience[];
  isLoading: boolean;
}

const TRUNCATE_LIMIT = 220;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export function WorkSection({ experiences, isLoading }: Props) {
  const { settings } = useSiteSettings();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const sectionNum = settings.work_section_num || "№ 02 — Onde estive";
  const titleHtml = settings.work_title_html || "A <em>trajetória</em>.";
  const lead = settings.work_lead || "A trajetória — companhias, cargos e os times sob sua liderança.";

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
          {experiences.map((exp) => {
            const isExpanded = expanded.has(exp.id);
            const needsTruncation = !!exp.description && stripHtml(exp.description).length > TRUNCATE_LIMIT;

            return (
              <div key={exp.id} className="ed-work-row">
                <div className="ed-work-co">{exp.company}</div>
                <div className="ed-work-roles">
                  <div className="r">
                    <span className="title">{exp.role}</span>
                    <span className="meta">{exp.period}</span>
                    {exp.description && (
                      <>
                        <SafeHTML
                          as="div"
                          className={`desc${needsTruncation && !isExpanded ? ' desc--clamped' : ''}`}
                          html={exp.description}
                        />
                        {needsTruncation && (
                          <button className="desc-toggle" onClick={() => toggle(exp.id)}>
                            {isExpanded ? 'Mostrar menos ↑' : 'Mostrar mais ↓'}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="ed-work-range">{exp.period}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
