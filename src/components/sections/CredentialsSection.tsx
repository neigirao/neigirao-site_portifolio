import { DbEducation, DbCertification } from "@/hooks/usePortfolioData";

interface Props {
  education: DbEducation[];
  certifications: DbCertification[];
  isLoading: boolean;
}

export function CredentialsSection({ education, certifications, isLoading }: Props) {
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
            <div className="ed-section-num">№ 05 — Formação, cursos &amp; certificações</div>
            <h2 className="ed-section-title">
              <em>Credenciais</em>.
            </h2>
          </div>
          <p className="ed-section-lead">
            A formação acadêmica, os cursos relevantes e as certificações que sustentam a prática.
          </p>
        </div>

        <div className="ed-cred-grid">
          <div className="ed-cred-col">
            <h3>Formação acadêmica</h3>
            {education.map((e) => (
              <div key={e.id} className="ed-cred-item">
                <div className="t">{e.institution}</div>
                <div className="meta">
                  {e.degree}
                  {e.period && <span className="acc"> · {e.period}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="ed-cred-col">
            <h3>Certificações</h3>
            {certifications.map((c) => (
              <div key={c.id} className="ed-cred-item">
                <div className="t">{c.name}</div>
                <div className="meta">
                  {c.issuer}
                  {c.year && <span className="acc"> · {c.year}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="ed-cred-col">
            <h3>Cursos</h3>
            <div className="ed-cred-item">
              <div className="t">Curso de Google Analytics</div>
              <div className="meta">Google</div>
            </div>
            <div className="ed-cred-item">
              <div className="t">Scrum &amp; Agile Foundations</div>
              <div className="meta">Prática contínua</div>
            </div>
            <div className="ed-cred-item">
              <div className="t">Design Thinking</div>
              <div className="meta">Prática contínua</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
