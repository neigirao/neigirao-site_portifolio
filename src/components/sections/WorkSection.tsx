import { DbExperience } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTMLLite as SafeHTML } from "./SafeHTMLLite";

interface Props {
  experiences: DbExperience[];
  isLoading: boolean;
}

interface CompanyGroup {
  company: string;
  range: string;
  roles: DbExperience[];
}

function groupByCompany(experiences: DbExperience[]): CompanyGroup[] {
  const map = new Map<string, CompanyGroup>();
  for (const exp of experiences) {
    if (!map.has(exp.company)) {
      map.set(exp.company, { company: exp.company, range: exp.period, roles: [] });
    }
    map.get(exp.company)!.roles.push(exp);
  }
  return Array.from(map.values());
}

export function WorkSection({ experiences, isLoading }: Props) {
  const { settings } = useSiteSettings();
  const groups = groupByCompany(experiences);

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
          {groups.map((g) => (
            <div key={g.company} className="ed-work-row">
              <div className="ed-work-co">{g.company}</div>
              <div className="ed-work-roles">
                {g.roles.map((r) => (
                  <div key={r.id} className="r">
                    <span className="title">{r.role}</span>
                    <span className="meta">{r.period}</span>
                    {r.description && <SafeHTML as="div" className="desc" html={r.description} />}
                  </div>
                ))}
              </div>
              <div className="ed-work-range">{g.range}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
