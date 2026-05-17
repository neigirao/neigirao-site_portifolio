import { DbExperience } from "@/hooks/usePortfolioData";

interface Props {
  experiences: DbExperience[];
  isLoading: boolean;
}

export function CasesSection({ experiences, isLoading }: Props) {
  const cases = experiences.filter((e) => e.is_case).slice(0, 3);

  if (isLoading) {
    return (
      <section className="ed-section" id="cases">
        <div className="ed-container">
          <div style={{ height: 200 }} />
        </div>
      </section>
    );
  }

  if (cases.length === 0) return null;

  return (
    <section className="ed-section" id="cases">
      <div className="ed-container">
        <div className="ed-section-head">
          <div>
            <div className="ed-section-num">№ 01 — Cases selecionados</div>
            <h2 className="ed-section-title">
              Histórias <em>com</em> resultado.
            </h2>
          </div>
          <p className="ed-section-lead">
            Três projetos que, somados, contam o que ele faz quando recebe um problema e um orçamento.
          </p>
        </div>

        <div>
          {cases.map((c) => (
            <article key={c.id} className="ed-case">
              <div>
                <div className="ed-case-co">{c.company}</div>
                <div className="ed-case-year">{c.period}</div>
                {c.case_result && (
                  <div className="ed-case-result">
                    <strong>Resultado</strong>
                    {c.case_result}
                  </div>
                )}
              </div>
              <div>
                <h3 className="ed-case-title">{c.role}</h3>
                <p className="ed-case-body">{c.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
