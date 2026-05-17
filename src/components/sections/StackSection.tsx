import { DbSkill } from "@/hooks/usePortfolioData";

interface Props {
  skills: DbSkill[];
  isLoading: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  product: "Produto",
  data: "Dados",
  obs: "Observabilidade",
  domains: "Domínios",
};

export function StackSection({ skills, isLoading }: Props) {
  const categories = Array.from(
    new Set(skills.map((s) => s.category).filter(Boolean) as string[])
  );

  const grouped = categories.reduce<Record<string, DbSkill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

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
            <div className="ed-section-num">№ 04 — Ferramentas &amp; métodos</div>
            <h2 className="ed-section-title">
              O <em>ferramental</em>.
            </h2>
          </div>
          <p className="ed-section-lead">O ferramental que carrega na mochila.</p>
        </div>

        <div className="ed-stack-grid">
          {categories.map((cat) => (
            <div key={cat} className="ed-stack-col">
              <h4>{CATEGORY_LABELS[cat] || cat}</h4>
              <ul>
                {grouped[cat].map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
