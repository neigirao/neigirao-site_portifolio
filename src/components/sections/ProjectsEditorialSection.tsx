import { DbProject } from "@/hooks/usePortfolioData";

interface Props {
  projects: DbProject[];
  isLoading: boolean;
}

export function ProjectsEditorialSection({ projects, isLoading }: Props) {
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
            <div className="ed-section-num">№ 03 — Produtos que entreguei</div>
            <h2 className="ed-section-title">
              Produtos <em>vivos</em>.
            </h2>
          </div>
          <p className="ed-section-lead">
            Produtos vivos, usados em escala por milhões de pessoas.
          </p>
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
