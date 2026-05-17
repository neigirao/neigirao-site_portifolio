import { DbProject } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  projects: DbProject[];
  isLoading: boolean;
}

export function ProjectsEditorialSection({ projects, isLoading }: Props) {
  const { settings } = useSiteSettings();

  const sectionNum = settings.projects_section_num || "№ 03 — Produtos que entreguei";
  const titleHtml = settings.projects_title_html || "Produtos <em>vivos</em>.";
  const lead = settings.projects_lead || "Produtos vivos, usados em escala por milhões de pessoas.";

  if (isLoading) {
    return (
      <section className="ed-section" id="projects">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  return (
    <section className="ed-section" id="projects">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">{sectionNum}</div>
            <SafeHTML as="h2" className="ed-section-title" html={titleHtml} />
          </div>
          <p className="ed-section-lead">{lead}</p>
        </div>

        <div className="ed-projects">
          {projects.map((p) => (
            <div key={p.id} className="ed-project">
              {p.brand && <div className="brand">{p.brand}</div>}
              <div className="proj-title">{p.title}</div>
              <div className="note">
                {p.project_subtitle || p.highlight_metric || p.description?.slice(0, 80)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
