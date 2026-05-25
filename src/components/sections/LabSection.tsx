import { Link } from "react-router-dom";
import { DbLabProject } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  labProjects: DbLabProject[];
  isLoading: boolean;
}

export function LabSection({ labProjects, isLoading }: Props) {
  const { settings } = useSiteSettings();

  const sectionNum = settings.lab_section_num || "№ 06 — Lab";
  const titleHtml = settings.lab_title_html || "Estudos <em>fora</em> do trabalho.";
  const lead = settings.lab_lead || "Estudos pessoais e produtos construídos fora do horário de trabalho. Cada um com uma tese clara.";

  if (isLoading) {
    return (
      <section className="ed-section" id="lab">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  if (!labProjects.length) return null;

  return (
    <section className="ed-section" id="lab">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">{sectionNum}</div>
            <SafeHTML as="h2" className="ed-section-title" html={titleHtml} />
          </div>
          <p className="ed-section-lead">{lead}</p>
        </div>

        <div className="ed-lab">
          {labProjects.map((p) => (
            p.slug ? (
              <Link key={p.id} to={`/lab/${p.slug}`} className="ed-lab-card">
                <div className="lab-row1">
                  <span className="lab-tag">{p.brand || 'Lab'}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="lab-title">{p.title}</h3>
                {p.category && <div className="lab-cat">{p.category}</div>}
                {p.description && <p className="lab-desc">{p.description}</p>}
                {p.why && (
                  <div className="lab-why">
                    <strong>Por que:</strong> {p.why}
                  </div>
                )}
              </Link>
            ) : (
              <div key={p.id} className="ed-lab-card">
                <div className="lab-row1">
                  <span className="lab-tag">{p.brand || 'Lab'}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="lab-title">{p.title}</h3>
                {p.category && <div className="lab-cat">{p.category}</div>}
                {p.description && <p className="lab-desc">{p.description}</p>}
                {p.why && (
                  <div className="lab-why">
                    <strong>Por que:</strong> {p.why}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
