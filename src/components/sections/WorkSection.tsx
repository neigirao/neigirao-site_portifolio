import { DbExperience } from "@/hooks/usePortfolioData";

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
  const groups = groupByCompany(experiences);

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
            <div className="ed-section-num">№ 02 — Onde estive</div>
            <h2 className="ed-section-title">
              A <em>trajetória</em>.
            </h2>
          </div>
          <p className="ed-section-lead">
            A trajetória — companhias, cargos e os times sob sua liderança.
          </p>
        </div>

        <div className="ed-work">
          {groups.map((g) => (
            <div key={g.company} className="ed-work-row">
              <div className="ed-work-co">{g.company}</div>
              <div className="ed-work-roles">
                {g.roles.map((r, j) => (
                  <div key={r.id} className="r">
                    <span className="title">{r.role}</span>
                    <span className="meta">{r.period}</span>
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
