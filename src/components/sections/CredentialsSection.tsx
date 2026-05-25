import { DbEducation, DbCertification } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { parseJsonSetting } from "@/lib/siteSettingsHelpers";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  education: DbEducation[];
  certifications: DbCertification[];
  isLoading: boolean;
}

const DEFAULT_COURSES = [
  { title: "Curso de Google Analytics", meta: "Google" },
  { title: "Scrum & Agile Foundations", meta: "Prática contínua" },
  { title: "Design Thinking", meta: "Prática contínua" },
];

export function CredentialsSection({ education, certifications, isLoading }: Props) {
  const { settings } = useSiteSettings();

  const sectionNum = settings.cred_section_num || "№ 05 — Formação, cursos & certificações";
  const titleHtml = settings.cred_title_html || "<em>Credenciais</em>.";
  const lead = settings.cred_lead || "A formação acadêmica, os cursos relevantes e as certificações que sustentam a prática.";
  const labelEducation = settings.cred_label_education || "Formação acadêmica";
  const labelCerts = settings.cred_label_certs || "Certificações";
  const courses = parseJsonSetting<{ title: string; meta: string }[]>(settings.cred_courses, DEFAULT_COURSES);

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

        <div className="ed-cred-grid">
          <div className="ed-cred-col">
            <h3>{labelEducation}</h3>
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
            <h3>{labelCerts}</h3>
            {certifications.map((c) => (
              <div key={c.id} className="ed-cred-item">
                <div className="t">{c.name}</div>
                <div className="meta">
                  {c.issuer}
                  {c.year && <span className="acc"> · {c.year}</span>}
                </div>
              </div>
            ))}
            {courses.map((co, i) => (
              <div key={`course-${i}`} className="ed-cred-item">
                <div className="t">{co.title}</div>
                <div className="meta">{co.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
